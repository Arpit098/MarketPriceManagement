import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ConsultantSubjectUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    unique_id: "",
    name_of_consultant: "",
    category: "",
    subject: "",
    subject_updates: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  // Fetch all subject updates on component mount
  useEffect(() => {
    fetchSubjectUpdates();
  }, []);

  // Fetch subject updates from API
  const fetchSubjectUpdates = async () => {
    try {
      const response = await fetch(`${API_URL}/subject-updates/${userData.id}`);
      const data = await response.json();
      setUpdates(data);
    } catch (error) {
      console.error("Error fetching subject updates:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new subject update
  const createSubjectUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
    };
    try {
      const response = await fetch(`${API_URL}/subject-updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchSubjectUpdates();
        setFormData({
          date: "",
          unique_id: "",
          name_of_consultant: "",
          category: "",
          subject: "",
          subject_updates: "",
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating subject update:", error);
    }
  };

  // Open edit modal with existing subject update data
  const openEditModal = (update) => {
    if (update.status !== "Pending") {
      alert("Subject update is not in pending status");
      return;
    }
    setCurrentUpdate(update);
    setFormData({
      date: update.date,
      unique_id: update.unique_id,
      name_of_consultant: update.name_of_consultant,
      category: update.category,
      subject: update.subject,
      subject_updates: update.subject_updates,
    });
    setIsEditModalOpen(true);
  };

  // Update an existing subject update
  const updateSubjectUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
      id: currentUpdate.id,
    };
    try {
      const response = await fetch(`${API_URL}/subject-updates/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchSubjectUpdates();
        setIsEditModalOpen(false);
        setCurrentUpdate(null);
        setFormData({
          date: "",
          unique_id: "",
          name_of_consultant: "",
          category: "",
          subject: "",
          subject_updates: "",
        });
      }
    } catch (error) {
      console.error("Error updating subject update:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Subject Updates
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-700">
            Stay updated on the latest subjects and topics across different categories.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Update
        </button>
      </div>

      {/* Subject Updates Table */}
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
                Name of Consultant
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Subject
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Subject Updates
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {updates.length > 0 ? (
              updates?.map((update) => (
                <tr
                  key={update.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(update.date)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {update.unique_id}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {update.name_of_consultant}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {update.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {update.subject}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {update.subject_updates}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(update)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-updates">
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No subject updates available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Subject Update Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Subject Update
            </h3>
            <form onSubmit={createSubjectUpdate}>
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
                    Name of Consultant
                  </label>
                  <input
                    type="text"
                    name="name_of_consultant"
                    value={formData.name_of_consultant}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Consultant Name"
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Subject Updates (Video / PDF / JPEG)
                  </label>
                  <textarea
                    name="subject_updates"
                    value={formData.subject_updates}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter update details or link (Video/PDF/JPEG)"
                    rows="3"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 sticky bottom-0 bg-white dark:bg-gray-800 py-2">
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

      {/* Edit Subject Update Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Subject Update
            </h3>
            <form onSubmit={updateSubjectUpdate}>
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
                    Name of Consultant
                  </label>
                  <input
                    type="text"
                    name="name_of_consultant"
                    value={formData.name_of_consultant}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Consultant Name"
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Subject Updates (Video / PDF / JPEG)
                  </label>
                  <textarea
                    name="subject_updates"
                    value={formData.subject_updates}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter update details or link (Video/PDF/JPEG)"
                    rows="3"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 sticky bottom-0 bg-white dark:bg-gray-800 py-2">
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

export default ConsultantSubjectUpdates;