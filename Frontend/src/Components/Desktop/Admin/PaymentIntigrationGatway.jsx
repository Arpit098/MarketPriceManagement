import { Download, Plus } from "lucide-react";
import React, { useState } from "react";
import Table from "../../Common/Tabel";
import ActoinManageListing from "./ActoinManageListing";
const PaymentIntigrationGatway = () => {
  const PaymentIntigrationGatwayHeader = [
    "Gateway Provider",
    "Merchant ID",
    "API Keys",
    "Webhook URL",
  ];

  const PaymentIntigrationGatwayData = [
    {
      "Gateway Provider": "Stripe",
      "Merchant ID": "MERCHANT123",
      "API Keys": "pk_live_abc123 | sk_live_xyz789",
      "Webhook URL": "https://example.com/webhook-stripe",
    },
    {
      "Gateway Provider": "PayPal",
      "Merchant ID": "MERCHANT456",
      "API Keys": "public_paypal_key | secret_paypal_key",
      "Webhook URL": "https://example.com/webhook-paypal",
    },
    {
      "Gateway Provider": "Square",
      "Merchant ID": "MERCHANT789",
      "API Keys": "sq_live_key1 | sq_live_key2",
      "Webhook URL": "https://example.com/webhook-square",
    },
    {
      "Gateway Provider": "Authorize.Net",
      "Merchant ID": "MERCHANT101112",
      "API Keys": "auth_public_key | auth_secret_key",
      "Webhook URL": "https://example.com/webhook-authorize",
    },
    {
      "Gateway Provider": "Stripe",
      "Merchant ID": "MERCHANT123",
      "API Keys": "pk_live_abc123 | sk_live_xyz789",
      "Webhook URL": "https://example.com/webhook-stripe",
    },
    {
      "Gateway Provider": "PayPal",
      "Merchant ID": "MERCHANT456",
      "API Keys": "public_paypal_key | secret_paypal_key",
      "Webhook URL": "https://example.com/webhook-paypal",
    },
    {
      "Gateway Provider": "Square",
      "Merchant ID": "MERCHANT789",
      "API Keys": "sq_live_key1 | sq_live_key2",
      "Webhook URL": "https://example.com/webhook-square",
    },
    {
      "Gateway Provider": "Authorize.Net",
      "Merchant ID": "MERCHANT101112",
      "API Keys": "auth_public_key | auth_secret_key",
      "Webhook URL": "https://example.com/webhook-authorize",
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
          <h2 className="text-[40px] font-medium">
            Payment Intigration Gatway
          </h2>
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
            <Table
              headers={PaymentIntigrationGatwayHeader}
              data={PaymentIntigrationGatwayData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentIntigrationGatway;
