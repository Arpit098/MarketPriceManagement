import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const ConsultantTabs = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const consultantTabs = [
    { name: "Dashboard", path: "/consultant/dashbord" },
    { name: "Consultant Profile", path: "/consultant/consultantprofile" },
    { name: "Reports & Graphs", path: "/consultant/ReportsPage" },
    { name: "Payment Details", path: "/consultant/paymentdetails" },
    { name: "Collection", path: "/consultant/collections" },
    { name: "Subject Updates", path: "/consultant/SubjectUpdates" },
    { name: "Remuneration Details", path: "/consultant/RemunerationDetails" },
  ];

  const valueAddedServices = [
    { name: "Live Programs", path: "/consultant/LivePrograms" },
    { name: "Weekly Consultation", path: "/consultant/WeeklyConsultation" },
    { name: "Question & Answers", path: "/consultant/QuestionsAnswers" },
    { name: "Success Stories", path: "/consultant/Successstories" },
    { name: "Crop Updates", path: "/consultant/CropUpdates" },
  ];

  const basicServices = [
    { name: "Articles", path: "/consultant/Articles" },
    { name: "Notifications", path: "/consultant/ConsultantNotifications" },
    { name: "Government Schemes", path: "/consultant/ConsultantGovSchme" },
  ];

  return (
    <div className="w-full h-full p-4">
      <ul className="space-y-2 w-full">
        {consultantTabs.map((tab, index) => (
          <li key={index}>
            <NavLink
              to={tab.path}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm text-nowrap my-1 rounded-lg ${
                  isActive
                    ? "bg-blue-700 text-white font-semibold"
                    : "text-gray-300"
                } hover:bg-blue-700 hover:text-white`
              }
            >
              {tab.name}
            </NavLink>
          </li>
        ))}

        {/* Value Added Services Dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("valueAdded")}
            className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-blue-700 hover:text-white whitespace-nowrap"
          >
            <span>Value Added Services</span>
            {openDropdown === "valueAdded" ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openDropdown === "valueAdded" && (
            <ul className="ml-4 mt-1 space-y-1 bg-gray-600 rounded-lg p-2">
              {valueAddedServices.map((service, index) => (
                <li key={index}>
                  <NavLink
                    to={service.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg ${
                        isActive
                          ? "bg-blue-700 text-white font-semibold"
                          : "text-gray-300"
                      } hover:bg-blue-700 hover:text-white`
                    }
                  >
                    {service.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Basic Services Dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("basic")}
            className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-blue-700 hover:text-white whitespace-nowrap"
          >
            <span>Basic Services</span>
            {openDropdown === "basic" ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openDropdown === "basic" && (
            <ul className="ml-4 mt-1 space-y-1 bg-gray-600 rounded-lg p-2">
              {basicServices.map((service, index) => (
                <li key={index}>
                  <NavLink
                    to={service.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg ${
                        isActive
                          ? "bg-blue-700 text-white font-semibold"
                          : "text-gray-300"
                      } hover:bg-blue-700 hover:text-white`
                    }
                  >
                    {service.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ConsultantTabs;