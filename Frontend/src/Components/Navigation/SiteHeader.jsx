import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SiteHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-20 drop-shadow-sm">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            className="flex items-center space-x-3 rtl:space-x-reverse"
            href="/"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DailyMarketRates
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <nav className="bg-blue-600  dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-end justify-end">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#FFEB00]  dark:text-blue-500 hover:underline"
                      : "text-white dark:text-white hover:underline"
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/aboutus"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#FFEB00]  dark:text-blue-500 hover:underline"
                      : "text-white dark:text-white hover:underline"
                  }
                >
                  About Us
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/Announcement"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#FFEB00]  dark:text-blue-500 hover:underline"
                      : "text-white dark:text-white hover:underline"
                  }
                >
                  Announcement
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#FFEB00]  dark:text-blue-500 hover:underline"
                      : "text-white dark:text-white hover:underline"
                  }
                >
                  Features
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/Subscription"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#FFEB00]  dark:text-blue-500 hover:underline"
                      : "text-white dark:text-white hover:underline"
                  }
                >
                  Subscription
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactus"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#FFEB00]  dark:text-blue-500 hover:underline"
                      : "text-white dark:text-white hover:underline"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SiteHeader;
