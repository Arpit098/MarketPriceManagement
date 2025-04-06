import React from "react";

const ConsultantProfile = () => {
  const consultants = [
    {
      NameofBank: "Bank of America",
      AccountNumber: "123-456-7890",
      IFSCCode: "BOFA0NY002",
      Branch: "New York",
      SavingsCurrent: "Savings",
    },
    {
      NameofBank: "Chase Bank",
      AccountNumber: "987-654-3210",
      IFSCCode: "CHAS0US012",
      Branch: "Los Angeles",
      SavingsCurrent: "Current",
    },
    {
      NameofBank: "Wells Fargo",
      AccountNumber: "555-123-4567",
      IFSCCode: "WFBI0CA04A",
      Branch: "San Francisco",
      SavingsCurrent: "Savings",
    },
    {
      NameofBank: "Citibank",
      AccountNumber: "888-444-2222",
      IFSCCode: "CITI0INBB01",
      Branch: "Chicago",
      SavingsCurrent: "Current",
    },
    // Add more profiles as needed
  ];

  return (
    <div>
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Payment Details
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below is the Consultant Payment Details for your business.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Name of Bank
              </th>
              <th className="px-6 py-3 border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Account Number
              </th>
              <th className="px-6 py-3 border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                IFSC Code
              </th>
              <th className="px-6 py-3 border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Branch
              </th>
              <th className="px-6 py-3 border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Savings / Current
              </th>
            </tr>
          </thead>
          <tbody>
            {consultants.map((consultant, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {consultant.NameofBank}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {consultant.AccountNumber}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {consultant.IFSCCode}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {consultant.Branch}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {consultant.SavingsCurrent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultantProfile;
