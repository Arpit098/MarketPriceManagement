import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ConsultantQuestionsAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [formData, setFormData] = useState({
    your_feedback: "", // Only consultant's feedback is editable
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  // Fetch all questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch all questions and answers from API (not filtered by consultant ID)
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/questions-answers`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions and answers:", error);
    }
  };

  // Handle form input changes (only for your_feedback)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open edit modal with existing question data
  const openEditModal = (question) => {
    setCurrentQuestion(question);
    setFormData({
      your_feedback: question.your_feedback || "",
    });
    setIsEditModalOpen(true);
  };

  // Update consultant's feedback for a question
  const updateQuestion = async (e) => {
    e.preventDefault();
    const payload = {
      your_feedback: formData.your_feedback,
      consultant_id: userData.id,
      id: currentQuestion.id,
    };
    try {
      const response = await fetch(`${API_URL}/questions-answers/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchQuestions();
        setIsEditModalOpen(false);
        setCurrentQuestion(null);
        setFormData({ your_feedback: "" });
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Question & Answers
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-700">
            Review questions submitted by subscribers and provide your feedback.
          </p>
        </div>
      </div>

      {/* Questions and Answers Table */}
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
                Name of Subscriber
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                City / Village
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
                Question
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Answer
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
            {questions.length > 0 ? (
              questions.map((question) => (
                <tr
                  key={question.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(question.date)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.unique_id}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.name_of_subscriber}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.city_village}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.conducted_by}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.subject}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.question}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.answer}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.number_of_participants}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.subscriber_feedback || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.your_feedback || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {question.our_feedback || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(question)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit Feedback
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No questions and answers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Feedback Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Your Feedback
            </h3>
            <div className="overflow-y-auto flex-grow pr-2">
              <form onSubmit={updateQuestion}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Read-only fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      value={formatDate(currentQuestion.date)}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Unique ID
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.unique_id}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Name of Subscriber
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.name_of_subscriber}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      City / Village
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.city_village}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Conducted By
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.conducted_by}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.category}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.subject}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Question
                    </label>
                    <textarea
                      value={currentQuestion.question}
                      className="p-2 border rounded w-full bg-gray-100"
                      rows="3"
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Answer
                    </label>
                    <textarea
                      value={currentQuestion.answer}
                      className="p-2 border rounded w-full bg-gray-100"
                      rows="3"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Number of Participants
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.number_of_participants}
                      className="p-2 border rounded w-full bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Subscriber Feedback
                    </label>
                    <textarea
                      value={currentQuestion.subscriber_feedback || "N/A"}
                      className="p-2 border rounded w-full bg-gray-100"
                      rows="3"
                      readOnly
                    />
                  </div>
                  {/* Editable field */}
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
                      value={currentQuestion.our_feedback || "N/A"}
                      className="p-2 border rounded w-full bg-gray-100"
                      rows="3"
                      readOnly
                    />
                  </div>
                </div>
              </form>
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
                onClick={updateQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantQuestionsAnswers;