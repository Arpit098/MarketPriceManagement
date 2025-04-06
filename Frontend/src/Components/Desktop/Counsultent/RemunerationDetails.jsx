import React from "react";

const RemunerationDetails = () => {
  const remunerationDetails = [
    {
      date: "2024-11-01",
      description: "Consulting Fees for October",
      payment: "Bank Transfer",
      receivedAmount: "1000 USD",
      balance: "0 USD",
    },
    {
      date: "2024-11-05",
      description: "Consulting Fees for November",
      payment: "Cash",
      receivedAmount: "1200 USD",
      balance: "200 USD",
    },
    // Add more remuneration details as needed
  ];

  return (
    <div>
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Remuneration Details
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below are the remuneration details for the consultant.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Description
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Payment
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Received Amount
              </th>
              <th className="px-6 py-3 text-nowrap border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {remunerationDetails.map((detail, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                  {detail.date}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                  {detail.description}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                  {detail.payment}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                  {detail.receivedAmount}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-gray-800 dark:text-gray-100">
                  {detail.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemunerationDetails;
