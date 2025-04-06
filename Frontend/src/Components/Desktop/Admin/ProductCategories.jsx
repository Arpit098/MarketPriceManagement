import { Download, Plus, Pencil, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ActionSocialMediaInti from "./ActionSocialMediaInti";

const ProductCategories = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isAdding, setIsAdding] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]); // Store city options for dropdown
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [editingCategoryId, setEditingCategoryId] = useState(null); // Track which category is being edited
  const [editedProduct, setEditedProduct] = useState({});
  const [editedCategory, setEditedCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState(""); // Filter products by city

  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCities();
  }, [setEditedProduct, setEditedCategory, activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API_URL}/cities`);
      setCities(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  // Start editing a product
  const handleEditProduct = (product) => {
    setEditingProductId(product.product_id);
    setEditedProduct({ ...product });
  };

  // Start editing a category
  const handleEditCategory = (category) => {
    setEditingCategoryId(category.category_id);
    setEditedCategory({ ...category });
  };

  // Handle input changes for product
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for category
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited product
  const handleSaveProduct = async (productId) => {
    try {
      const response = await axios.put(`${API_URL}/products/adminEdit/${productId}`, editedProduct);
      if (response.status === 200) {
        setProducts((prev) =>
          prev.map((p) => (p.product_id === productId ? editedProduct : p))
        );
        setEditingProductId(null);
        setEditedProduct({});
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Save edited category
  const handleSaveCategory = async (categoryId) => {
    try {
      const response = await axios.put(`${API_URL}/categories/${categoryId}`, editedCategory);
      if (response.status === 200) {
        setCategories((prev) =>
          prev.map((c) => (c.category_id === categoryId ? editedCategory : c))
        );
        setEditingCategoryId(null);
        setEditedCategory({});
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`${API_URL}/products/${productId}`);
        if (response.status === 200) {
          setProducts((prev) => prev.filter((p) => p.product_id !== productId));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await axios.delete(`${API_URL}/categories/${categoryId}`);
        if (response.status === 200) {
          setCategories((prev) => prev.filter((c) => c.category_id !== categoryId));
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditingCategoryId(null);
    setEditedProduct({});
    setEditedCategory({});
  };

  // Filter products by city
  const filteredProducts = cityFilter
    ? products.filter((product) => product.city_name === cityFilter)
    : products;

  const productHeaders = [
    "Product ID",
    "Product Name",
    "Category Name",
    "Variety",
    "City Name",
    "Created At",
    "Actions",
  ];

  const categoryHeaders = ["Category ID", "Category Name", "Actions"];

  return (
    <>
      {isAdding ? (
        <ActionSocialMediaInti onCancle={handleCancel} />
      ) : (
        <div>
          <h2 className="text-[40px] font-medium">Product & Categories</h2>

          <div className="flex items-center gap-[16px] border-b border-[#F2F2F2] mt-[30px]">
            <div
              className={`relative cursor-pointer pb-2 transition-colors ${
                activeTab === "products" ? "text-[#11151F]" : "text-[#11151F]"
              }`}
              onClick={() => handleTabClick("products")}
            >
              <p className="text-[25px] font-[600]">Products</p>
              {activeTab === "products" && (
                <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#0243EC]"></div>
              )}
            </div>
            <div
              className={`relative cursor-pointer pb-2 transition-colors ${
                activeTab === "categories" ? "text-[#11151F]" : "text-[#11151F]"
              }`}
              onClick={() => handleTabClick("categories")}
            >
              <p className="text-[25px] font-[600]">Categories</p>
              {activeTab === "categories" && (
                <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#0243EC]"></div>
              )}
            </div>
          </div>

          {/* <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b">
           
              <p className="border px-[16px] py-[8px] rounded-[8px] font-semibold flex gap-2 items-center text-[14px] cursor-pointer">
                <Download size={16} strokeWidth={1.5} />
                Download PDF Report
              </p>
            </div>
          </div> */}

          <div className="mt-5">
            {activeTab === "products" && (
              <div>
                {/* City Filter Dropdown */}
                <div className="mb-4">
                  <label htmlFor="cityFilter" className="mr-2 text-sm font-medium">
                    Filter by City:
                  </label>
                  <select
                    id="cityFilter"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="border rounded p-2 text-sm"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city.city_name} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                  ) : (
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          {productHeaders.map((header, index) => (
                            <th
                              key={index}
                              className="px-4 py-2 text-sm font-medium text-gray-900 border-b"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <tr
                              key={product.product_id}
                              className={`${
                                product.product_id % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-gray-100`}
                            >
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {product.product_id}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {editingProductId === product.product_id ? (
                                  <input
                                    type="text"
                                    name="product_name"
                                    value={editedProduct.product_name || ""}
                                    onChange={handleProductChange}
                                    className="border rounded p-1 w-full"
                                  />
                                ) : (
                                  product.product_name
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {editingProductId === product.product_id ? (
                                  <select
                                    name="category_name"
                                    value={editedProduct.category_name || ""}
                                    onChange={handleProductChange}
                                    className="border rounded p-1 w-full"
                                  >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                      <option
                                        key={category.category_id}
                                        value={category.category_name}
                                      >
                                        {category.category_name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  product.category_name
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {editingProductId === product.product_id ? (
                                  <input
                                    type="text"
                                    name="variety"
                                    value={editedProduct.variety || ""}
                                    onChange={handleProductChange}
                                    className="border rounded p-1 w-full"
                                  />
                                ) : (
                                  product.variety || "N/A"
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {editingProductId === product.product_id ? (
                                  <select
                                    name="city_name"
                                    value={editedProduct.city_name || ""}
                                    onChange={handleProductChange}
                                    className="border rounded p-1 w-full"
                                  >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                      <option key={city.city_name} value={city.city_name}>
                                        {city.city_name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  product.city_name || "N/A"
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {product.created_at
                                  ? new Date(product.created_at).toLocaleDateString("en-GB")
                                  : "N/A"}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                                {editingProductId === product.product_id ? (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleSaveProduct(product.product_id)}
                                      className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditProduct(product)}
                                      className="text-blue-500 hover:text-blue-700"
                                    >
                                      <Pencil size={16} strokeWidth={1.5} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product.product_id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 size={16} strokeWidth={1.5} />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={productHeaders.length}
                              className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                            >
                              No products available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div className="overflow-x-auto">
                {loading ? (
                  <p className="text-center text-gray-600">Loading...</p>
                ) : (
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        {categoryHeaders.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-2 text-sm font-medium text-gray-900 border-b"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <tr
                            key={category.category_id}
                            className={`${
                              category.category_id % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100`}
                          >
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {category.category_id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {editingCategoryId === category.category_id ? (
                                <input
                                  type="text"
                                  name="category_name"
                                  value={editedCategory.category_name || ""}
                                  onChange={handleCategoryChange}
                                  className="border rounded p-1 w-full"
                                />
                              ) : (
                                category.category_name
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {editingCategoryId === category.category_id ? (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveCategory(category.category_id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditCategory(category)}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    <Pencil size={16} strokeWidth={1.5} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(category.category_id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 size={16} strokeWidth={1.5} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={categoryHeaders.length}
                            className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                          >
                            No categories available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCategories;