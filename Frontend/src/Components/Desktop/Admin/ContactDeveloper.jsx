import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const ContactDeveloper = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]); // Filtered data for display
  const [filterStatus, setFilterStatus] = useState("All"); // Track current filter
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = import.meta.env.VITE_API_URL;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy HH:mm:ss");
  };

  // Fetch all requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // Update filtered requests when filterStatus or requests change
  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredRequests(requests);
    } else {
      const resolvedValue = filterStatus === "Resolved" ? 1 : 0;
      setFilteredRequests(requests.filter((req) => req.resolved === resolvedValue));
    }
  }, [filterStatus, requests]);

  // Fetch requests from API
  const fetchRequests = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/contactdeveloper/getall`;
      if (filterStatus !== "All") {
        const resolvedValue = filterStatus === "Resolved" ? 1 : 0;
        url += `?resolved=${resolvedValue}`;
      }
      console.log("Fetching from URL:", url); // Debug: Log the URL
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data); // Debug: Log the response
      setRequests(data);
      // If backend doesn't filter, this will be overridden by client-side filtering in useEffect
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle resolved status change
  const handleResolvedChange = async (requestId, resolved) => {
    if (resolved === "") return;

    const payload = {
      id: requestId,
      resolved: resolved === "1" ? 1 : 0,
    };

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/contactdeveloper/adminUpdate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchRequests(); // Refresh the list after update
      } else {
        console.error("Failed to update resolved status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating resolved status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    fetchRequests(); // Refetch with new filter (if backend supports it)
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Contact Developer Requests</h3>
        </div>
        <div>
          <span className="mr-2">Filter Requests: </span>
          <select
            className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterStatus}
            onChange={handleFilterChange}
            disabled={loading}
          >
            <option value="All">All</option>
            <option value="Resolved">Resolved</option>
            <option value="Unresolved">Unresolved</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
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
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Email</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Query</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Resolved</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Created At</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Updated At</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className={`${request.id % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{request.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{request.userid}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{request.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">{request.email}</td>
                    <td className="px-6 py-4 border-b text-gray-600 max-w-[400px]">
                      <div className="overflow-x-auto whitespace-nowrap">{request.query}</div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {request.resolved ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {formatDate(request.created_at)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      {formatDate(request.updated_at)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 border-b">
                      <select
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={request.resolved ? "1" : "0"}
                        onChange={(e) => handleResolvedChange(request.id, e.target.value)}
                        disabled={loading}
                      >
                        <option value="0">Unresolved</option>
                        <option value="1">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-2 text-sm text-gray-600 border-b text-center">
                    No requests available
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

export default ContactDeveloper;