import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../store/API/LoginApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.LoginAPI);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData));
  };

  useEffect(() => {
    // Navigate based on role after successful login
    if (status === "succeeded" && data && data.length > 0) {
      console.log("API Response Data:", data); // Log the entire data object for inspection

      // Access the first element in the data array
      const userData = data[0];
      if (userData && userData.user) {
        const { role } = userData.user; // Correctly destructure role from user object
        if (role === "subscriber") {
          navigate("/subscriber/dashbord"); // Redirect to subscriber page
        } else if (role === "admin") {
          navigate("/admin/Dashbord"); // Redirect to admin page
        } else if (role === "consultant") {
          navigate("/consultant/dashbord"); // Redirect to admin page
        }
      } else {
        console.error("User data or role is missing:", userData);
        // Optionally handle the case where user data is missing
      }
    }
  }, [status, data, navigate]);

  return (
    <div className="mx-auto flex flex-col px-10 justify-center py-20 w-1/2">
      <h2 className="text-black text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
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
              id="Email"
              value={formData.email}
              onChange={handleChange}
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
              id="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="border px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          Login
        </button>

        {status === "loading" && <p>Logging in...</p>}
        {status === "failed" && (
          <p className="text-red-500">Error: {error?.message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
