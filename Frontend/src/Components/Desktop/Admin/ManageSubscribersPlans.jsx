import { Download, Plus } from "lucide-react";
import React, { useState } from "react";
import Table from "../../Common/Tabel";
import ActoinManageListing from "./ActoinManageListing";
import ActionManageSubscriber from "./ActionManageSubscriber";
const ManageSubscribersPlans = () => {
  const ManageSubscribersPlansHeader = [
    "Subscriber Id",
    "Subscriber Plans",
    "Mobile Number",
    "Name of Subscriber",
    "Mobile Number",
    "Subscription Plan",
    "Renewal Status",
    "Renewal Status",
  ];

  const ManageSubscribersPlansData = [
    {
      ID: 1,
      Name: "John Doe",
      MobileNumber: "1234567890",
      Address: "123 Maple St",
      CityVillage: "Springfield",
      PinCode: "123456",
      District: "Downtown",
      Taluka: "Central Taluka",
    },
    {
      ID: 2,
      Name: "Jane Smith",
      MobileNumber: "9876543210",
      Address: "456 Oak St",
      CityVillage: "Greenfield",
      PinCode: "654321",
      District: "Westside",
      Taluka: "Northern Taluka",
    },
    {
      ID: 3,
      Name: "Carlos Rivera",
      MobileNumber: "5551234567",
      Address: "789 Pine St",
      CityVillage: "Rivertown",
      PinCode: "789123",
      District: "Eastville",
      Taluka: "Southern Taluka",
    },
    {
      ID: 4,
      Name: "Aisha Patel",
      MobileNumber: "4449876543",
      Address: "321 Birch St",
      CityVillage: "Lakewood",
      PinCode: "321654",
      District: "Mountain View",
      Taluka: "Western Taluka",
    },
    {
      ID: 5,
      Name: "Mohammed Ali",
      MobileNumber: "3336549871",
      Address: "654 Cedar St",
      CityVillage: "Hillside",
      PinCode: "456789",
      District: "Riverside",
      Taluka: "Eastern Taluka",
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
        <ActionManageSubscriber onCancle={handleCancel} />
      ) : (
        <div>
          <h2 className="text-[40px] font-medium">Manage Subscribers Plans</h2>
          <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b ">
            <div>
              <p className="text-bold text-[18px] font-bold">
                Subscribers Plans
              </p>
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
              <p className="border px-[16px] py-[8px] rounded-[8px]  font-semibold flex gap-2 items-center text-[14px] cursor-pointer">
                <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />
                Download PDF Report
              </p>
            </div>
          </div>
          <div className="mt-5 ">
            <Table
              headers={ManageSubscribersPlansHeader}
              data={ManageSubscribersPlansData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ManageSubscribersPlans;
