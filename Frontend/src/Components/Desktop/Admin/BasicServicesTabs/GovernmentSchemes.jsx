import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const GovernmentSchemesAdmin = () => {
  const [schemes, setSchemes] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  // Fetch all government schemes on component mount
  useEffect(() => {
    fetchSchemes();
  }, []);

  // Fetch government schemes from API
  const fetchSchemes = async () => {
    try {
      const response = await fetch(`${API_URL}/govscheme/`);
      const data = await response.json();
      setSchemes(data);
    } catch (error) {
      console.error("Error fetching government schemes:", error);
    }
  };

  // Handle status change (Approve/Reject/Pending)
  const handleStatusChange = async (schemeId, status) => {
    if (!status || status === "Select Action") return;

    const payload = {
      id: schemeId,
      status: status,
    };

    try {
      const response = await fetch(`${API_URL}/govscheme/update-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchSchemes(); // Refresh the list after status update
      }
    } catch (error) {
      console.error("Error updating government scheme status:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">Government Schemes Requests</h3>
        </div>
      </div>

      {/* Government Schemes Table */}
      <div className="overflow-x-auto mt-6 flex-1">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Date</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Unique ID</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Consultant ID</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Email</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Scheme Image</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Scheme Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Sponsored By</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Department</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Category</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Subject</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Useful For</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Description</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Purpose</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Eligibility</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Documents</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Terms</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Apply At</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Download Form</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Website</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-900 border-b">Status</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <tr
                  key={scheme.id}
                  className={`${scheme.id % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    {formatDate(scheme.date)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.unique_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.consultant_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <a
                      href={scheme.scheme_image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.scheme_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.sponsored_by}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.department}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.subject}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.useful_for}</td>
                  <td className="px-6 py-4 border-b text-gray-600 max-w-[400px]">
                    <div className="overflow-x-auto whitespace-nowrap">
                      {scheme.government_scheme_description}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.purpose}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.eligibility_criteria}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.documents_required}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.terms_conditions}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <a
                      href={scheme.apply_at}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Apply
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <a
                      href={scheme.download_form}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <a
                      href={scheme.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Visit
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{scheme.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 border-b">
                    <select
                      className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => handleStatusChange(scheme.id, e.target.value)}
                    >
                      <option disabled selected>
                        Select Action
                      </option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="21"
                  className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                >
                  No government schemes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GovernmentSchemesAdmin;