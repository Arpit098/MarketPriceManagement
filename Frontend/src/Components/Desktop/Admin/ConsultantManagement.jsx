import { Download, Plus } from "lucide-react";
import React, { useState } from "react";
import Table from "../../Common/Tabel";
import ActionConsultantManagement from "./ActionConsultantManagement";
const ConsultantManagement = () => {
  const ConsultantFeild = [
    "Name",
    "Mobile Number",
    "City / Village",
    "Pin Code",
    "District",
    "Taluka",
    "State",
    "Qualification",
    "Expereince",
    "Feild of Experties",
    "Website",
    "Email id",
    "Socail Media Channels",
    "Social Media Accounts",
  ];

  const consultantData = [
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
    {
      Name: "John Doe",
      "Mobile Number": "9876543210",
      "City / Village": "Mumbai",
      "Pin Code": "400001",
      District: "Mumbai",
      Taluka: "Mumbai Suburban",
      State: "Maharashtra",
      Qualification: "MBA in Marketing",
      Experience: "5 years",
      "Field of Expertise": "Digital Marketing",
      Website: "https://johndoe.com",
      "Email id": "john.doe@example.com",
      "Social Media Channels": "LinkedIn, Twitter, Instagram",
      "Social Media Accounts": ["https://instagram.com/johndoe"],
    },
  ];

  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false); // Set to false to show the Table component again
  };

  return (
    <>
      {isAdding ? (
        <ActionConsultantManagement onCancle={handleCancel} />
      ) : (
        <div>
          <h2 className="text-[40px] font-medium">Consultant Management</h2>
          <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b ">
            <div>
              <p className="text-bold text-[18px] font-bold">Consultant List</p>
              <p className="font-normal text-[14px] font-[#64748B]">
                Manage your Consultant Management
              </p>
            </div>
            <div className="flex gap-2">
              <p
                className="bg-[#4880FF] px-[10px] py-[4px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                onClick={handleAddClick}
              >
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                Add
              </p>
              <p className="border px-[16px] py-[8px] rounded-[8px]  font-semibold flex gap-2 items-center text-[14px]">
                <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />
                Download PDF Report
              </p>
            </div>
          </div>
          <div className="mt-5 ">
            <Table headers={ConsultantFeild} data={consultantData} />
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultantManagement;
