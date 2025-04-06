import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const API_URL = import.meta.env.VITE_API_URL;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy HH:mm:ss"); // Include time for timestamps
  };

  // Fetch all feedback on component mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch feedback from API
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/feedback`); // Adjust endpoint if needed
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched feedback:", data); // Debug: Log the response
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Feedback Entries</h3>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">ID</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">User ID</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Name</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Mobile Number</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Subject</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Purpose</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Created At</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <tr
                    key={feedback.id}
                    className={`${feedback.id % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{feedback.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{feedback.userid}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{feedback.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{feedback.mobile_number}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{feedback.subject}</td>
                    <td className="px-6 py-4 border-b text-gray-600 max-w-[400px]">
                      <div className="overflow-x-auto whitespace-nowrap">{feedback.purpose}</div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {formatDate(feedback.created_at)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {feedback.updated_at ? formatDate(feedback.updated_at) : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-2 text-sm text-gray-600 border-b text-center">
                    No feedback available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Feedback;