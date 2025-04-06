import { Download, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Notifications from "./BasicServicesTabs/Notifications";
import axios from "axios";
import GovernmentSchemesAdmin from "./BasicServicesTabs/GovernmentSchemes";
import SuccessStories from "./ValueAddedServicesTabs.jsx/SuccessStories";
import WeatherUpdate from "./ValueAddedServicesTabs.jsx/WeatherUpdates";

const ValueAddedServieves = () => {
  const [activeTab, setActiveTab] = useState("Live Programs");
  const [open, setOpen] = useState(false); // Modal open/close state
  const [program, setProgram] = useState(null); // Store live program
  const [consultantNames, setConsultantNames] = useState({}); // Store consultant names by ID
  const [selectedActions, setSelectedActions] = useState({}); // Track selected action for each program
  const [filterStatus, setFilterStatus] = useState("All"); // Track current filter
  const [loading, setLoading] = useState(false); // Loading state for async actions
  const [programs, setPrograms] = useState([]); // Store all live programs
  const [filteredPrograms, setFilteredPrograms] = useState([]); // Store filtered live programs

  const API_URL = import.meta.env.VITE_API_URL;

  const openModal = (program) => {
    setProgram(program);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setProgram(null);
  };

  const tabs = [
    { id: "Live Programs", label: "Live Programs" },
    { id: "Success Stories", label: "Success Stories" },
    { id: "Weather Updates", label: "Weather Updates" },
    { id: "Weekly Consultation", label: "Weakly Consultation" },
    { id: "Crop Updates", label: "Crop Updates" },
  ];

  const liveProgramsTh = [
    "Unique ID",
    "Date of Program",
    "Time",
    "Conducted By",
    "Category",
    "Subject",
    "Program Link",
    "Status",
    "Consultant Name",
    "Actions",
  ];

  // Function to fetch all live programs
  const fetchAllLivePrograms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/liveProgram`);
      const data = response.data;
      setPrograms(Array.isArray(data) ? data : []);
      if (filterStatus === "All") {
        setFilteredPrograms(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching all live programs:", error);
      setPrograms([]);
      if (filterStatus === "All") {
        setFilteredPrograms([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch live programs by status
  const fetchLiveProgramsByStatus = async (status) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/liveProgram/status/${status}`);
      const data = response.data;
      setFilteredPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(`Error fetching live programs with status ${status}:`, error);
      setFilteredPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to update live program status
  const updateLiveProgramStatus = async (programId, status) => {
    setLoading(true);
    const payload = { id: programId, status };
    try {
      const response = await axios.put(`${API_URL}/liveProgram/adminUpdate`, payload);
      if (response.status === 200) {
        // Refresh data after update
        await fetchAllLivePrograms();
        if (filterStatus !== "All") {
          await fetchLiveProgramsByStatus(filterStatus);
        }
        setSelectedActions((prev) => ({ ...prev, [programId]: "" })); // Reset dropdown
      }
    } catch (error) {
      console.error("Error updating live program status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all programs on mount
  useEffect(() => {
    fetchAllLivePrograms();
  }, []);

  // Fetch consultant names when programs change
  useEffect(() => {
    const fetchConsultantNames = async () => {
      const programsToUse = filterStatus === "All" ? programs : filteredPrograms;
      if (!Array.isArray(programsToUse) || programsToUse.length === 0) return;

      const uniqueConsultantIds = [
        ...new Set(programsToUse.map((program) => program.consultant_id).filter((id) => id)),
      ];

      const names = {};
      await Promise.all(
        uniqueConsultantIds.map(async (id) => {
          try {
            const response = await axios.get(`${API_URL}/userInformation/getName/${id}`);
            names[id] = response.data?.name || "N/A";
          } catch (error) {
            console.error(`Error fetching name for consultant ID ${id}:`, error);
            names[id] = "N/A";
          }
        })
      );
      setConsultantNames(names);
    };

    fetchConsultantNames();
  }, [programs, filteredPrograms, API_URL, filterStatus]);

  const handleStatusChange = async (programId, status) => {
    if (!status || status === "") return;
    await updateLiveProgramStatus(programId, status);
  };


  const programsToDisplay = filterStatus === "All" ? programs : filteredPrograms;

  return (
    <div>
      <h2 className="text-[40px] font-medium">Value Added Services</h2>

      <div className="mt-5">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-[14px] font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-[#4880FF] text-[#4880FF]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === "Live Programs" && (
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-semibold mb-4">Live Programs</h3>
                
              </div>
              <div className="overflow-x-auto w-full">
                {loading ? (
                  <p className="text-center text-gray-600">Loading...</p>
                ) : (
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        {liveProgramsTh.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(programsToDisplay) && programsToDisplay.length > 0 ? (
                        programsToDisplay.map((program) => (
                          <tr
                            key={program.id}
                            className={`${
                              program.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100`}
                            onClick={() => openModal(program)}
                          >
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.unique_id || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.date_of_program
                                ? new Date(program.date_of_program).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.time || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.conducted_by || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.category || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.subject || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.program_link ? (
                                <a
                                  href={program.program_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  View Link
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {program.status || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {consultantNames[program.consultant_id] || "Loading..."}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              <select
                                className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={selectedActions[program.id] || ""}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleStatusChange(program.id, e.target.value)}
                                disabled={loading}
                              >
                                <option value="">Select Action</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={liveProgramsTh.length}
                            className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                          >
                            No live programs available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <Modal className="py-[8px] px-[13px]" open={open} onClose={closeModal} center>
                <h2 className="text-[#4880FF] font-bold text-[22px] py-[8px] px-[13px]">
                  Live Program Details
                </h2>
                {program && (
                  <div className="py-[8px] px-[13px]">
                    <p className="flex flex-col">
                      <span className="text-green-900 text-[22px]">Unique ID</span>
                      <span className="text-[22px]">{program.unique_id || "N/A"}</span>
                    </p>
                    <p className="flex flex-col pt-[15px]">
                      <span className="text-green-900 text-[22px] pb-[10px]">Subject</span>
                      <span className="text-[16px] text-justify leading-[2]">
                        {program.subject || "N/A"}
                      </span>
                    </p>
                    <p className="flex flex-col pt-[15px]">
                      <span className="text-green-900 text-[22px] pb-[10px]">
                        Date of Program
                      </span>
                      <span className="text-[16px]">
                        {program.date_of_program
                          ? new Date(program.date_of_program).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </p>
                    <p className="flex flex-col pt-[15px]">
                      <span className="text-green-900 text-[22px] pb-[10px]">Time</span>
                      <span className="text-[16px]">{program.time || "N/A"}</span>
                    </p>
                    <p className="flex flex-col pt-[15px]">
                      <span className="text-green-900 text-[22px] pb-[10px]">
                        Program Link
                      </span>
                      <span className="text-[16px]">
                        {program.program_link ? (
                          <a
                            href={program.program_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View Link
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </Modal>
            </div>
          )}
          
          {activeTab === "Success Stories" && (
            <SuccessStories/>
          )}
          {activeTab === "Weather Updates" && (
            <WeatherUpdate/>
          )}
          {activeTab === "Weekly Consultation" && (
            <div>
              <h3 className="text-[24px] font-semibold">Weekly Consultation</h3>
              <p>Add your weekly consultation content here.</p>
            </div>
          )}
          {activeTab === "Crop Updates" && (
            <div>
              <h3 className="text-[24px] font-semibold">Crop Updates</h3>
              <p>Add your crop updates content here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValueAddedServieves;