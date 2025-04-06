import React from "react";

const Collection = () => {
  const collections = [
    {
      date: "2024-11-01",
      category: "Art",
      subject: "Modern Art Collection",
      collection:
        "Over 200 pieces of modern art from emerging artists worldwide.",
    },
    {
      date: "2024-10-15",
      category: "Books",
      subject: "Rare Literature",
      collection:
        "A collection of rare books from the 18th and 19th centuries.",
    },
    {
      date: "2024-09-20",
      category: "Coins",
      subject: "Ancient Coins",
      collection:
        "An assortment of ancient coins from various historical empires.",
    },
    {
      date: "2024-08-05",
      category: "Technology",
      subject: "Vintage Electronics",
      collection:
        "A collection of vintage gadgets and electronic devices from the 1980s.",
    },
    // Add more collections here as needed
  ];

  const collectionFields = [
    "Date",
    "Unique ID",
    "Name of Subscriber",
    "City / Village",
    "Approved by Consultant",
    "Category",
    "Subject",
    "Collection (Video / PDF / JPEG)",
  ];

  return (
    <div>
      <div className="py-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Collections
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below is a list of our curated collections across various
            categories.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800">
          <thead>
            <tr>
              {collectionFields?.map((data, index) => (
                <th key={index} className="text-nowrap px-6 py-3 border-b bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collections.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.date}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.category}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.subject}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.collection}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.collection}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.collection}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.collection}
                </td>
                <td className="px-6 py-4 border-b text-nowrap text-gray-800 dark:text-gray-100">
                  {item.collection}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Collection;
