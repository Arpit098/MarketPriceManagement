import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherUpdate = () => {
  const [weatherUpdates, setWeatherUpdates] = useState([]);
  const [consultantNames, setConsultantNames] = useState({}); // Store consultant names by ID
  const [loading, setLoading] = useState(false); // Loading state for async actions

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all weather updates on component mount
  useEffect(() => {
    fetchWeatherUpdates();
  }, []);

  // Fetch weather updates from API
  const fetchWeatherUpdates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/weatherUpdates`);
      const data = await response.json();
      setWeatherUpdates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching weather updates:", error);
      setWeatherUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch consultant names when weather updates change
  useEffect(() => {
    const fetchConsultantNames = async () => {
      if (!Array.isArray(weatherUpdates) || weatherUpdates.length === 0) return;

      const uniqueConsultantIds = [
        ...new Set(weatherUpdates.map((update) => update.consultant_id).filter((id) => id)),
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
  }, [weatherUpdates, API_URL]);

  // Handle status change (Pending, Approved, Rejected)
  const handleStatusChange = async (updateId, status) => {
    if (!status || status === "Select Action") return;

    const payload = {
      id: updateId,
      status: status,
    };

    try {
      const response = await fetch(`${API_URL}/weatherUpdates/adminUpdate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchWeatherUpdates(); // Refresh the list after status update
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating weather update status:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Weather Updates Requests</h3>
        </div>
      </div>

      {/* Weather Updates Table */}
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
                  Prediction Area
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Prediction
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Advice
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
              {weatherUpdates.length > 0 ? (
                weatherUpdates.map((update) => (
                  <tr
                    key={update.id}
                    className={`${
                      update.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {update.date
                        ? new Date(update.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {update.unique_id || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {update.prediction_area || "N/A"}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600 max-w-[400px]">
                      <div className="overflow-x-auto whitespace-nowrap">
                        {update.prediction || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600 max-w-[400px]">
                      <div className="overflow-x-auto whitespace-nowrap">
                        {update.advice || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {update.status || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {consultantNames[update.consultant_id] || "Loading..."}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      <select
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => handleStatusChange(update.id, e.target.value)}
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
                    colSpan="8"
                    className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                  >
                    No weather updates available
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

export default WeatherUpdate;