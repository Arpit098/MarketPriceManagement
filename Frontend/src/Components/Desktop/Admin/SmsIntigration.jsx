import { Download, Plus } from "lucide-react";
import React, { useState } from "react";
import Table from "../../Common/Tabel";
import ActionSocialMediaInti from "./ActionSocialMediaInti";

const SmsIntigration = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      {isAdding ? (
        <ActionSocialMediaInti onCancle={handleCancel} />
      ) : (
        <>
          <div>
            <h2 className="text-[40px] font-medium">
              SMS / WhatsApp Intigration
            </h2>
            <div className="w-full h-[223px] flex px-[40px] items-center  bg-[#D9D9D9] mt-[200px]">
              <p className="text-[40px] text-[#000] fonr-[500] ">
                In this we no need to add field just make a Normal Page
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SmsIntigration;
