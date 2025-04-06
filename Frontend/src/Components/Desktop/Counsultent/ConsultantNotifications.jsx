import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";


const ConsultantNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    email: "",
    category: "",
    subject: "",
    useful_for: "",
    links: "",
    title: "",
    description: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };
  // Fetch all notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []); // Empty dependency array for mount only

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/notifications/${userData.id}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new notification
  const createNotification = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
    };
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchNotifications(); // Re-fetch to get the full updated list
        setFormData({
          date: "",
          email: "",
          category: "",
          subject: "",
          useful_for: "",
          links: "",
          title: "",
          description: "",
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  // Open edit modal with existing notification data
  const openEditModal = (notification) => {
    if(notification.status != "Pending"){
      alert("Notification is not in pending status");
      return;
    } 
    setCurrentNotification(notification);
    setFormData({
      date: notification.date,
      email: notification.email,
      category: notification.category,
      subject: notification.subject,
      useful_for: notification.useful_for,
      links: notification.links,
      title: notification.title,
      description: notification.description,
    });
    setIsEditModalOpen(true);
  };

  // Update an existing notification
  const updateNotification = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      consultant_id: userData.id,
      id: currentNotification.id
    };
    
    try {
      const response = await fetch(`${API_URL}/notifications/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchNotifications(); // Re-fetch to get the full updated list
        setIsEditModalOpen(false);
        setCurrentNotification(null);
        setFormData({
          date: "",
          email: "",
          category: "",
          subject: "",
          useful_for: "",
          links: "",
          title: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-800">
            Notifications
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-700">
            Below are notifications with useful information for various categories.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Notification
        </button>
      </div>

      {/* Notifications Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Subject
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Useful For
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Description
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                status
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Links
              </th>
              
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {formatDate(notification.date)}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {notification.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {notification.subject}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {notification.useful_for}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 max-w-[400px]">
                     <div className="overflow-x-auto whitespace-nowrap">
                       {notification.description}
                     </div>
                   </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    {notification.status}
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <a
                      href={notification.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Link
                    </a>
                  </td>
                  <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                    <button
                      onClick={() => openEditModal(notification)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-notifications">
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Notification Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Notification
            </h3>
            <form onSubmit={createNotification}>
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Email"
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
                    Useful For
                  </label>
                  <input
                    type="text"
                    name="useful_for"
                    value={formData.useful_for}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Useful For"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Link
                  </label>
                  <input
                    type="url"
                    name="links"
                    value={formData.links}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Notification Link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Description"
                    rows="3"
                    required
                  />
                </div>
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

      {/* Edit Notification Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-gray-800 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Notification
            </h3>
            <form onSubmit={updateNotification}>
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Email"
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
                    Useful For
                  </label>
                  <input
                    type="text"
                    name="useful_for"
                    value={formData.useful_for}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Useful For"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Link
                  </label>
                  <input
                    type="url"
                    name="links"
                    value={formData.links}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Notification Link"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Description"
                    rows="3"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
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

export default ConsultantNotifications;