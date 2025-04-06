import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { updateProfessional, getProfessional } from "../../../../store/API/professional";

const ProfessionalProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.LoginAPI?.data?.[0]?.user || {});
  const professionalData = useSelector((state) => state.Professional?.data?.[0] || {});


  console.log("User data from Redux:", userData);
  console.log("Professional data from Redux:", professionalData);

  const [openModal, setOpenModal] = useState(false);

  const defaultProfile = {
    company_name: { value: null, placeholder: "Enter your Company Name" },
    mobile_number: { value: null, placeholder: "Enter your Mobile Number" },
    address: { value: null, placeholder: "Enter your Address" },
    city_village: { value: null, placeholder: "Enter your City/Village" },
    pin_code: { value: null, placeholder: "Enter your Pin Code" },
    taluka: { value: null, placeholder: "Enter your Taluka" },
    district: { value: null, placeholder: "Enter your District" },
    state: { value: null, placeholder: "Enter your State" },
    qualification: { value: null, placeholder: "Enter your Qualification" },
    experience: { value: null, placeholder: "Enter your Experience" },
    field_of_expertise: { value: null, placeholder: "Enter your Field of Expertise" },
    website: { value: null, placeholder: "Enter your Website" },
    email_id: { value: null, placeholder: "Enter your Email ID" },
    social_media_channels: { value: null, placeholder: "Enter your Social Media Channels" },
    social_media_accounts: { value: null, placeholder: "Enter your Social Media Accounts" },
  };

  const ProfessionalProfile = Object.keys(defaultProfile).reduce((acc, key) => {
    acc[key] = {
      value: professionalData[key] !== undefined ? professionalData[key] : null,
      placeholder: defaultProfile[key].placeholder,
    };
    return acc;
  }, {});

  const [ProfessionalProfiles, setProfessionalProfiles] = useState([ProfessionalProfile]);
  const [editedProfile, setEditedProfile] = useState({ ...ProfessionalProfile });

  // Fetch professional profile on mount
  useEffect(() => {
    if (userData.id) {
      dispatch(getProfessional(userData.id));
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
      ...professionalData,
      ...Object.keys(editedProfile).reduce((acc, key) => {
        acc[key] = editedProfile[key].value;
        return acc;
      }, {}),
      userid: userData.id, // Changed to userid for consistency with backend
    };

    setProfessionalProfiles([{ ...editedProfile }]);
    console.log("Updated profile being sent:", updatedProfile);
    dispatch(updateProfessional(updatedProfile));
    setOpenModal(false);
  };

  const professionalDetailsFields = [
    "company_name",
    "mobile_number",
    "qualification",
    "experience",
    "field_of_expertise",
    "website",
    "email_id",
    "social_media_channels",
    "social_media_accounts",
  ];
  const addressDetailsFields = [
    "address",
    "city_village",
    "pin_code",
    "taluka",
    "district",
    "state",
  ];

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Professional Profile Information
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below is the detailed profile information for your professional.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5"
        >
          Edit Professional Profile
        </button>
      </div>

      {ProfessionalProfiles.map((profile, index) => (
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
          <h2 className="text-2xl font-bold">Edit Professional Profile</h2>

          {/* Professional Details Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionalDetailsFields.map((key) => (
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

export default ProfessionalProfile;