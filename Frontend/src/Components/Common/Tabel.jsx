// import React from "react";

// const Table = ({ headers, data }) => {
//   const sortedData = [...data].sort((a, b) => {
//     const dateA = new Date(a.price_date);
//     const dateB = new Date(b.price_date);
//     return dateB - dateA; // Sort by latest date first
//   });

//   return (
//     <div className="overflow-x-auto  ">
//       <table className="min-w-[800px] min-h-[800px] h-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             {headers.map((header, index) => (
//               <th key={index} scope="col" className="px-6 py-3 text-nowrap">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData?.map((data, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0
//                   ? "bg-[#f2f2f2] border-b text-black  dark:bg-gray-800 dark:border-gray-700"
//                   : "border-b text-black "
//               }`}
//             >
//               <td className="px-6 py-4 text-nowrap font-medium border-b text-black dark:text-white">
//                 {data?.product_name}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.category_name}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.city_name}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.min_rate}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.max_rate}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.traded_quantity}
//               </td>
//               {/* <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.last_trading_day_rate}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.percentage_variation}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.highest_rate}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.lowest_rate}
//               </td>
//               <td className="px-6 py-4 text-nowrap border-b text-black">
//                 {data?.price_date}
//               </td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg text-sm text-left text-gray-700 dark:text-gray-400">
        {/* Table Header */}
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-nowrap border-b text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200`}
              >
                <td className="px-6 py-4 text-nowrap font-medium text-gray-900 dark:text-white border-b text-center">
                  {item?.product_id || "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.product_name || "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.category_name || "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.variety || "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.city_name || "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.min_rate ? `$${item.min_rate}` : "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.max_rate ? `$${item.max_rate}` : "-"}
                </td>
                <td className="px-6 py-4 text-nowrap border-b text-center">
                  {item?.traded_quantity || "0"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

