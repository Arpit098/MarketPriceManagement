import { Trash2, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "../../../store/API/Feedback";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SubFeedback = () => {
  const dispatch = useDispatch();
  const { FeedbackData } = useSelector((state) => state.GetFeedback);
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});

  const [formData, setFormData] = useState({
    service_type: "",
    service_id: "",
    consultant_name: "",
    subject: "",
    purpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [services, setServices] = useState([]); // To store fetched services

  // Handle input changes in create modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Fetch services when service_type changes
    if (name === "service_type" && value) {
      fetchServices(value);
    }

    // Fetch consultant when service_id changes
    if (name === "service_id" && value) {
      fetchConsultant(value);
    }
  };

  // Handle input changes in update modal
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedFeedback((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch feedback on mount and when userData.id changes
  useEffect(() => {
    if (userData.id) {
      dispatch(fetchFeedback());
    }
  }, [dispatch, userData.id]);

  // Fetch services based on service type
  const fetchServices = async (serviceType) => {
    try {
      const endpoint =
        serviceType === "Basic Service"
          ? `${API_URL}/basic-services`
          : `${API_URL}/value-added-services`;
      const response = await axios.get(endpoint);
      setServices(response.data);
      setFormData((prev) => ({ ...prev, service_id: "", consultant_name: "" })); // Reset service_id and consultant_name
    } catch (error) {
      console.error("Error fetching services:", error);
      setSubmissionStatus("Failed to fetch services. Please try again.");
    }
  };

  // Fetch consultant based on selected service
  const fetchConsultant = async (serviceId) => {
    try {
      const endpoint = `${API_URL}/services/${serviceId}/consultant`; // Adjust endpoint as per your API
      const response = await axios.get(endpoint);
      const consultantName = response.data.consultant_name; // Assuming API returns { consultant_name: "..." }
      setFormData((prev) => ({ ...prev, consultant_name: consultantName }));
    } catch (error) {
      console.error("Error fetching consultant:", error);
      setSubmissionStatus("Failed to fetch consultant. Please try again.");
    }
  };

  // Create a new feedback entry
  const createFeedback = async () => {
    try {
      const response = await axios.post(`${API_URL}/feedback`, {
        userid: userData.id,
        ...formData,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  };

  // Handle form submission (create modal)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createFeedback();
      setSubmissionStatus("Your feedback has been submitted successfully!");
      setFormData({
        service_type: "",
        service_id: "",
        consultant_name: "",
        subject: "",
        purpose: "",
      });
      setServices([]);
      dispatch(fetchFeedback());
    } catch (error) {
      setSubmissionStatus("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
      setOpenModal(false);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/feedback/${id}`);
      dispatch(fetchFeedback());
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setSubmissionStatus("Failed to delete feedback. Please try again.");
    }
  };

  // Open update modal with selected feedback data
  const handleUpdateOpen = (item) => {
    setSelectedFeedback(item);
    setOpenUpdateModal(true);
  };

  // Update feedback
  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`${API_URL}/feedback/${selectedFeedback.id}`, {
        name: selectedFeedback.name,
        mobile_number: selectedFeedback.mobile_number,
        subject: selectedFeedback.subject,
        purpose: selectedFeedback.purpose,
      });
      dispatch(fetchFeedback());
      setOpenUpdateModal(false);
      setSubmissionStatus("Feedback updated successfully!");
    } catch (error) {
      console.error("Error updating feedback:", error);
      setSubmissionStatus("Failed to update feedback. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Main Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-600 p-6">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center flex-1">
            Feedback History
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className="ml-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2"
          >
            Add Feedback
          </button>
        </div>

        {/* Feedback History Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service ID
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Consultant
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {FeedbackData?.length > 0 ? (
                FeedbackData.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.service_type}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.service_id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.consultant_name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.subject}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.purpose}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      <button
                        onClick={() => handleUpdateOpen(item)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        title="Update"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No feedback yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Feedback Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        center
        classNames={{ modal: "customModal w-full max-w-2xl max-h-[90vh] overflow-y-auto" }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Add Feedback
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="service_type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
              >
                Service Type
              </label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select Service Type</option>
                <option value="Basic Service">Basic Service</option>
                <option value="Value Added Service">Value Added Service</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="service_id"
                className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
              >
                Select Service
              </label>
              <select
                id="service_id"
                name="service_id"
                value={formData.service_id}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                disabled={!formData.service_type}
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name || service.subject || `Service ${service.id}`} {/* Adjust based on your API response */}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="consultant_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
              >
                Consultant Name
              </label>
              <input
                type="text"
                id="consultant_name"
                name="consultant_name"
                value={formData.consultant_name}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-white"
                placeholder="Consultant Name (Auto-filled)"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Subject"
                required
              />
            </div>
            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
              >
                Purpose
              </label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Describe your feedback"
                required
              ></textarea>
            </div>
            {submissionStatus && (
              <div
                className={`text-sm mt-3 text-center ${
                  submissionStatus.includes("Failed") ? "text-red-500" : "text-green-500"
                }`}
              >
                {submissionStatus}
              </div>
            )}
            <div className="flex justify-center bottom-0 bg-white dark:bg-gray-800 py-2">
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
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Update Feedback Modal */}
      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        center
        classNames={{ modal: "customModal w-full max-w-2xl max-h-[90vh] overflow-y-auto" }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Update Feedback
          </h2>
          {selectedFeedback && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="updateServiceType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Service Type
                </label>
                <input
                  type="text"
                  id="updateServiceType"
                  name="service_type"
                  value={selectedFeedback.service_type || ""}
                  onChange={handleUpdateInputChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Service Type"
                />
              </div>
              <div>
                <label
                  htmlFor="updateServiceId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Service ID
                </label>
                <input
                  type="text"
                  id="updateServiceId"
                  name="service_id"
                  value={selectedFeedback.service_id || ""}
                  onChange={handleUpdateInputChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Service ID"
                />
              </div>
              <div>
                <label
                  htmlFor="updateConsultantName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Consultant Name
                </label>
                <input
                  type="text"
                  id="updateConsultantName"
                  name="consultant_name"
                  value={selectedFeedback.consultant_name || ""}
                  onChange={handleUpdateInputChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Consultant Name"
                />
              </div>
              <div>
                <label
                  htmlFor="updateSubject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="updateSubject"
                  name="subject"
                  value={selectedFeedback.subject || ""}
                  onChange={handleUpdateInputChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label
                  htmlFor="updatePurpose"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Purpose
                </label>
                <textarea
                  id="updatePurpose"
                  name="purpose"
                  value={selectedFeedback.purpose || ""}
                  onChange={handleUpdateInputChange}
                  rows="5"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Describe your feedback"
                ></textarea>
              </div>
              {submissionStatus && (
                <div
                  className={`text-sm mt-3 text-center ${
                    submissionStatus.includes("Failed") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {submissionStatus}
                </div>
              )}
              <div className="flex justify-center space-x-4 sticky bottom-0 bg-white dark:bg-gray-800 py-2">
                <button
                  onClick={() => setOpenUpdateModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubmit}
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

export default SubFeedback;