import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    unique_id: "",
    scheme_image: "",
    scheme_name: "",
    sponsored_by: "",
    department: "",
    category: "",
    subject: "",
    useful_for: "",
    government_scheme_description: "",
    purpose: "",
    eligibility_criteria: "",
    documents_required: "",
    terms_conditions: "",
    apply_at: "",
    download_form: "",
    website: "",
    email: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});

  // Helper function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch all government schemes on component mount
  useEffect(() => {
    fetchGovernmentSchemes();
  }, []);

  // Fetch government schemes from API
  const fetchGovernmentSchemes = async () => {
    try {
      const response = await fetch(`${API_URL}/govscheme/consultant/${userData.id}`);
      const data = await response.json();
      setSchemes(data);
    } catch (error) {
      console.error("Error fetching government schemes:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new government scheme
  const createGovernmentScheme = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
      email: userData.email || formData.email,
    };
    try {
      const response = await fetch(`${API_URL}/govscheme/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchGovernmentSchemes();
        setFormData({
          date: "",
          unique_id: "",
          scheme_image: "",
          scheme_name: "",
          sponsored_by: "",
          department: "",
          category: "",
          subject: "",
          useful_for: "",
          government_scheme_description: "",
          purpose: "",
          eligibility_criteria: "",
          documents_required: "",
          terms_conditions: "",
          apply_at: "",
          download_form: "",
          website: "",
          email: "",
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating government scheme:", error);
    }
  };

  // Open edit modal with existing scheme data
  const openEditModal = (scheme) => {
    setCurrentScheme(scheme);
    setFormData({
      date: scheme.date,
      unique_id: scheme.unique_id,
      scheme_image: scheme.scheme_image,
      scheme_name: scheme.scheme_name,
      sponsored_by: scheme.sponsored_by,
      department: scheme.department,
      category: scheme.category,
      subject: scheme.subject,
      useful_for: scheme.useful_for,
      government_scheme_description: scheme.government_scheme_description,
      purpose: scheme.purpose,
      eligibility_criteria: scheme.eligibility_criteria,
      documents_required: scheme.documents_required,
      terms_conditions: scheme.terms_conditions,
      apply_at: scheme.apply_at,
      download_form: scheme.download_form,
      website: scheme.website,
      email: scheme.email,
    });
    setIsEditModalOpen(true);
  };

  // Update an existing government scheme
  const updateGovernmentScheme = async (e) => {
    e.preventDefault();
    const payload = {
      id: currentScheme.id,
      ...formData,
      consultant_id: userData.id,
    };
    try {
      const response = await fetch(`${API_URL}/govscheme/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchGovernmentSchemes();
        setIsEditModalOpen(false);
        setCurrentScheme(null);
        setFormData({
          date: "",
          unique_id: "",
          scheme_image: "",
          scheme_name: "",
          sponsored_by: "",
          department: "",
          category: "",
          subject: "",
          useful_for: "",
          government_scheme_description: "",
          purpose: "",
          eligibility_criteria: "",
          documents_required: "",
          terms_conditions: "",
          apply_at: "",
          download_form: "",
          website: "",
          email: "",
        });
      }
    } catch (error) {
      console.error("Error updating government scheme:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Government Schemes
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-700">
            Below are the government schemes stated by you.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Scheme
        </button>
      </div>

      {/* Government Schemes Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Unique ID
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Scheme Name
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Sponsored By
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Department
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Subject
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Useful For
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Apply At
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <tr
                  key={scheme.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(scheme.date)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.unique_id}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.scheme_name}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.sponsored_by}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.department}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.subject}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {scheme.useful_for}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <a
                      href={scheme.apply_at}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Apply
                    </a>
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(scheme)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-schemes">
                <td colSpan="10" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No government schemes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Government Scheme Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Government Scheme
            </h3>
            <form onSubmit={createGovernmentScheme}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Unique ID
                  </label>
                  <input
                    type="text"
                    name="unique_id"
                    value={formData.unique_id}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Unique ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Scheme Image
                  </label>
                  <input
                    type="text"
                    name="scheme_image"
                    value={formData.scheme_image}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Scheme Image URL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Scheme Name
                  </label>
                  <input
                    type="text"
                    name="scheme_name"
                    value={formData.scheme_name}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Scheme Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Sponsored By
                  </label>
                  <input
                    type="text"
                    name="sponsored_by"
                    value={formData.sponsored_by}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Sponsored By"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Department"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Useful For
                  </label>
                  <input
                    type="text"
                    name="useful_for"
                    value={formData.useful_for}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Useful For"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Apply At
                  </label>
                  <input
                    type="url"
                    name="apply_at"
                    value={formData.apply_at}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Apply At Link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Download Form
                  </label>
                  <input
                    type="url"
                    name="download_form"
                    value={formData.download_form}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Download Form Link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Website Link"
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
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Purpose
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Purpose"
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Description
                  </label>
                  <textarea
                    name="government_scheme_description"
                    value={formData.government_scheme_description}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Government Scheme Description"
                    rows="2"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Eligibility Criteria
                  </label>
                  <textarea
                    name="eligibility_criteria"
                    value={formData.eligibility_criteria}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Eligibility Criteria"
                    rows="2" // Reduced from 3 to 2
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Documents Required
                  </label>
                  <textarea
                    name="documents_required"
                    value={formData.documents_required}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Documents Required"
                    rows="2" // Reduced from 3 to 2
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Terms & Conditions
                  </label>
                  <textarea
                    name="terms_conditions"
                    value={formData.terms_conditions}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Terms & Conditions"
                    rows="3"
                    required
                  />
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

      {/* Edit Government Scheme Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Government Scheme
            </h3>
            <form onSubmit={updateGovernmentScheme}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Unique ID
                  </label>
                  <input
                    type="text"
                    name="unique_id"
                    value={formData.unique_id}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Unique ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Scheme Image
                  </label>
                  <input
                    type="text"
                    name="scheme_image"
                    value={formData.scheme_image}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Scheme Image URL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Scheme Name
                  </label>
                  <input
                    type="text"
                    name="scheme_name"
                    value={formData.scheme_name}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Scheme Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Sponsored By
                  </label>
                  <input
                    type="text"
                    name="sponsored_by"
                    value={formData.sponsored_by}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Sponsored By"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Department"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Useful For
                  </label>
                  <input
                    type="text"
                    name="useful_for"
                    value={formData.useful_for}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Useful For"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Description
                  </label>
                  <textarea
                    name="government_scheme_description"
                    value={formData.government_scheme_description}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Government Scheme Description"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Purpose
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Purpose"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Eligibility Criteria
                  </label>
                  <textarea
                    name="eligibility_criteria"
                    value={formData.eligibility_criteria}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Eligibility Criteria"
                    rows="2" // Reduced from 3 to 2
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Documents Required
                  </label>
                  <textarea
                    name="documents_required"
                    value={formData.documents_required}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Documents Required"
                    rows="2" // Reduced from 3 to 2
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Terms & Conditions
                  </label>
                  <textarea
                    name="terms_conditions"
                    value={formData.terms_conditions}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Terms & Conditions"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Apply At
                  </label>
                  <input
                    type="url"
                    name="apply_at"
                    value={formData.apply_at}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Apply At Link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Download Form
                  </label>
                  <input
                    type="url"
                    name="download_form"
                    value={formData.download_form}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Download Form Link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Website Link"
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

export default GovernmentSchemes;