import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";

const BasicServices = () => {
  const basicServicesData = [
    {
      service: "Articles",
      details: [
        {
          date: "2024-11-01",
          name: "Article 1",
          beneficialFor: "Small businesses",
        },
        {
          date: "2024-11-02",
          name: "Article 2",
          beneficialFor: "Residents of rural areas",
        },
      ],
    },
    {
      service: "Notifications",
      details: [
        {
          title: "Notification 1",
          description: "You have a new comment on your article.",
        },
        {
          title: "Notification 2",
          description: "Your profile has been updated successfully.",
        },
      ],
    },
    {
      service: "Announcements",
      details: [
        {
          title: "Announcement 1",
          description: "Our new features are now live! Check out what's new.",
        },
        {
          title: "Announcement 2",
          description:
            "Join us for the upcoming webinar on advanced JavaScript topics.",
        },
      ],
    },
    {
      service: "Government Schemes",
      details: [
        {
          srNo: 1,
          schemeImage: "https://via.placeholder.com/50", // Placeholder image
          name: "Scheme 1",
          sponsoredBy: "Government",
          department: "Finance",
          purpose: "Financial support to small businesses.",
          eligibilityCriteria: "Small businesses with less than 10 employees.",
          documentsRequired: "Business registration, tax returns.",
          termsConditions: "Must adhere to the given guidelines.",
          applyAt: "www.example.com",
          downloadForm: "www.example.com/form.pdf",
          website: "www.example.com",
        },
        {
          srNo: 2,
          schemeImage: "https://via.placeholder.com/50", // Placeholder image
          name: "Scheme 2",
          sponsoredBy: "Government",
          department: "Technology",
          purpose: "Promote digital literacy in rural areas.",
          eligibilityCriteria: "Residents of rural areas.",
          documentsRequired: "Identity proof, residence proof.",
          termsConditions: "Program duration is 6 months.",
          applyAt: "www.example.com",
          downloadForm: "www.example.com/form.pdf",
          website: "www.example.com",
        },
      ],
    },
  ];

  const [selectedService, setSelectedService] = useState(basicServicesData[0]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="py-4">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Basic Services Profile
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Below are the basic services available. Click on a service to view its
        details.
      </p>

      {/* Service List */}
      <div className="mt-6 flex space-x-4">
        {basicServicesData?.map((serviceData, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors duration-300 ${
              selectedService?.service === serviceData.service
                ? "bg-blue-700 text-white"
                : "bg-[#f5f5f5] text-black border-gray-200"
            }`}
            onClick={() => handleServiceClick(serviceData)}
          >
            {serviceData.service}
          </button>
        ))}
      </div>

      {/* Show Table for Articles */}
      {selectedService.service === "Articles" && (
        <div className="overflow-x-auto mt-6">
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white flex items-center justify-between">
            Articles
            <span>
              <button
                type="button"
                className="flex items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <CirclePlus size={20} strokeWidth={1.25} />
                Add Article
              </button>
            </span>
          </h3>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800 mt-4">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Name of Article
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Beneficial / Useful For
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedService.details.map((detail, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.date}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.name}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.beneficialFor}
                  </td>
                  <td className="px-6 py-[29px] border-b text-gray-800 dark:text-gray-100 flex space-x-3">
                    <button className="flex items-center text-yellow-500 hover:text-yellow-600">
                      <Pencil size={20} className="mr-2" /> Edit
                    </button>

                    <button className="flex items-center text-red-500 hover:text-red-600">
                      <Trash2 size={20} className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show Table for Notifications */}
      {selectedService.service === "Notifications" && (
        <div className="overflow-x-auto mt-6">
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white flex items-center justify-between">
            Notifications
            <span>
              <button
                type="button"
                className="flex items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <CirclePlus size={20} strokeWidth={1.25} />
                Add Notification
              </button>
            </span>
          </h3>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800 mt-4">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedService.details.map((detail, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.title}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.description}
                  </td>
                  <td className="px-6 py-[29px] border-b text-gray-800 dark:text-gray-100 flex space-x-3">
                    <button className="flex items-center text-yellow-500 hover:text-yellow-600">
                      <Pencil size={20} className="mr-2" /> Edit
                    </button>

                    <button className="flex items-center text-red-500 hover:text-red-600">
                      <Trash2 size={20} className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show Table for Announcements */}
      {selectedService.service === "Announcements" && (
        <div className="overflow-x-auto mt-6">
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white flex items-center justify-between">
            Announcements
            <span>
              <button
                type="button"
                className="flex items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <CirclePlus size={20} strokeWidth={1.25} />
                Add Announcement
              </button>
            </span>
          </h3>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800 mt-4">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedService.details.map((detail, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.title}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                    {detail.description}
                  </td>
                  <td className="px-6 py-[29px] border-b text-gray-800 dark:text-gray-100 flex space-x-3">
                    <button className="flex items-center text-yellow-500 hover:text-yellow-600">
                      <Pencil size={20} className="mr-2" /> Edit
                    </button>

                    <button className="flex items-center text-red-500 hover:text-red-600">
                      <Trash2 size={20} className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show Table for Government Schemes */}
      {selectedService.service === "Government Schemes" && (
        <div className="overflow-x-auto mt-6">
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white flex items-center justify-between">
            Government Schemes
            <span>
              <button
                type="button"
                className="flex items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <CirclePlus size={20} strokeWidth={1.25} />
                Add Scheme
              </button>
            </span>
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800 mt-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    SR. NO.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Scheme Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Scheme Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Sponsored By
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Eligibility Criteria
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Documents Required
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Terms & Conditions
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Apply At
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Download Form
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Website
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedService.details.map((scheme, index) => (
                  <tr
                    key={scheme.srNo}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.srNo}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      <img
                        src={scheme.schemeImage}
                        alt={scheme.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.name}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.sponsoredBy}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.department}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.purpose}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.eligibilityCriteria}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.documentsRequired}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100 whitespace-nowrap">
                      {scheme.termsConditions}
                    </td>
                    <td className="px-6 py-4 border-b text-blue-700 hover:underline dark:text-gray-100 whitespace-nowrap">
                      <a
                        href={scheme.applyAt}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply
                      </a>
                    </td>
                    <td className="px-6 py-4 border-b text-blue-700 hover:underline dark:text-gray-100 whitespace-nowrap">
                      <a
                        href={scheme.downloadForm}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Form
                      </a>
                    </td>
                    <td className="px-6 py-4 border-b text-blue-700 hover:underline dark:text-gray-100 whitespace-nowrap">
                      <a
                        href={scheme.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </td>
                    <td className="px-6 py-[29px] border-b text-gray-800 dark:text-gray-100 flex space-x-3 whitespace-nowrap">
                      <button className="flex items-center text-yellow-500 hover:text-yellow-600">
                        <Pencil size={20} className="mr-2" /> Edit
                      </button>
                      <button className="flex items-center text-red-500 hover:text-red-600">
                        <Trash2 size={20} className="mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicServices;
