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
      const response = await fetch(`${API_URL}/notifications/approved`);
      const data = await response.json();
      console.log(data);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };


  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Notifications</h3>
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
                Links
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
                    <a
                      href={notification.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Link
                    </a>
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