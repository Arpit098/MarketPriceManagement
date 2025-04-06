import React, { useState, useEffect } from "react";
import axios from "axios";

const SuccessStories = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [consultantNames, setConsultantNames] = useState({}); // Store consultant names by ID
  const [loading, setLoading] = useState(false); // Loading state for async actions

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all success stories on component mount
  useEffect(() => {
    fetchSuccessStories();
  }, []);

  // Fetch success stories from API
  const fetchSuccessStories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/successStories`);
      const data = await response.json();
      setSuccessStories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching success stories:", error);
      setSuccessStories([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch consultant names when success stories change
  useEffect(() => {
    const fetchConsultantNames = async () => {
      if (!Array.isArray(successStories) || successStories.length === 0) return;

      const uniqueConsultantIds = [
        ...new Set(successStories.map((story) => story.consultant_id).filter((id) => id)),
      ];

      const names = {};
      await Promise.all(
        uniqueConsultantIds.map(async (id) => {
          try {
            const response = await axios.get(`${API_URL}/userInformation/getName/${id}`);
            names[id] = response.data?.name || "N/A";
          } catch (error) {
            console.error(`Error fetching name for consultant ID ${id}:`, error);
            names[id] = "N/A";
          }
        })
      );
      setConsultantNames(names);
    };

    fetchConsultantNames();
  }, [successStories, API_URL]);

  // Handle status change (Pending, Approved, Rejected)
  const handleStatusChange = async (storyId, status) => {
    if (!status || status === "Select Action") return;

    const payload = {
      id: storyId,
      status: status,
    };

    try {
      const response = await fetch(`${API_URL}/successStories/adminUpdate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchSuccessStories(); // Refresh the list after status update
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating success story status:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Success Stories Requests</h3>
        </div>
      </div>

      {/* Success Stories Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Date
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Unique ID
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Topic
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Category
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Subject
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Success Story
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Status
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Consultant Name
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Admin Action
                </th>
              </tr>
            </thead>
            <tbody>
              {successStories.length > 0 ? (
                successStories.map((story) => (
                  <tr
                    key={story.id}
                    className={`${
                      story.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {story.date
                        ? new Date(story.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {story.unique_id || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {story.topic || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {story.category || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {story.subject || "N/A"}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600 max-w-[400px]">
                      <div className="overflow-x-auto whitespace-nowrap">
                        {story.success_story || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {story.status || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {consultantNames[story.consultant_id] || "Loading..."}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      <select
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => handleStatusChange(story.id, e.target.value)}
                      >
                        <option disabled selected>
                          Select Action
                        </option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                  >
                    No success stories available
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

export default SuccessStories;