import { useState } from "react";

const SubBidding = () => {
  const [selectedMarket, setSelectedMarket] = useState("");

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
  };

  const tableData = [
    {
      srNo: 1,
      name: "praveen",
      mobileNumber: "ddsd",
      market: "dsada",
      biddingAmount: "$231.00",
      biddingMonth: "123",
      dateOfBidding: "2024-08-09",
      feedback: "feedback",
    },
    {
      srNo: 2,
      name: "praveen",
      mobileNumber: "ddsd",
      market: "dsada",
      biddingAmount: "$122.00",
      biddingMonth: "April",
      dateOfBidding: "2024-08-16",
      feedback: "feedback",
    },
    {
      srNo: 3,
      name: "atharva",
      mobileNumber: "ddsd",
      market: "New York",
      biddingAmount: "$122.00",
      biddingMonth: "August",
      dateOfBidding: "2024-08-17",
      feedback: "feedback",
    },
    {
      srNo: 4,
      name: "ashish",
      mobileNumber: "ddsd",
      market: "New York",
      biddingAmount: "$11.00",
      biddingMonth: "August",
      dateOfBidding: "2024-08-24",
      feedback: "feedback",
    },
    {
      srNo: 5,
      name: "test",
      mobileNumber: "9326104234",
      market: "Mumbai",
      biddingAmount: "$12,233.00",
      biddingMonth: "August",
      dateOfBidding: "2024-08-23",
      feedback: "feedback",
    },
    {
      srNo: 6,
      name: "Venkates Khodke",
      mobileNumber: "09922083899",
      market: "Mumbai",
      biddingAmount: "$2,000.00",
      biddingMonth: "June",
      dateOfBidding: "2024-08-19",
      feedback: "feedback",
    },
  ];

  return (
    <div className="bidding">
      <div className="py-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Bidding
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Below are the Bidding. Click on a service to view its details.
        </p>
      </div>
      {/* Dropdown for Market */}
      <div className="mb-4">
        <label
          htmlFor="market"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Select Market:
        </label>
        <select
          id="market"
          value={selectedMarket}
          onChange={handleMarketChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-700 transition-all duration-300 ease-in-out"
        >
          <option value="">All Markets</option>
          <option value="dsada">dsada</option>
          <option value="New York">New York</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      {/* Table to display bidding data */}
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-nowrap">Sr. No</th>
            <th className="px-6 py-3 text-nowrap">Name</th>
            <th className="px-6 py-3 text-nowrap">Mobile Number</th>
            <th className="px-6 py-3 text-nowrap">Market</th>
            <th className="px-6 py-3 text-nowrap">Bidding Amount</th>
            <th className="px-6 py-3 text-nowrap">Bidding Month</th>
            <th className="px-6 py-3 text-nowrap">Date of Bidding</th>
            <th className="px-6 py-3 text-nowrap">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {tableData
            .filter((data) => {
              // Filter data based on selected market
              if (!selectedMarket) return true;
              return data.market === selectedMarket;
            })
            .map((data, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-[#f2f2f2] border-b text-black dark:bg-gray-800 dark:border-gray-700"
                    : "border-b text-black "
                }`}
              >
                <td className="px-6 py-4 text-nowrap font-medium border-b text-black dark:text-white">
                  {data.srNo}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.name}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.mobileNumber}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.market}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.biddingAmount}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.biddingMonth}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.dateOfBidding}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-black">
                  {data.feedback}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubBidding;
