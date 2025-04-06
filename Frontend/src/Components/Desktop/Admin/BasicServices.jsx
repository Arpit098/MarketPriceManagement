import { Download, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllArtical,
  GetArticalByStatus,
  StatusByAdminArticals,
} from "../../../store/API/Artical";
import { setDataEmpty } from "../../../store/Slice/Articles/getArticalByStatusSlice";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Notifications from "./BasicServicesTabs/Notifications";
import axios from "axios";
import GovernmentSchemesAdmin from "./BasicServicesTabs/GovernmentSchemes";

const BasicServices = () => {
  const [activeTab, setActiveTab] = useState("Articles");
  const [open, setOpen] = useState(false); // Modal open/close state
  const [Article, setArticle] = useState(null); // Store article
  const [consultantNames, setConsultantNames] = useState({}); // Store consultant names by ID
  const [selectedActions, setSelectedActions] = useState({}); // Track selected action for each article
  const [filterStatus, setFilterStatus] = useState("All"); // Track current filter
  const [loading, setLoading] = useState(false); // Loading state for async actions

  const API_URL = import.meta.env.VITE_API_URL;

  const openModal = (article) => {
    setArticle(article);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setArticle(null);
  };

  const tabs = [
    { id: "Articles", label: "Articles" },
    { id: "Notifications", label: "Notifications" },
    { id: "Government Schemes", label: "Government Schemes" },
    { id: "Announcements", label: "Announcements" },
  ];

  const articlesTh = [
    "Title",
    "Beneficial_or_useful_for",
    "Status",
    "Consultant_name",
    "Date",
    "Email",
    "Actions",
  ];

  const dispatch = useDispatch();
  const { data, loading: articlesLoading } = useSelector((state) => state.getAllArtical);
  const { data: Statusdata, loading: statusLoading } = useSelector(
    (state) => state.GetAllArticalsByStatus
  );

  useEffect(() => {
    setLoading(true);
    dispatch(GetAllArtical()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const fetchConsultantNames = async () => {
      const articles = filterStatus === "All" ? data : Statusdata;
      if (!Array.isArray(articles) || articles.length === 0) return;

      const uniqueConsultantIds = [
        ...new Set(articles.map((article) => article.consultant_id).filter((id) => id)),
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
  }, [data, Statusdata, API_URL, filterStatus]);

  const handleStatusChange = async (articleId, status) => {
    if (!status || status === "") return;

    setLoading(true);
    const payload = { id: articleId, status };

    try {
      await dispatch(StatusByAdminArticals(payload)).unwrap(); // Wait for status update
      await dispatch(GetAllArtical()).unwrap(); // Refresh all articles

      // If a filter is active, refresh the filtered list too
      if (filterStatus !== "All") {
        await dispatch(GetArticalByStatus({ status: filterStatus })).unwrap();
      }

      setSelectedActions((prev) => ({ ...prev, [articleId]: "" })); // Reset dropdown
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticalFilter = async (status) => {
    if (!status) return;

    setLoading(true);
    setFilterStatus(status);

    try {
      if (status === "All") {
        dispatch(setDataEmpty()); // Clear filtered data
        await dispatch(GetAllArtical()).unwrap();
      } else {
        await dispatch(GetArticalByStatus({ status })).unwrap();
      }
    } catch (error) {
      console.error("Error filtering articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const articlesToDisplay = filterStatus === "All" ? data : Statusdata;

  return (
    <div>
      <h2 className="text-[40px] font-medium">Basic Services</h2>

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
          {activeTab === "Articles" && (
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-semibold mb-4">Articles</h3>
                <p>
                  <span>Filter Article: </span>
                  <select
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={filterStatus}
                    onChange={(e) => handleArticalFilter(e.target.value)}
                    disabled={loading}
                  >
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </select>
                </p>
              </div>
              <div className="overflow-x-auto w-full">
                {loading ? (
                  <p className="text-center text-gray-600">Loading...</p>
                ) : (
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        {articlesTh.map((header, index) => (
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
                      {Array.isArray(articlesToDisplay) && articlesToDisplay.length > 0 ? (
                        articlesToDisplay.map((article) => (
                          <tr
                            key={article.id}
                            className={`${
                              article.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100`}
                            onClick={() => openModal(article)}
                          >
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {article?.name_of_article}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {article?.beneficial_or_useful_for
                                ? article.beneficial_or_useful_for.length > 50
                                  ? `${article.beneficial_or_useful_for.slice(0, 50)}...`
                                  : article.beneficial_or_useful_for
                                : "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {article?.status}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {consultantNames[article?.consultant_id] || "Loading..."}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {new Date(article?.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              {article?.email || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 border-b">
                              <select
                                className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={selectedActions[article.id] || ""}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleStatusChange(article.id, e.target.value)}
                                disabled={loading}
                              >
                                <option value="">Select Action</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approve</option>
                                <option value="rejected">Reject</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={articlesTh.length}
                            className="px-4 py-2 text-sm text-gray-600 border-b text-center"
                          >
                            No articles available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <Modal className="py-[8px] px-[13px]" open={open} onClose={closeModal} center>
                <h2 className="text-[#4880FF] font-bold text-[22px] py-[8px] px-[13px]">
                  Article Details
                </h2>
                {Article && (
                  <div className="py-[8px] px-[13px]">
                    <p className="flex flex-col">
                      <span className="text-green-900 text-[22px]">Title</span>
                      <span className="text-[22px]">{Article?.name_of_article}</span>
                    </p>
                    <p className="flex flex-col pt-[15px]">
                      <span className="text-green-900 text-[22px] pb-[10px]">
                        Beneficial or Useful For:
                      </span>
                      <span className="text-[16px] text-justify leading-[2]">
                        {Article?.beneficial_or_useful_for || "N/A"}
                      </span>
                    </p>
                  </div>
                )}
              </Modal>
            </div>
          )}
          {activeTab === "Notifications" && <Notifications />}
          {activeTab === "Government Schemes" && (<GovernmentSchemesAdmin />)}
          {activeTab === "Announcements" && (
            <div>
              <h3 className="text-[24px] font-semibold">Announcements</h3>
              <p>Add your announcements content here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicServices;