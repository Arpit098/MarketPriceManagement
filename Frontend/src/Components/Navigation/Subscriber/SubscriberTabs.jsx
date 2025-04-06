import React from "react";
import { NavLink } from "react-router-dom";

const SubscriberTabs = () => {
  const SubscriberTabs = [
    { name: "Dashbord", path: "/subscriber/dashbord" },
    { name: "Price Update", path: "/subscriber/ManageListing" },
    // { name: "Articles", path: "/subscriber/Artical" },
    { name: "Subscriber Profile", path: "/subscriber/Subscriber-profile" },
    { name: "Basic Services", path: "/subscriber/Basic-services" },
    { name: "Vaue Add Services", path: "/subscriber/Value-Added-Services" },
    { name: "Bidding", path: "/subscriber/Bidding" },
    { name: "Contact Developer", path: "/subscriber/ContactDeveloper" },
    { name: "Feedback", path: "/subscriber/Feedback" },
    { name: "Sell Product", path: "/subscriber/SellProduct" },
    { name: "Sales & Income", path: "/subscriber/Sales-income" },
  ];

  return (
    <div className="w-full mt-8 h-full">
      
      <ul>
        {SubscriberTabs?.map((tabs, index) => (
          <li key={index}>
            <NavLink
              to={tabs?.path}
              end
              className={({ isActive }) =>
                `flex items-center px-[8px] py-[8px] text-[14px] text-nowrap my-[3px] mr-[10px] ${
                  isActive
                    ? "bg-blue-700 text-[#fff] font-[500]"
                    : "text-[#000]"
                } hover:bg-blue-700 hover:text-[#fff] rounded-[8px]`
              }
            >
              {tabs?.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriberTabs;
