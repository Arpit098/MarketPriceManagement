import { Download, Plus } from "lucide-react";
import React, { useState } from "react";
import Table from "../../Common/Tabel";
import ActoinManageListing from "./ActoinManageListing";
const ManageBidds = () => {
  const ManageBidHeader = [
    "GateSr. No.way Provider",
    "Name of Person",
    "Mobile Number",
    "City",
    "Month",
    "Bidding Amount",
    "Action",
  ];

  const ManageBidData = [
    {
      "Sr. No.": 1,
      "Name of Person": "John Doe",
      "Mobile Number": "123-456-7890",
      City: "New York",
      Month: "January",
      "Bidding Amount": "$500",
      Action: "Approve",
    },
    {
      "Sr. No.": 2,
      "Name of Person": "Jane Smith",
      "Mobile Number": "987-654-3210",
      City: "Los Angeles",
      Month: "February",
      "Bidding Amount": "$750",
      Action: "Reject",
    },
    {
      "Sr. No.": 3,
      "Name of Person": "Michael Johnson",
      "Mobile Number": "555-123-4567",
      City: "Chicago",
      Month: "March",
      "Bidding Amount": "$1,000",
      Action: "Pending",
    },
    {
      "Sr. No.": 4,
      "Name of Person": "Emily Davis",
      "Mobile Number": "444-555-6666",
      City: "Houston",
      Month: "April",
      "Bidding Amount": "$300",
      Action: "Approve",
    },
    {
      "Sr. No.": 5,
      "Name of Person": "David Wilson",
      "Mobile Number": "777-888-9999",
      City: "Phoenix",
      Month: "May",
      "Bidding Amount": "$450",
      Action: "Reject",
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
        <ActoinManageListing onCancle={handleCancel} />
      ) : (
        <div>
          <h2 className="text-[40px] font-medium">Manage Bidds</h2>
          <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b ">
            <div>
              <p className="text-bold text-[18px] font-bold">Listing</p>
              <p className="font-normal text-[14px] font-[#64748B]">
                Manage your Listing and Product details
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
            <Table headers={ManageBidHeader} data={ManageBidData} />
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBidds;
