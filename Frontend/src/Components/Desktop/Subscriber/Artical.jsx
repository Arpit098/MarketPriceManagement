import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateArticles,
  fetchArticalByAuthor,
} from "../../../store/API/Artical";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-responsive-modal";

const Artical = () => {
  const dispatch = useDispatch();

  // State variables to store input values
  const [nameOfArticle, setNameOfArticle] = useState("");
  const [beneficialFor, setBeneficialFor] = useState("");
  const [category, setcategory] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Handle input changes
  const handleNameChange = (event) => {
    setNameOfArticle(event.target.value);
  };

  const handleBeneficialChange = (event) => {
    setBeneficialFor(event.target.value);
  };

  const handlecategoryChange = (event) => {
    setcategory(event.target.value);
  };

  // Access logged-in user's email from the Redux store
  const { data } = useSelector((state) => state.LoginAPI);
  const userEmail = data[0]?.user?.email;
  const userName = data[0]?.user?.name;

  // Submit form handler
  const onSubmitClick = (event) => {
    event.preventDefault();

    // Dispatch action to create a new article
    dispatch(
      CreateArticles({
        name_of_article: nameOfArticle,
        beneficial_or_useful_for: beneficialFor,
        category: category,
        email: userEmail,
        consultant_name: userName,
      })
    );
    dispatch(fetchArticalByAuthor({ email: userEmail }));

    toast.success("Article added successfully!");

    setNameOfArticle("");
    setBeneficialFor("");
  };

  useEffect(() => {
    // Fetch articles on component mount
    if (userEmail) {
      setLoading(true); // Start loading before fetch
      dispatch(fetchArticalByAuthor({ email: userEmail }))
        .then(() => setLoading(false)) // Stop loading when fetch is complete
        .catch(() => setLoading(false)); // Handle errors by stopping loading
    }
  }, [dispatch, userEmail]);

  const ArticalAuther = useSelector((state) => state.fetchArticalByAuther.data);

  // Sort articles based on updated_at in descending order
  const sortedArticles = [...ArticalAuther]?.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB - dateA; // Sort in descending order (latest first)
  });

  console.log("shortedArtical",sortedArticles);
  

  const [openAddArticalModal, setOpenAddArticalModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);  // New modal for notification details
  const [selectedNotification, setSelectedNotification] = useState(null); // Store the selected notification
  const onOpenArticalModal = () => setOpenAddArticalModal(true);
  const onCloseArticalModal = () => setOpenAddArticalModal(false);

  const onOpenNotificationModal = (notification) => {
    setSelectedNotification(notification);
    setOpenNotificationModal(true);
  };

  const onCloseNotificationModal = () => {
    setOpenNotificationModal(false);
    setSelectedNotification(null); // Clear the selected notification
  };



  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center border-b border-black-100 mb-2 py-6">
        <h2 className="text-4xl font-semibold text-gray-800">Add Your Article</h2>
        <p
          onClick={onOpenArticalModal}
          className="bg-[#047857] hover:bg-[#065f46] text-white px-6 py-4 rounded-md font-semibold cursor-pointer text-sm transition duration-300"
        >
          Add Article
        </p>
      </div>

      {/* Add Article Modal */}
      <Modal
        classNames={{ modal: "custom-modal" }}
        open={openAddArticalModal}
        onClose={onCloseArticalModal}
        center
      >
        <div className="modal-header flex justify-between items-center border-b p-6 bg-[#047857] rounded-t-lg">
          <h2 className="text-lg font-semibold text-white">Add Article</h2>
          <button
            onClick={onCloseArticalModal}
            className="text-white text-2xl leading-none font-semibold"
          >
            &times;
          </button>
        </div>
        <div className="modal-body p-6 bg-white rounded-b-lg shadow-lg">
          <form onSubmit={onSubmitClick}>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              {/* Name of Article */}
              <div>
                <label
                  htmlFor="Name of Article"
                  className="block mb-2 text-sm font-semibold text-gray-900"
                >
                  Name of Article
                </label>
                <input
                  type="text"
                  name="Name of Article"
                  value={nameOfArticle}
                  onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#047857] focus:border-[#047857] block w-full p-3"
                  placeholder="Name of Article"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="Category"
                  className="block mb-2 text-sm font-semibold text-gray-900"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="Category"
                  value={category}
                  onChange={handlecategoryChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#047857] focus:border-[#047857] block w-full p-3"
                  placeholder="Category"
                  required
                />
              </div>

              {/* Beneficial / Useful For */}
              <div>
                <label
                  htmlFor="Beneficial&Useful For"
                  className="block mb-2 text-sm font-semibold text-gray-900"
                >
                  Beneficial / Useful For
                </label>

                <textarea
                  id="Beneficial / Useful For"
                  value={beneficialFor}
                  onChange={handleBeneficialChange}
                  rows="4"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#047857] focus:border-[#047857]"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
            </div>

            <div className="py-4 flex justify-end">
              <button
                type="submit"
                onClick={onCloseArticalModal}
                className="bg-[#047857] hover:bg-[#065f46] text-white px-8 py-3 rounded-md font-semibold cursor-pointer text-sm transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Notification Details Modal */}
      <Modal
        classNames={{ modal: "custom-modal" }}
        open={openNotificationModal}
        onClose={onCloseNotificationModal}
        center
      >
        <div className="modal-header flex justify-between items-center border-b p-6 bg-[#047857] ">
          <h2 className="text-lg font-semibold text-white">Notification Details</h2>
          
        </div>
        <div className="modal-body p-6 bg-white rounded-b-lg shadow-lg">
          {selectedNotification ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Title:</p>
                    {selectedNotification?.name_of_article}
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Useful For:</p>
                <p className="text-gray-600">{selectedNotification?.beneficial_or_useful_for}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Date:</p>
                <p className="text-gray-600">
                  {selectedNotification?.date
                    ? new Date(selectedNotification?.date).toISOString().split("T")[0]
                    : ""}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Unique ID:</p>
                <p className="text-gray-600">{selectedNotification?.id}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Name of Consultant:</p>
                <p className="text-gray-600">{selectedNotification?.consultant_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Category:</p>
                <p className="text-gray-600">{selectedNotification?.category}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Status:</p>
                <p className="text-gray-600">{selectedNotification?.status}</p>
              </div>
              
              
            </div>
          ) : (
            <p className="text-gray-600">No notification details available.</p>
          )}
        </div>
      </Modal>

      {/* Article Table */}
      <div className="overflow-x-auto mt-6">
        <h3 className="text-2xl font-medium text-gray-800 dark:text-white flex items-center justify-between">
          My Articles
        </h3>
        <table className="min-w-full bg-white border border-gray-300 shadow-lg dark:bg-gray-800 mt-4">
          <thead>
            <tr className="bg-[#047857] dark:bg-[#065f46]">
              <th className="px-6 py-4 text-left text-sm font-medium text-white">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white">Name of Article</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white">Beneficial / Useful For</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles?.map((detail, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onOpenNotificationModal(detail)} // Open notification modal on row click
              >
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {new Date(detail.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {detail.name_of_article}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  <div className="line-clamp-1">{detail.beneficial_or_useful_for}</div>
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  <div className="line-clamp-1">{detail.category}</div>
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  {detail.status}
                </td>
                <td className="px-6 py-4 border-b text-gray-800 dark:text-gray-100">
                  <button
                    onClick={() => onOpenNotificationModal(detail)} // Trigger notification modal
                    className="text-[#047857] hover:underline text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Artical;
