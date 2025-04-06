import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ConsultantWeeklyConsultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    unique_id: "",
    date_of_weekly_consultation: "",
    time: "",
    conducted_by: "",
    category: "",
    subject: "",
    program_link: "",
    conducted: "",
    if_not_why: "",
    number_of_participants: "",
    subscriber_feedback: "",
    your_feedback: "",
    our_feedback: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  // Fetch all weekly consultations on component mount
  useEffect(() => {
    fetchConsultations();
  }, []);

  // Fetch consultations from API
  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${API_URL}/weekly-consultations/${userData.id}`);
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error("Error fetching weekly consultations:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new weekly consultation
  const createConsultation = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
    };
    try {
      const response = await fetch(`${API_URL}/weekly-consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchConsultations();
        setFormData({
          date: "",
          unique_id: "",
          date_of_weekly_consultation: "",
          time: "",
          conducted_by: "",
          category: "",
          subject: "",
          program_link: "",
          conducted: "",
          if_not_why: "",
          number_of_participants: "",
          subscriber_feedback: "",
          your_feedback: "",
          our_feedback: "",
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating weekly consultation:", error);
    }
  };

  // Open edit modal with existing consultation data
  const openEditModal = (consultation) => {
    if (consultation.status !== "Pending") {
      alert("Consultation is not in pending status");
      return;
    }
    setCurrentConsultation(consultation);
    setFormData({
      date: consultation.date,
      unique_id: consultation.unique_id,
      date_of_weekly_consultation: consultation.date_of_weekly_consultation,
      time: consultation.time,
      conducted_by: consultation.conducted_by,
      category: consultation.category,
      subject: consultation.subject,
      program_link: consultation.program_link,
      conducted: consultation.conducted,
      if_not_why: consultation.if_not_why,
      number_of_participants: consultation.number_of_participants,
      subscriber_feedback: consultation.subscriber_feedback,
      your_feedback: consultation.your_feedback,
      our_feedback: consultation.our_feedback,
    });
    setIsEditModalOpen(true);
  };

  // Update an existing consultation
  const updateConsultation = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
      id: currentConsultation.id,
    };
    try {
      const response = await fetch(`${API_URL}/weekly-consultations/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchConsultations();
        setIsEditModalOpen(false);
        setCurrentConsultation(null);
        setFormData({
          date: "",
          unique_id: "",
          date_of_weekly_consultation: "",
          time: "",
          conducted_by: "",
          category: "",
          subject: "",
          program_link: "",
          conducted: "",
          if_not_why: "",
          number_of_participants: "",
          subscriber_feedback: "",
          your_feedback: "",
          our_feedback: "",
        });
      }
    } catch (error) {
      console.error("Error updating weekly consultation:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Weekly Consultation
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-700">
            Here is the list of weekly consultations, including details on participation and feedback.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Consultation
        </button>
      </div>

      {/* Weekly Consultations Table */}
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
                Date of Weekly Consultation
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Time
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Conducted By
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Subject
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Program Link
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Conducted
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                If Not, Why
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Participants
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Subscriber Feedback
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Your Feedback
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Our Feedback
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {consultations.length > 0 ? (
              consultations?.map((consultation) => (
                <tr
                  key={consultation.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(consultation.date)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.unique_id}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(consultation.date_of_weekly_consultation)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.time}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.conducted_by}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.subject}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-blue-600 dark:text-blue-400">
                    <a
                      href={consultation.program_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Program Link
                    </a>
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.conducted}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.if_not_why}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.number_of_participants}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.subscriber_feedback}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.your_feedback}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {consultation.our_feedback}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(consultation)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-consultations">
                <td colSpan="15" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No weekly consultations available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Consultation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Weekly Consultation
            </h3>
            <form onSubmit={createConsultation}>
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
                    Date of Weekly Consultation
                  </label>
                  <input
                    type="date"
                    name="date_of_weekly_consultation"
                    value={formData.date_of_weekly_consultation}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Conducted By
                  </label>
                  <input
                    type="text"
                    name="conducted_by"
                    value={formData.conducted_by}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Conducted By"
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
                    Program Link
                  </label>
                  <input
                    type="url"
                    name="program_link"
                    value={formData.program_link}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter program link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Conducted (Yes / No)
                  </label>
                  <select
                    name="conducted"
                    value={formData.conducted}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    If Not, Why
                  </label>
                  <textarea
                    name="if_not_why"
                    value={formData.if_not_why}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Reason if not conducted"
                    rows="3"
                    disabled={formData.conducted === "Yes"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Number of Participants
                  </label>
                  <input
                    type="number"
                    name="number_of_participants"
                    value={formData.number_of_participants}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Participants"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Subscriber Feedback
                  </label>
                  <textarea
                    name="subscriber_feedback"
                    value={formData.subscriber_feedback}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Subscriber Feedback"
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    name="your_feedback"
                    value={formData.your_feedback}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Your Feedback"
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Our Feedback
                  </label>
                  <textarea
                    name="our_feedback"
                    value={formData.our_feedback}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Our Feedback"
                    rows="3"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2  bottom-0 bg-white dark:bg-gray-800 py-2">
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

      {/* Edit Consultation Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Weekly Consultation
            </h3>
            <form onSubmit={updateConsultation}>
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
                    Date of Weekly Consultation
                  </label>
                  <input
                    type="date"
                    name="date_of_weekly_consultation"
                    value={formData.date_of_weekly_consultation}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Conducted By
                  </label>
                  <input
                    type="text"
                    name="conducted_by"
                    value={formData.conducted_by}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Conducted By"
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
                    Program Link
                  </label>
                  <input
                    type="url"
                    name="program_link"
                    value={formData.program_link}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter program link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Conducted (Yes / No)
                  </label>
                  <select
                    name="conducted"
                    value={formData.conducted}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    If Not, Why
                  </label>
                  <textarea
                    name="if_not_why"
                    value={formData.if_not_why}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Reason if not conducted"
                    rows="3"
                    disabled={formData.conducted === "Yes"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Number of Participants
                  </label>
                  <input
                    type="number"
                    name="number_of_participants"
                    value={formData.number_of_participants}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Participants"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Subscriber Feedback
                  </label>
                  <textarea
                    name="subscriber_feedback"
                    value={formData.subscriber_feedback}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Subscriber Feedback"
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    name="your_feedback"
                    value={formData.your_feedback}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Your Feedback"
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Our Feedback
                  </label>
                  <textarea
                    name="our_feedback"
                    value={formData.our_feedback}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Our Feedback"
                    rows="3"
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

export default ConsultantWeeklyConsultation;