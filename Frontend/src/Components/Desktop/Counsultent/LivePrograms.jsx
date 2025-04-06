import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ConsultantLivePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [formData, setFormData] = useState({
    unique_id: "",
    date_of_program: "",
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

  // Fetch all live programs on component mount
  useEffect(() => {
    fetchPrograms();
  }, [isEditModalOpen, isAddModalOpen]);

  // Fetch live programs from API
  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_URL}/liveProgram/myPrograms/${userData.id}`);
      const data = await response.json();
      console.log(data)
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching live programs:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new live program
  const createProgram = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
    };
    try {
      const response = await fetch(`${API_URL}/liveProgram`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchPrograms();
        setFormData({
          unique_id: "",
          date_of_program: "",
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
      console.error("Error creating live program:", error);
    }
  };

  // Open edit modal with existing program data
  const openEditModal = (program) => {
    setCurrentProgram(program);
    setFormData({
      unique_id: program.unique_id,
      date_of_program: program.date_of_program,
      time: program.time,
      conducted_by: program.conducted_by,
      category: program.category,
      subject: program.subject,
      program_link: program.program_link,
      conducted: program.conducted,
      if_not_why: program.if_not_why,
      number_of_participants: program.number_of_participants,
      // subscriber_feedback: program.subscriber_feedback,
      your_feedback: program.your_feedback,
      // our_feedback: program.our_feedback,
    });
    setIsEditModalOpen(true);
  };

  // Update an existing live program
  const updateProgram = async (e) => {
    e.preventDefault();
  
    // Convert conducted to lowercase and map to 1 or 0
    const conductedValue = formData.conducted.toLowerCase();
    const conductedForDB = conductedValue === "yes" ? 1 : conductedValue === "no" ? 0 : formData.conducted;
  
    const payload = {
      ...formData,
      conducted: conductedForDB, // Override conducted with 1 or 0
      consultant_id: userData.id,
      id: currentProgram.id,
    };
  
    try {
      const response = await fetch(`${API_URL}/liveProgram/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchPrograms();
        setIsEditModalOpen(false);
        setCurrentProgram(null);
        setFormData({
          unique_id: "",
          date_of_program: "",
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
      } else {
        const errorData = await response.json();
        console.error("Error updating live program:", errorData);
      }
    } catch (error) {
      console.error("Error updating live program:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Live Programs
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-700">
            Below is the list of live programs along with details on participation and feedback.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Program
        </button>
      </div>

      {/* Live Programs Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
             
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Unique ID
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Date of Program
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
            {Array.isArray(programs) && programs.length > 0 ? (
              programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.unique_id || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.date_of_program ? formatDate(program.date_of_program) : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.time || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.conducted_by || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.category || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.subject || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.program_link ? (
                      <a
                        href={program.program_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Link
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.conducted || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.if_not_why || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.number_of_participants || "N/A"}
                  </td>
                   <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.subscriber_feedback || "N/A"}
                  </td>
                 <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.your_feedback || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {program.our_feedback || "N/A"}
                  </td>
                  
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(program)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-programs">
                <td colSpan="15" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No live programs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Live Program Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Live Program
            </h3>
            <form onSubmit={createProgram}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
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
                    Date of Program
                  </label>
                  <input
                    type="date"
                    name="date_of_program"
                    value={formData.date_of_program}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Program Link
                  </label>
                  <input
                    type="url"
                    name="program_link"
                    value={formData.program_link}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Program Link"
                    required
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Conducted (Yes/No)
                  </label>
                  <input
                    type="text"
                    name="conducted"
                    value={formData.conducted}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Yes/No"
                    required
                  />
                </div> */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    If Not, Why
                  </label>
                  <input
                    type="text"
                    name="if_not_why"
                    value={formData.if_not_why}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Reason if not conducted"
                  />
                </div> */}
                {/* <div>
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
                </div> */}
                {/* <div className="md:col-span-2">
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
                </div> */}
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
                {/* <div className="md:col-span-2">
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
                </div> */}
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

      {/* Edit Live Program Modal */}
      {isEditModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Edit Live Program
      </h3>
      <form onSubmit={updateProgram}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              Date of Program
            </label>
            <input
              type="date"
              name="date_of_program"
              value={formData.date_of_program}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Program Link
            </label>
            <input
              type="url"
              name="program_link"
              value={formData.program_link}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              placeholder="Program Link"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Conducted (Yes/No)
            </label>
            <input
              type="text"
              name="conducted"
              value={formData.conducted}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              placeholder="Yes/No"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              If Not, Why
            </label>
            <input
              type="text"
              name="if_not_why"
              value={formData.if_not_why}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              placeholder="Reason if not conducted"
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

export default ConsultantLivePrograms;