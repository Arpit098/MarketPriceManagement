import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { updateBusiness, getBusiness } from "../../../../store/API/business";

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});
  const businessData = useSelector((state) => state.Business?.data?.[0] || {}); // Updated selector
  console.log("User data from Redux:", userData);
  console.log("Business data from Redux:", businessData);

  const [openModal, setOpenModal] = useState(false);

  const defaultProfile = {
    companyName: { value: null, placeholder: "Enter your Company Name" },
    address: { value: null, placeholder: "Enter your Address" },
    city_village: { value: null, placeholder: "Enter your City/Village" },
    pin_code: { value: null, placeholder: "Enter your Pin Code" },
    district: { value: null, placeholder: "Enter your District" },
    taluka: { value: null, placeholder: "Enter your Taluka" },
    state: { value: null, placeholder: "Enter your State" },
    logo: { value: null, placeholder: "Enter your Logo URL" },
    registrationNo: { value: null, placeholder: "Enter your Registration Number" },
    slogan: { value: null, placeholder: "Enter your Slogan" },
    specialisation: { value: null, placeholder: "Enter your Specialisation" },
    services: { value: null, placeholder: "Enter your Services" },
    products: { value: null, placeholder: "Enter your Products" },
  };

  const businessProfile = Object.keys(defaultProfile).reduce((acc, key) => {
    acc[key] = {
      value: businessData[key] !== undefined ? businessData[key] : null,
      placeholder: defaultProfile[key].placeholder,
    };
    return acc;
  }, {});

  const [businessProfiles, setBusinessProfiles] = useState([businessProfile]);
  const [editedProfile, setEditedProfile] = useState({ ...businessProfile });

  // Fetch business profile on mount
  useEffect(() => {
    if (userData.id) {
      dispatch(getBusiness(userData.id));
    }
  }, [dispatch, userData.id]);

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: { ...prevProfile[name], value },
    }));
  };

  const handleUpdateProfile = () => {
    const updatedProfile = {
      ...businessData,
      ...Object.keys(editedProfile).reduce((acc, key) => {
        acc[key] = editedProfile[key].value;
        return acc;
      }, {}),
      userid: userData.id,
    };

    setBusinessProfiles([{ ...editedProfile }]);
    console.log("Updated profile being sent:", updatedProfile);
    dispatch(updateBusiness(updatedProfile));
    setOpenModal(false);
  };

  const businessDetailsFields = [
    "companyName",
    "logo",
    "registrationNo",
    "slogan",
    "specialisation",
    "services",
    "products",
  ];
  const addressDetailsFields = [
    "address",
    "city_village",
    "pin_code",
    "district",
    "taluka",
    "state",
  ];

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Business Profile Information
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below is the detailed profile information for your business.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5"
        >
          Edit Business Profile
        </button>
      </div>

      {businessProfiles.map((profile, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-300 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {Object.keys(profile).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {formatKey(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.entries(profile).map(([key, { value }]) => (
                  <td
                    key={key}
                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-700 bg-gray-100 text-nowrap"
                  >
                    {value !== null ? value : "null"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        center
        classNames={{
          modal: "customModal w-full max-w-4xl",
        }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Edit Business Profile</h2>

          {/* Business Details Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessDetailsFields.map((key) => (
                <div key={key} className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {formatKey(key)}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={editedProfile[key].value || ""}
                    onChange={handleInputChange}
                    placeholder={editedProfile[key].placeholder}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Address Details Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addressDetailsFields.map((key) => (
                <div key={key} className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {formatKey(key)}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={editedProfile[key].value || ""}
                    onChange={handleInputChange}
                    placeholder={editedProfile[key].placeholder}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BusinessProfile;