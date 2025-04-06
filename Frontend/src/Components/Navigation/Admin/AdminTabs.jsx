import React from "react";
import { NavLink } from "react-router-dom";

const AdminTabs = () => {
  const adminTabs = [
    { name: "Dashboard", path: "/admin/Dashbord" },
    { name: "Manage Listing", path: "/admin/ManageListing" },
    { name: "Consultant Management", path: "/admin/Counsultancy-managment" },
    { name: "Staff Management", path: "/admin/Staff-Management" },
    { name: "Subscriber Management", path: "/admin/Subscriber-Management" },
    { name: "Manage Subscribers Plans", path: "/admin/Manage-Subscribers-Plans" },
    { name: "Payment Gateway Integration", path: "/admin/Payment-Intigration-Gatway" },
    { name: "Manage Bidds", path: "/admin/Manage-Bidds" },
    { name: "Basic Services", path: "/admin/Basic-Services" },
    { name: "Value Added Services", path: "/admin/Value-Added-Servieves" },
    { name: "Product & Categories", path: "/admin/Product-Categories" },
    { name: "SMS / WhatsApp Integration", path: "/admin/Sms-Intigration" },
    { name: "Manage Users & Roles", path: "/admin/ManageUserRole" },
    { name: "Social Media Integration", path: "/admin/socialmedia-intigration" },
    { name: "Contact Developer", path: "/admin/contactDeveloper" },
    { name: "Feedback", path: "/admin/Feedback" },
    { name: "Sell Product", path: "/admin/ProductMart" },
    // { name: "Subscriber Profile Management", path: "/admin/SubscriberProfileManagement" },
    // { name: "Reports & Graphs", path: "/admin/ReportsGraphs" },
    // Add any other unique tabs here
  ];

  return (
    <div>
      <ul>
        {adminTabs.map((tabs, index) => (
          <li key={index}>
            <NavLink
              to={tabs.path}
              end
              className={({ isActive }) =>
                `flex items-center px-[8px] py-[8px] text-[14px] text-nowrap my-[3px] mr-[10px] ${isActive
                  ? "bg-[#4880FF] text-[#fff] font-[500]"
                  : "text-[#fff]"
                } hover:bg-[#4880FF] hover:text-[#fff] rounded-[11px]`
              }
            >
              {tabs.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTabs;
