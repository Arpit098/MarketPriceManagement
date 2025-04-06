import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/API/RegiserApi"; // Fixed spelling of RegisterApi
import { useNavigate } from "react-router-dom";

const Register = () => {
  const Role = [
    { id: 1, label: "subscriber" },
    { id: 2, label: "consultant" },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.RegisterAPI);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(formData));

    // Check if the registration was successful
    if (resultAction.meta.requestStatus === "fulfilled") {
      // Registration succeeded, redirect to login
      navigate("/login");
    }
    // If registration failed, the error message will be shown below
  };

  return (
    <div className="mx-auto flex flex-col px-10 justify-center py-[25px] w-1/2">
      <h2 className="text-black text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <div>
            <label
              htmlFor="Name"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Role"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              {Role.map((role) => (
                <option key={role.id} value={role.label}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="border px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          Register Now
        </button>
      </form>

      {status === "failed" && (
        <p className="text-red-500">
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">
              Error:{" "}
              {typeof error === "object"
                ? error.Message || JSON.stringify(error)
                : error}
            </span>
          </div>
        </p>
      )}
    </div>
  );
};

export default Register;
