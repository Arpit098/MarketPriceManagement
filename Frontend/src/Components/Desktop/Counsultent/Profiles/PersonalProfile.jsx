import React, { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { UpdatePersonal } from "../../../../store/API/UpdatePrsnlProfile";

const PersonalProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.LoginAPI?.data?.[0].user || {}); // Flat object
  console.log("User data from Redux:", userData);

  const [openModal, setOpenModal] = useState(false);

  const defaultProfile = {
    name: { value: null, placeholder: "Enter your Name" },
    mobile_number: { value: null, placeholder: "Enter your Mobile Number" },
    email: { value: null, placeholder: "Enter your Email Address" },
    address: { value: null, placeholder: "Enter your Address" },
    city_village: { value: null, placeholder: "Enter your City/Village" },
    pin_code: { value: null, placeholder: "Enter your Pin Code" },
    district: { value: null, placeholder: "Enter your District" },
    taluka: { value: null, placeholder: "Enter your Taluka" },
    state: { value: null, placeholder: "Enter your State" },
  };

  const userProfile = Object.keys(defaultProfile).reduce((acc, key) => {
    const value = key === "mobile_number" && userData.mobileNumber !== undefined ? userData.mobileNumber : userData[key];
    acc[key] = {
      value: value !== undefined ? value : null,
      placeholder: defaultProfile[key].placeholder,
    };
    return acc;
  }, {});

  const [personalProfile, setPersonalProfile] = useState([userProfile]);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

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
      ...Object.keys(userData).reduce((acc, key) => {
        if (!(key in acc)) {
          acc[key] = userData[key];
        }
        return acc;
      }, {}),
      ...Object.keys(editedProfile).reduce((acc, key) => {
        acc[key] = editedProfile[key].value;
        return acc;
      }, {}),
    };

    setPersonalProfile([{ ...editedProfile }]);
    console.log("Updated profile being sent:", updatedProfile);
    dispatch(UpdatePersonal(updatedProfile));
    setOpenModal(false);
  };

  const userDetailsFields = ["name", "mobile_number", "email"];
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
            Personal Profile Information
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below is the detailed profile information for your farm.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5"
        >
          Edit Personal Profile
        </button>
      </div>

      {personalProfile.map((profile, index) => (
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
          <h2 className="text-2xl font-bold">Edit Personal Profile</h2>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userDetailsFields.map((key) => (
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

export default PersonalProfile;