import { Download, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Table from "../../Common/Tabel";
import ActoinManageListing from "./ActoinManageListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing, Updatebulk } from "../../../store/API/ManageListing";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { AddCity } from "../../../store/API/Cites";
import { AddCategory } from "../../../store/API/Category";
import toast, { Toaster } from "react-hot-toast";
import ExcelJS from "exceljs";
import { fetchAllCities } from "../../../store/API/Cites";
import { fetchCategory } from "../../../store/API/Category";
const ManageListing = () => {
  const foodHeaders = [
    "Id",
    "Product Name",
    "Category",
    "Variety",
    "City Name",
    // "Min Rate",
    // "Max Rate",
    // "Traded Quantity",
  ];

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openCityModal, setOpenCityModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ManageListing);

  useEffect(() => {
    dispatch(fetchListing());
  }, [dispatch]);

  // Initialize editedData and originalData from Redux data on first load or when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      setOriginalData(data);
      setEditedData(data.map((item) => ({ ...item }))); // Deep copy
    } else {
      setOriginalData([]);
      setEditedData([]);
    }
  }, [data]);

  const handleAddClick = () => {
    Promise.all([dispatch(fetchAllCities()), dispatch(fetchCategory())])
      .then(() => {
        setIsAdding(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data for adding", {
          position: "top-right",
          duration: 3000,
        });
      });
  };
  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedData(originalData.map((item) => ({ ...item }))); // Reset to originalData
    setIsEditing(false);
  };

  const handleInputChange = (e, field, productId) => {
    const { value } = e.target;
    console.log(`Changing ${field} for product ${productId} to ${value}`); // Debug log
    setEditedData((prevData) =>
      prevData.map((item) =>
        item.product_id === productId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleUpdate = () => {
    setIsLoading(true);
    const payload = editedData.map((product) => ({
      product_id: product.product_id,
      product_name: product.product_name,
      category_name: product.category_name,
      variety: product.variety,
      city_name: product.city_name,
      // min_rate: product.min_rate,
      // max_rate: product.max_rate,
      // traded_quantity: product.traded_quantity,
    }));

    dispatch(Updatebulk({ type: "admin", data: payload }))
      .then((response) => {
        setOriginalData(editedData.map((item) => ({ ...item }))); // Update originalData with editedData
        toast.success(response.payload.message || "Products updated successfully!", {
          position: "top-right",
          duration: 3000,
        });
        setIsLoading(false);
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error(error.payload || "Failed to update products", {
          position: "top-right",
          duration: 3000,
        });
        setEditedData(originalData.map((item) => ({ ...item }))); // Reset on error
        setIsLoading(false);
      });
  };

  // City Form Handling
  const [formData, setFormData] = useState({ name: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelCitySubmit = (e) => {
    e.preventDefault();
    dispatch(AddCity(formData)).then(() => {
      toast.success("City added successfully!");
      setFormData({ name: "" });
      onCloseCityModal();
    });
  };

  // Category Form Handling
  const [CategoryformData, setCategoryFormData] = useState({ name: "" });
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(AddCategory(CategoryformData)).then(() => {
      toast.success("Category added successfully!");
      setCategoryFormData({ name: "" });
      onCloseCategoryModal();
    });
  };

  const onOpenCityModal = () => setOpenCityModal(true);
  const onCloseCityModal = () => setOpenCityModal(false);
  const onOpenCategoryModal = () => setOpenCategoryModal(true);
  const onCloseCategoryModal = () => setOpenCategoryModal(false);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ManageListing");
    const headers = [
      "Product Name",
      "Category",
      "Variety",
      "City Name",
      "Min Rate",
      "Max Rate",
      "Traded Quantity",
    ];

    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.font = { bold: true };
    });

    // Always export editedData to reflect the latest changes
    editedData.forEach((item) => {
      worksheet.addRow([
        item.product_name,
        item.category_name,
        item.variety,
        item.city_name,
        item.min_rate,
        item.max_rate,
        item.traded_quantity,
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ManageListing.xlsx";
    link.click();
  };

  return (
    <>
      {isAdding ? (
        <ActoinManageListing onCancle={handleCancel} />
      ) : (
        <div>
          <Toaster />
          <h2 className="text-[40px] font-medium">Manage Listing</h2>
          <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b">
            <div>
              <p className="text-bold text-[18px] font-bold">Listing</p>
              <p className="font-normal text-[14px] font-[#64748B]">
                Manage your Listing and Product details
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p
                className="bg-[#4880FF] px-[10px] py-[8px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                onClick={handleAddClick}
              >
                <Plus size={16} strokeWidth={1.5} />
                Add Product
              </p>
              {isEditing ? (
                <div className="flex gap-2">
                  <p
                    className="bg-red-500 px-[10px] py-[8px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </p>
                  <p
                    className="bg-[#4880FF] px-[10px] py-[8px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                    onClick={handleUpdate}
                  >
                    {isLoading ? "Updating..." : "Save Updates"}
                  </p>
                </div>
              ) : (
                <p
                  className="bg-[#4880FF] px-[10px] py-[8px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                  onClick={handleEditClick}
                >
                  Update Product
                </p>
              )}
              <p
                className="bg-[#4880FF] px-[10px] py-[8px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                onClick={onOpenCityModal}
              >
                <Plus size={16} strokeWidth={1.5} />
                Add City
              </p>
              <p
                className="bg-[#4880FF] px-[10px] py-[8px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                onClick={onOpenCategoryModal}
              >
                <Plus size={16} strokeWidth={1.5} />
                Add Category
              </p>
              <span
                onClick={exportToExcel}
                className="border px-[10px] py-[8px] rounded-[8px] font-semibold flex gap-2 items-center text-[14px] cursor-pointer"
              >
                <Download size={16} strokeWidth={1.5} />
                Download PDF Report
              </span>
            </div>
          </div>
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    {foodHeaders.map((header, index) => (
                      <th key={index} className="px-4 py-2">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {editedData.length === 0 ? (
                    <tr>
                      <td colSpan={foodHeaders.length} className="text-center px-4 py-2">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    editedData.map((product, index) => (
                      <tr
                        key={product.product_id}
                        className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}
                      >
                        <td className="px-4 py-2">{product.product_id}</td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.product_name || ""}
                              onChange={(e) =>
                                handleInputChange(e, "product_name", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`product_name_${product.product_id}`}
                            />
                          ) : (
                            product.product_name
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.category_name || ""}
                              onChange={(e) =>
                                handleInputChange(e, "category_name", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`category_name_${product.product_id}`}
                            />
                          ) : (
                            product.category_name
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.variety || ""}
                              onChange={(e) =>
                                handleInputChange(e, "variety", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`variety_${product.product_id}`}
                            />
                          ) : (
                            product.variety
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.city_name || ""}
                              onChange={(e) =>
                                handleInputChange(e, "city_name", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`city_name_${product.product_id}`}
                            />
                          ) : (
                            product.city_name
                          )}
                        </td>
                        {/* <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.min_rate || ""}
                              onChange={(e) =>
                                handleInputChange(e, "min_rate", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`min_rate_${product.product_id}`}
                            />
                          ) : (
                            product.min_rate
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.max_rate || ""}
                              onChange={(e) =>
                                handleInputChange(e, "max_rate", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`max_rate_${product.product_id}`}
                            />
                          ) : (
                            product.max_rate
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.traded_quantity || ""}
                              onChange={(e) =>
                                handleInputChange(e, "traded_quantity", product.product_id)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              name={`traded_quantity_${product.product_id}`}
                            />
                          ) : (
                            product.traded_quantity
                          )}
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* City Modal */}
          <Modal
            classNames={{ modal: "custom-modal" }}
            open={openCityModal}
            onClose={onCloseCityModal}
            center
          >
            <div className="modal-header flex justify-between items-center border-b p-[15px]">
              <h2 className="text-lg font-semibold">Add City</h2>
            </div>
            <div className="modal-body p-[15px]">
              <form onSubmit={handelCitySubmit}>
                <div className="pb-[20px]">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter City Name"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#4880FF] px-[20px] py-[15px] rounded-[8px] text-white font-semibold text-[15px] cursor-pointer flex gap-2 items-center"
                  >
                    Add City
                  </button>
                </div>
              </form>
            </div>
          </Modal>

          {/* Category Modal */}
          <Modal
            classNames={{ modal: "custom-modal" }}
            open={openCategoryModal}
            onClose={onCloseCategoryModal}
            center
          >
            <div className="modal-header flex justify-between items-center border-b p-[15px]">
              <h2 className="text-lg font-semibold">Add Category</h2>
            </div>
            <div className="modal-body p-[15px]">
              <form onSubmit={handelCategorySubmit}>
                <div className="pb-[20px]">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={CategoryformData.name}
                    onChange={handleCategoryChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Category Name"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#4880FF] px-[20px] py-[15px] rounded-[8px] text-white font-semibold text-[15px] cursor-pointer flex gap-2 items-center"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ManageListing;