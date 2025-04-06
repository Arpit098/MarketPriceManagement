import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formData, setFormData] = useState({
    name_of_article: "",
    beneficial_or_useful_for: "",
    email: "",
    category: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };
  // Fetch all articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch articles from API
  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_URL}/articles/consultant/${userData.id}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new article
  const createArticle = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
      email: userData.email || formData.email, // Use logged-in user's email if available
    };
    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchArticles(); // Re-fetch to update the list
        setFormData({
          name_of_article: "",
          beneficial_or_useful_for: "",
          email: "",
          category: "",
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  // Open edit modal with existing article data
  const openEditModal = (article) => {
    setCurrentArticle(article);
    setFormData({
      name_of_article: article.name_of_article,
      beneficial_or_useful_for: article.beneficial_or_useful_for,
      email: article.email,
      category: article.category,
    });
    setIsEditModalOpen(true);
  };

  // Update an existing article
  const updateArticle = async (e) => {
    e.preventDefault();
    const payload = {
      id: currentArticle.id,
      ...formData,
      consultant_id: userData.id,
    };
    try {
      const response = await fetch(`${API_URL}/articles/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchArticles(); // Re-fetch to update the list
        setIsEditModalOpen(false);
        setCurrentArticle(null);
        setFormData({
          name_of_article: "",
          beneficial_or_useful_for: "",
          email: "",
          category: "",
        });
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Articles
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-600">
            Below are articles with useful information for various categories.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Article
        </button>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Name of Article
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Useful For
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(article.date)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {article.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {article.name_of_article}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {article.beneficial_or_useful_for}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(article)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-articles">
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No articles available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Article Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Article
            </h3>
            <form onSubmit={createArticle}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Name of Article
                  </label>
                  <input
                    type="text"
                    name="name_of_article"
                    value={formData.name_of_article}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Name of Article"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Useful For
                  </label>
                  <input
                    type="text"
                    name="beneficial_or_useful_for"
                    value={formData.beneficial_or_useful_for}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Useful For"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Category"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Article
            </h3>
            <form onSubmit={updateArticle}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Name of Article
                  </label>
                  <input
                    type="text"
                    name="name_of_article"
                    value={formData.name_of_article}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Name of Article"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Useful For
                  </label>
                  <input
                    type="text"
                    name="beneficial_or_useful_for"
                    value={formData.beneficial_or_useful_for}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Useful For"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Category"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;