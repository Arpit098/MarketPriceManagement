import { Download, Facebook, Instagram } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing, GetListingByCity, Updatebulk } from "../../../store/API/ManageListing";
import { fetchAllCities } from "../../../store/API/Cites";
import { Toaster, toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const SubscriberManageListing = () => {
  const dispatch = useDispatch();
  const productDropdownRef = useRef(null);

  const [originalData, setOriginalData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readOnly, setReadonly] = useState(true);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [productDropdownPosition, setProductDropdownPosition] = useState({ top: 0, left: 0 });
  const [toggles, setToggles] = useState({
    variety: false,
    category: false,
    tradedQuantity: false,
  });

  const { cities } = useSelector((state) => state.Cities);
  const { data: userData } = useSelector((state) => state.LoginAPI);
  const canUpdate = userData?.[0]?.user?.can_update || false;
  const { data, message } = useSelector((state) => state.ListingByCity);

  const city = "Mumbai";

  useEffect(() => {
    if (city) {
      dispatch(fetchAllCities());
      dispatch(GetListingByCity(city));
    } else {
      setOriginalData([]);
      setEditedData([]);
      toast.error("Update your profile by adding your city", {
        position: "top-right",
        duration: 4000,
      });
    }
  }, [dispatch, city]);

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setOriginalData(data);
      setEditedData(data.map((item) => ({ ...item })));
    } else if (city) {
      setOriginalData([]);
      setEditedData([]);
    }
  }, [data, city]);

  const fetchPriceHistory = async (date, city) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/products/price-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, city }),
      });
      const result = await response.json();

      if (response.ok) {
        let filteredData = result.data || [];
        if (selectedProducts.length > 0) {
          filteredData = filteredData.filter((item) =>
            selectedProducts.includes(item.product_name)
          );
        }
        setOriginalData(filteredData);
        setEditedData(filteredData.map((item) => ({ ...item })));
      } else {
        toast.error(result.message || "Failed to fetch price history", {
          position: "top-right",
          duration: 3000,
        });
        setOriginalData([]);
        setEditedData([]);
      }
    } catch (error) {
      toast.error("Error fetching price history", {
        position: "top-right",
        duration: 3000,
      });
      setOriginalData([]);
      setEditedData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city && selectedDate) {
      fetchPriceHistory(selectedDate, city);
    } else if (city && !selectedDate) {
      dispatch(GetListingByCity(city));
    }
  }, [selectedDate, city, selectedProducts]);

  const uniqueProducts = [...new Set(Array.isArray(data) ? data.map((item) => item.product_name) : [])];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e, field, productId) => {
    const { value } = e.target;
    setEditedData((prevData) =>
      prevData.map((item) =>
        item.product_id === productId ? { ...item, [field]: value } : item
      )
    );
  };

  const onClickUpdate = () => {
    if (!city) {
      toast.error("Cannot update: No city specified in profile", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    const changedProducts = editedData
      .map((editedProduct) => {
        const originalProduct = originalData.find(
          (orig) => orig.product_id === editedProduct.product_id
        );
        if (!originalProduct) return null;

        const hasChanges =
          editedProduct.min_rate !== originalProduct.min_rate ||
          editedProduct.max_rate !== originalProduct.max_rate;

        return hasChanges
          ? {
              product_id: editedProduct.product_id,
              min_rate: editedProduct.min_rate,
              max_rate: editedProduct.max_rate,
              city: city,
            }
          : null;
      })
      .filter((product) => product !== null);

    if (changedProducts.length === 0) {
      toast.info("No changes detected to update.", {
        position: "top-right",
        duration: 3000,
      });
      setIsLoading(false);
      setReadonly(true);
      return;
    }

    const payload = changedProducts;

    dispatch(Updatebulk({ type: "subscriber", data: payload }))
      .then((response) => {
        setOriginalData(editedData);
        toast.success(response.payload.message, {
          position: "top-right",
          duration: 3000,
        });
        setIsLoading(false);
        setReadonly(true);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update data", {
          position: "top-right",
          duration: 3000,
        });
        setEditedData([...originalData]);
        setIsLoading(false);
      });
  };

  const handleDownload = async () => {
    if (!city) {
      toast.error("Cannot download: No city specified in profile", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    try {
      console.log("Downloading image...");
      const downloadDate = selectedDate || new Date().toISOString().split("T")[0];
      const response = await fetch(`${API_URL}/products/downloadImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: downloadDate, city }),
      });
      const data = await response.json();

      if (response.ok) {
        if (data.image) {
          const link = document.createElement("a");
          link.href = data.image;
          link.download = `products_${downloadDate}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (data.message === "No price history found for this date") {
          toast.error("No data for this day. Please select a previous day.", {
            position: "top-right",
            duration: 4000,
          });
        }
      } else {
        toast.error(data.message || "Failed to download image", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Error downloading image", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handleCancel = () => {
    setEditedData([...originalData]);
    setReadonly(true);
  };

  const handleProductToggle = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleProductDropdownToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProductDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const handleToggleChange = (toggle) => {
    setToggles((prev) => ({
      ...prev,
      [toggle]: !prev[toggle],
    }));
  };

  // Base headers
  const baseHeaders = ["S.No", "Product name", "Min rate", "Max rate"];
  // Dynamic headers based on toggles
  const additionalHeaders = [
    ...(toggles.variety ? ["Variety"] : []),
    ...(toggles.category ? ["Category"] : []),
    ...(toggles.tradedQuantity ? ["Traded Quantity"] : []),
  ];
  const headers = [...baseHeaders, ...additionalHeaders];

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <Toaster />
      <div className="px-2 sm:px-4 py-2 max-w-full relative z-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium py-2 sm:py-3 md:py-5">
          Price Update
        </h2>
  
        <div className="w-full bg-white border-b overflow-visible relative z-10">
          <div className="flex flex-col gap-3 p-2 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full">
              {/* First Row */}
              <div className="w-full">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 sm:p-2.5"
                  required
                  disabled={!city}
                />
              </div>
  
              <div className="w-full">
                <div
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 sm:p-2.5 flex justify-between items-center"
                >
                  <span>{city || "No City Assigned"}</span>
                </div>
              </div>
  
              <div className="w-full relative" ref={productDropdownRef}>
                <div
                  onClick={handleProductDropdownToggle}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 sm:p-2.5 cursor-pointer flex justify-between items-center"
                >
                  <span>
                    {selectedProducts.length > 0
                      ? `${selectedProducts.length} Products Selected`
                      : "All Products"}
                  </span>
                  <span>{isProductDropdownOpen ? "▲" : "▼"}</span>
                </div>
                {isProductDropdownOpen && (
                  <div
                    className="fixed z-50 bg-white border border-gray-300 rounded-lg w-[200px] max-h-60 overflow-y-auto shadow-lg"
                    style={{ top: `${productDropdownPosition.top}px`, left: `${productDropdownPosition.left}px` }}
                  >
                    {uniqueProducts.map((product, index) => (
                      <label key={index} className="flex items-center px-2 py-1 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => handleProductToggle(product)}
                          className="mr-2"
                        />
                        {product}
                      </label>
                    ))}
                  </div>
                )}
              </div>
  
              <div className="w-full">
                <button
                  onClick={handleDownload}
                  className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 w-full flex items-center justify-center text-sm sm:text-base"
                  disabled={!city}
                >
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
  
            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full mt-4">
              <div className="w-full">
                {readOnly ? (
                  <button
                    onClick={() => setReadonly(false)}
                    className={`px-3 sm:px-4 py-2 text-white rounded-md w-full flex items-center justify-center text-sm sm:text-base ${
                      canUpdate && city ? "bg-blue-700 hover:bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!canUpdate || !city}
                  >
                    Update Data
                  </button>
                ) : (
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={handleCancel}
                      className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onClickUpdate}
                      className="px-3 sm:px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded-md w-full text-sm sm:text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update"}
                    </button>
                  </div>
                )}
              </div>
  
              <div className="w-full">
                <button
                  onClick={() => handleToggleChange("variety")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 sm:p-2.5 flex justify-between items-center ${
                    toggles.variety ? "bg-gray-200 text-gray-800" : "bg-white text-gray-800"
                  }`}
                >
                  Variety
                </button>
              </div>
  
              <div className="w-full">
                <button
                  onClick={() => handleToggleChange("category")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 sm:p-2.5 flex justify-between items-center ${
                    toggles.category ? "bg-gray-200 text-gray-800" : "bg-white text-gray-800"                  }`}
                >
                  Category
                </button>
              </div>
  
              <div className="w-full">
                <button
                  onClick={() => handleToggleChange("tradedQuantity")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 sm:p-2.5 flex justify-between items-center ${
                    toggles.tradedQuantity ? "bg-gray-200 text-gray-800" : "bg-white text-gray-800"                  }`}
                >
                  Traded Quantity
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <div className="w-full mt-4 relative z-0">
          <div className="w-full mt-4 overflow-x-auto">
            <div className="max-h-[200px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 table-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index} className="px-2 py-2 text-black whitespace-nowrap md:px-4">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!city ? (
                    <tr>
                      <td colSpan={headers.length} className="text-center px-2 py-2 md:px-4">
                        No data
                      </td>
                    </tr>
                  ) : message && !selectedDate ? (
                    <tr>
                      <td colSpan={headers.length} className="text-center px-2 py-2 md:px-4">
                        {message}
                      </td>
                    </tr>
                  ) : editedData.length === 0 ? (
                    <tr>
                      <td colSpan={headers.length} className="text-center px-2 py-2 md:px-4">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    editedData.slice(0, 4).map((product, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}>
                        <td className="px-2 py-2 md:px-4">{index + 1}</td>
                        <td className="px-2 py-2 md:px-4 max-w-[100px] truncate">
                          {product?.product_name}
                        </td>
                        <td className="px-2 py-2 md:px-4 w-[120px]">
                          <input
                            type="number"
                            value={product?.min_rate || ""}
                            onChange={(e) => handleInputChange(e, "min_rate", product.product_id)}
                            className="w-full px-1 py-1 border rounded text-sm"
                            disabled={readOnly}
                          />
                        </td>
                        <td className="px-2 py-2 md:px-4 w-[120px]">
                          <input
                            type="number"
                            value={product?.max_rate || ""}
                            onChange={(e) => handleInputChange(e, "max_rate", product.product_id)}
                            className="w-full px-1 py-1 border rounded text-sm"
                            disabled={readOnly}
                          />
                        </td>
                        {toggles.variety && (
                          <td className="px-2 py-2 md:px-4">{product?.variety || "N/A"}</td>
                        )}
                        {toggles.category && (
                          <td className="px-2 py-2 md:px-4">{product?.category || "N/A"}</td>
                        )}
                        {toggles.tradedQuantity && (
                          <td className="px-2 py-2 md:px-4">{product?.traded_quantity || "N/A"}</td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberManageListing;