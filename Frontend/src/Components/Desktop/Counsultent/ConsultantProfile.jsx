import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessProfile from "./Profiles/ProfessionalProfile";
import PersonalProfile from "./Profiles/PersonalProfile";
import { getProfessional } from "../../../store/API/professional";

const Subscriber = () => {
  const [activeTab, setActiveTab] = useState("Personal Profile");
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});
  useEffect (() => {
      dispatch(getProfessional(userData.id));
    }, [dispatch]);
  const tabs = [
    { name: "Personal Profile" },
    { name: "Business Profile" }
  ];
  
  return (
    <div>
      <div className="py-[20px]">
        <h2 className="text-[40px] font-medium">Consultant Profile</h2>
      </div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400F">
        {tabs.map((tab) => (
          <li key={tab.name} className="me-2">
            <a
              href="#"
              onClick={() => setActiveTab(tab.name)}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === tab.name
                  ? "bg-blue-700 text-white"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }`}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Conditional content rendering based on activeTab */}
      <div className=" bg-white dark:bg-gray-800 mt-4 rounded-lg">
        {/* {activeTab === "Basic Services" && <BasicService />} */}
        {activeTab === "Personal Profile" && <PersonalProfile />}
        {activeTab === "Business Profile" && <BusinessProfile />}
      </div>
    </div>
  );
};

export default Subscriber;
