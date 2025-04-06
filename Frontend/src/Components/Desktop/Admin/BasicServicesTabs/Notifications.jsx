import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

const Notifications = () => {
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
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  // Fetch all notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/notifications`);
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


  // const createNotification = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     ...formData,
  //     consultant_id: userData.id,
  //     status: "Pending", // Default status for new notifications
  //   };
  //   try {
  //     const response = await fetch(`${API_URL}/notifications`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     if (response.ok) {
  //       await fetchNotifications();
  //       setFormData({
  //         date: "",
  //         email: "",
  //         category: "",
  //         subject: "",
  //         useful_for: "",
  //         links: "",
  //         title: "",
  //         description: "",
  //       });
  //       setIsAddModalOpen(false);
  //     }
  //   } catch (error) {
  //     console.error("Error creating notification:", error);
  //   }
  // };
  // const openEditModal = (notification) => {
  //   if (notification.status !== "Pending") {
  //     alert("Notification is not in pending status");
  //     return;
  //   }
  //   setCurrentNotification(notification);
  //   setFormData({
  //     date: notification.date,
  //     email: notification.email,
  //     category: notification.category,
  //     subject: notification.subject,
  //     useful_for: notification.useful_for,
  //     links: notification.links,
  //     title: notification.title,
  //     description: notification.description,
  //   });
  //   setIsEditModalOpen(true);
  // };
  // const updateNotification = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     ...formData,
  //     consultant_id: userData.id,
  //     id: currentNotification.id,
  //     status: currentNotification.status, // Preserve existing status
  //   };
  //   try {
  //     const response = await fetch(`${API_URL}/notifications/update`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     if (response.ok) {
  //       await fetchNotifications();
  //       setIsEditModalOpen(false);
  //       setCurrentNotification(null);
  //       setFormData({
  //         date: "",
  //         email: "",
  //         category: "",
  //         subject: "",
  //         useful_for: "",
  //         links: "",
  //         title: "",
  //         description: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating notification:", error);
  //   }
  // };

  // Handle status change (Approve/Reject)
  const handleStatusChange = async (notificationId, status) => {
    if (!status || status === "Select Action") return;

    const payload = {
      id: notificationId,
      status: status,
    };

    try {
      const response = await fetch(`${API_URL}/notifications/updateStatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchNotifications(); // Refresh the list after status update
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Notifications Requests</h3>
        </div>
        
      </div>

      {/* Notifications Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-12 py-2 text-sm font-medium text-gray-900 border-b">
                Date
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                Category
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                Subject
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                Useful For
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                Description
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                Status
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                Links
              </th>
              {/* <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                Actions
              </th> */}
              <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                Admin Action
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`${
                    notification.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    {formatDate(notification.date)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    {notification.category}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    {notification.subject}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    {notification.useful_for}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600 dark:text-gray-600 max-w-[400px]">
                     <div className="overflow-x-auto whitespace-nowrap">
                       {notification.description}
                     </div>
                   </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    {notification.status}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <a
                      href={notification.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Link
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <select
                      className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) =>
                        handleStatusChange(notification.id, e.target.value)
                      }
                    >
                      <option disabled selected>
                        Select Action
                      </option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
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
                  No notifications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;