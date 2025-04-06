import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useSelector } from "react-redux";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ContactDeveloper = () => {
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [contactHistory, setContactHistory] = useState([]);

  // Handle input changes in form fields (create modal)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle input changes in update modal
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuery({
      ...selectedQuery,
      [name]: value,
    });
  };

  // Fetch contact history
  const fetchContactHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/Contactdeveloper/${userData.id}`);
      console.log("Fetched contact history:", response.data);
      setContactHistory(response.data);
    } catch (error) {
      console.error("Error fetching contact history:", error);
    }
  };

  // Create a new contact query
  const createContactQuery = async () => {
    try {
      const response = await axios.post(`${API_URL}/contactdeveloper`, {
        userid: userData.id,
        ...formData,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating contact query:", error);
      throw error;
    }
  };

  // Update a contact query
  const updateContactQuery = async () => {
    try {
      const response = await axios.put(`${API_URL}/contactdeveloper/${selectedQuery.id}`, {
        name: selectedQuery.name,
        email: selectedQuery.email,
        query: selectedQuery.query,
      });
      console.log("Updated contact query:", response.data);
      fetchContactHistory(); // Refresh history
      setOpenUpdateModal(false);
      setSubmissionStatus("Query updated successfully!");
    } catch (error) {
      console.error("Error updating contact query:", error);
      setSubmissionStatus("Failed to update query. Please try again.");
    }
  };

  // Delete a contact query
  const deleteContactQuery = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/contactdeveloper/${id}`);
      console.log("Deleted contact query:", response.data);
      fetchContactHistory(); // Refresh history
    } catch (error) {
      console.error("Error deleting contact query:", error);
      setSubmissionStatus("Failed to delete query. Please try again.");
    }
  };

  // Handle form submission (create modal)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContactQuery();
      setSubmissionStatus("Your query has been submitted successfully!");
      setFormData({ name: "", email: "", query: "" });
      fetchContactHistory();
    } catch (error) {
      setSubmissionStatus("Failed to submit query. Please try again.");
    } finally {
      setIsSubmitting(false);
      setOpenModal(false);
    }
  };

  // Open update modal with selected query data
  const openUpdateModalWithData = (entry) => {
    setSelectedQuery(entry);
    setOpenUpdateModal(true);
  };

  // Fetch history on mount and when userData.id changes
  useEffect(() => {
    if (userData.id) {
      fetchContactHistory();
    }
  }, [userData.id]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Main Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-600 p-6">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center flex-1">
            Contact History
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className="ml-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2"
          >
            Contact Developer
          </button>
        </div>

        {/* Contact History Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Query
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Developer Response
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Resolved
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contactHistory.length > 0 ? (
                contactHistory.map((entry) => (
                  <tr key={entry.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {entry.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {entry.query}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {entry.developerResponse || "Awaiting response"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {entry.resolved ? (
                        <span className="text-green-500">✔</span>
                      ) : (
                        <span className="text-yellow-500">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      <button
                        onClick={() => openUpdateModalWithData(entry)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        title="Update"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteContactQuery(entry.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                    No queries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Contact Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        center
        classNames={{ modal: "customModal w-full max-w-2xl" }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Contact Developer
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your Email Address"
                required
              />
            </div>
            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2"
              >
                Your Query
              </label>
              <textarea
                id="query"
                name="query"
                value={formData.query}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Describe your issue or query"
                required
              ></textarea>
            </div>
            {submissionStatus && (
              <div
                className={`text-sm mt-3 text-center ${
                  submissionStatus.includes("Failed")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {submissionStatus}
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600"
                } text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 flex items-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <span>Submitting...</span>
                    <span className="animate-spin">⏳</span>
                  </>
                ) : (
                  <>
                    <span>Submit Query</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Update Contact Modal */}
      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        center
        classNames={{ modal: "customModal w-full max-w-2xl" }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Update Query
          </h2>

          {selectedQuery && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="updateName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="updateName"
                  name="name"
                  value={selectedQuery.name || ""}
                  onChange={handleUpdateInputChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="updateEmail"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="updateEmail"
                  name="email"
                  value={selectedQuery.email || ""}
                  onChange={handleUpdateInputChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your Email Address"
                />
              </div>
              <div>
                <label
                  htmlFor="updateQuery"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2"
                >
                  Your Query
                </label>
                <textarea
                  id="updateQuery"
                  name="query"
                  value={selectedQuery.query || ""}
                  onChange={handleUpdateInputChange}
                  rows="5"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Describe your issue or query"
                ></textarea>
              </div>
              
              {submissionStatus && (
                <div
                  className={`text-sm mt-3 text-center ${
                    submissionStatus.includes("Failed")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {submissionStatus}
                </div>
              )}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setOpenUpdateModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateContactQuery}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ContactDeveloper;