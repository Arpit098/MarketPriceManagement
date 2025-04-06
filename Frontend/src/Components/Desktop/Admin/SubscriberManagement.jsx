import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SubscriberManagement = () => {
  const [subscribers, setSubscribers] = useState([]); // Fetched user data
  const [editingId, setEditingId] = useState(null); // Track which row is being edited

  // Fetch subscribers from API
  const getSubscribers = async () => {
    try {
      const response = await axios.get(`${API_URL}/userInformation/getSubscribers`);
      setSubscribers(
        response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          can_update: user.can_update || 0, // Default to 0 if undefined
        }))
      );
    } catch (error) {
      console.error("Error fetching subscribers:", error.response?.data || error.message);
    }
  };
  const handleCanUpdateChange = (id, value) => {
    const updatedSubscriber = {
      ...subscribers.find((sub) => sub.id === id),
      can_update: value === "Yes" ? 1 : 0, // Convert Yes/No to 1/0
    };
    updateSubscriber(updatedSubscriber);
  };
  // Update subscriber via API
  const updateSubscriber = async (subscriber) => {
    try {
      
      const response = await axios.post(`${API_URL}/userInformation/updateSubscriber`, {id: subscriber.id, can_update: subscriber.can_update});
      console.log("Update response:", response.data);
      // Update local state with the response
      setSubscribers((prev) =>
        prev.map((sub) => (sub.id === subscriber.id ? { ...sub, ...subscriber } : sub))
      );
      setEditingId(null); // Exit edit mode after update
    } catch (error) {
      console.error("Error updating subscriber:", error.response?.data || error.message);
    }
  };

  // Fetch subscribers on mount
  useEffect(() => {
    getSubscribers();
  }, []);

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const handleEditClick = (id) => {
    setEditingId(id); // Enter edit mode for this row
  };

  const handleCancelClick = () => {
    setEditingId(null); // Exit edit mode without saving
  };

  

  const tableFields = ["id", "name", "email", "phone_number", "can_update"];

  return (
    <div className="mx-auto px-4 py-8 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-800">
            Subscriber Management
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-=600">
            Manage subscriber permissions below.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-300 overflow-x-auto w-full">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              {tableFields.map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  {formatKey(key)}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((subscriber, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  {tableFields.map((key) => (
                    <td
                      key={key}
                      className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap"
                    >
                      {key === "can_update" && editingId === subscriber.id ? (
                        <select
                          value={subscriber.can_update === 1 ? "Yes" : "No"}
                          onChange={(e) => handleCanUpdateChange(subscriber.id, e.target.value)}
                          className="mt-1 block w-full rounded-md border-2 border-gray-300 py-1 px-2 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      ) : subscriber[key] !== null && subscriber[key] !== undefined ? (
                        key === "can_update" ? (
                          subscriber[key] === 1 ? "Yes" : "No"
                        ) : (
                          subscriber[key]
                        )
                      ) : (
                        "N/A"
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-sm flex space-x-2">
                    <button
                      onClick={() => handleEditClick(subscriber.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    {editingId === subscriber.id && (
                      <button
                        onClick={handleCancelClick}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableFields.length + 1} className="px-4 py-2 text-center text-gray-600">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberManagement;