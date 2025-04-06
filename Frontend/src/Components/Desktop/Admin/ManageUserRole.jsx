import { Download, ChevronDown, Pencil, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUserRole = () => {
  const UserRoleHeaders = ["ID", "Username", "Email", "Role", "Action"];
  const [users, setUsers] = useState([]); // Fetched user data
  const [loading, setLoading] = useState(false); // Loading state
  const [editingUser, setEditingUser] = useState(null); // Track user being edited (by id)
  const [editForm, setEditForm] = useState({ id: "", name: "", Email: "", Role: "" }); // Form state for editing
  const API_URL = import.meta.env.VITE_API_URL; // Base API URL from env

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(
        response.data.map((user) => ({
          id: user.id,
          name: user.name,
          Email: user.email,
          Role: user.role,
          action: "edit", // Placeholder for action column
        }))
      );
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a user
  const startEditing = (user) => {
    setEditingUser(user.id);
    setEditForm({ id: user.id, name: user.name, Email: user.Email, Role: user.Role });
  };

  // Handle input changes during editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (update user)
  const handleSave = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/userInformation/adminUpdate`, {
        id : id,
        name: editForm.name,
        email: editForm.Email,
        role: editForm.Role,
      });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, ...editForm } : user
        )
      );
      setEditingUser(null); // Exit edit mode
      console.log("User updated:", response.data.message);
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        console.log("User deleted:", response.data.message);
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
      }
    }
  };

  // Render action column with edit, delete, and save/cancel buttons
  const renderAction = (user) => {
    if (editingUser === user.id) {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(user.id)}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setEditingUser(null)}
            className="text-red-500 hover:underline text-sm"
          >
            Cancel
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => startEditing(user)}
          className="text-blue-500 hover:text-blue-700"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => handleDelete(user.id)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <Trash size={16} />
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-[40px] font-medium">Manage Users & Roles</h2>
      <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b">
        <div>
          <p className="text-bold text-[18px] font-bold">Users & Roles</p>
          <p className="font-normal text-[14px] text-[#64748B]">
            The Manage Users & Roles page enables admins to efficiently view,
            update roles, and delete user accounts
          </p>
        </div>
        <div className="flex gap-2">
          <p className="border px-[16px] py-[8px] rounded-[8px] font-semibold flex gap-2 items-center text-[14px] cursor-pointer">
            <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />
            Download PDF Report
          </p>
        </div>
      </div>
      <div className="mt-5">
        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  {UserRoleHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-sm font-medium text-gray-900 border-b"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={UserRoleHeaders.length}
                      className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                    >
                      No users available
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id} // Use id for key
                      className={`${
                        users.indexOf(user) % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-600 border-b">
                        {user.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 border-b">
                        {editingUser === user.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 text-sm w-full"
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 border-b">
                        {editingUser === user.id ? (
                          <input
                            type="email"
                            name="Email"
                            value={editForm.Email}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 text-sm w-full"
                          />
                        ) : (
                          user.Email
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 border-b">
                        {editingUser === user.id ? (
                          <div className="relative">
                            <select
                              name="Role"
                              value={editForm.Role}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1 text-sm appearance-none bg-gray-100 focus:ring-2 focus:ring-blue-500 w-full"
                            >
                              <option value="Subscriber">Subscriber</option>
                              <option value="Consultant">Consultant</option>
                              <option value="Admin">Admin</option>
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                            />
                          </div>
                        ) : (
                          user.Role
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 border-b">
                        {renderAction(user)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUserRole;