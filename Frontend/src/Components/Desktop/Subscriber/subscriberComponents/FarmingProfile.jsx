import React, { useState, useEffect, useRef } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateFarmer } from "../../../../store/API/Farmer";
import { readFamilyMembers, updateFamilyMember, createFamilyMember } from "../../../../store/API/FamilyMember";

const API_URL = import.meta.env.VITE_API_URL;

const FarmingProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.LoginAPI?.data?.[0].user || {});
  const farmData = useSelector((state) => state.Farmer?.farmer?.[0] || {});
  console.log("Farm data from Redux:", farmData);

  const [openModal, setOpenModal] = useState(false);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [sowingOptions, setSowingOptions] = useState([]);
  const [cropOptions, setCropOptions] = useState([]);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isSowingDropdownOpen, setIsSowingDropdownOpen] = useState(false);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [isCropsDropdownOpen, setIsCropsDropdownOpen] = useState(false);
  const sourceDropdownRef = useRef(null);
  const modeDropdownRef = useRef(null);
  const sowingDropdownRef = useRef(null);
  const cropDropdownRef = useRef(null);
  const cropsDropdownRef = useRef(null);
  const [customSource, setCustomSource] = useState("");
  const [customMode, setCustomMode] = useState("");
  const [customSowing, setCustomSowing] = useState("");
  const [customCropPattern, setCustomCropPattern] = useState("");
  const [customCrops, setCustomCrops] = useState("");
  const [openFamilyModal, setOpenFamilyModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newFamilyMember, setNewFamilyMember] = useState({ relation: "", name: "" });

  const cropSelectOptions = [
    { id: "single", name: "Single Crop" },
    { id: "multiple", name: "Multiple Crop" },
    { id: "other", name: "Other" },
  ];

  const defaultProfile = {
    name: { value: null, placeholder: "Enter Farmer's Name" },
    area: { value: null, placeholder: "Enter Farm Area" },
    source_of_irrigation: { value: [], placeholder: "Select Sources of Irrigation" },
    mode_of_irrigation: { value: [], placeholder: "Select Modes of Irrigation" },
    sowing_pattern: { value: [], placeholder: "Select Sowing Patterns" },
    crop_pattern: { value: [], placeholder: "Select Crop Patterns" },
    crops: { value: null, placeholder: "Select Crop Type" },
    shivar: { value: null, placeholder: "Enter Shivar" },
    taluka: { value: null, placeholder: "Enter Taluka" },
    district: { value: null, placeholder: "Enter District" },
    state: { value: null, placeholder: "Enter State" },
    farm_equipments: { value: null, placeholder: "Enter Farm Equipment" },
  };

  const mapStringToIds = (value, options) => {
    if (!value || typeof value !== "string") return [];
    const values = value.split(",").map(item => item.trim());
    return values.map(val => {
      const option = options.find(opt => opt.name === val);
      return option ? option.id : val; // Use ID if found, otherwise keep as custom value
    });
  };

  const farmerProfile = Object.keys(defaultProfile).reduce((acc, key) => {
    let value = farmData[key] !== undefined ? farmData[key] : defaultProfile[key].value;
    if (["source_of_irrigation", "mode_of_irrigation", "sowing_pattern", "crop_pattern"].includes(key) && value && typeof value === "string") {
      value = mapStringToIds(value, key === "source_of_irrigation" ? sourceOptions : key === "mode_of_irrigation" ? modeOptions : key === "sowing_pattern" ? sowingOptions : cropOptions);
    } else if (["source_of_irrigation", "mode_of_irrigation", "sowing_pattern", "crop_pattern"].includes(key) && !value) {
      value = []; // Ensure consistency as array
    }
    acc[key] = {
      value,
      placeholder: defaultProfile[key].placeholder,
    };
    return acc;
  }, {});

  const [farmerProfiles, setFarmerProfiles] = useState([farmerProfile]);
  const [editedProfile, setEditedProfile] = useState({
    ...farmerProfile,
    source_of_irrigation: { ...farmerProfile.source_of_irrigation, value: farmerProfile.source_of_irrigation.value || [] },
    mode_of_irrigation: { ...farmerProfile.mode_of_irrigation, value: farmerProfile.mode_of_irrigation.value || [] },
    sowing_pattern: { ...farmerProfile.sowing_pattern, value: farmerProfile.sowing_pattern.value || [] },
    crop_pattern: { ...farmerProfile.crop_pattern, value: farmerProfile.crop_pattern.value || [] },
    crops: { ...farmerProfile.crops, value: farmerProfile.crops.value || null },
  });

  const fetchDropdownOptions = async () => {
    try {
      const [sourceRes, modeRes, sowingRes, cropRes] = await Promise.all([
        axios.get(`${API_URL}/farmerProfile/sources/source_of_irrigation`),
        axios.get(`${API_URL}/farmerProfile/sources/mode_of_irrigation`),
        axios.get(`${API_URL}/farmerProfile/sources/sowing_pattern`),
        axios.get(`${API_URL}/farmerProfile/sources/crop_pattern`),
      ]);
      const newSourceOptions = [...sourceRes.data, { id: "other", name: "Other" }];
      const newModeOptions = [...modeRes.data, { id: "other", name: "Other" }];
      const newSowingOptions = [...sowingRes.data, { id: "other", name: "Other" }];
      const newCropOptions = [...cropRes.data, { id: "other", name: "Other" }];
      setSourceOptions(newSourceOptions);
      setModeOptions(newModeOptions);
      setSowingOptions(newSowingOptions);
      setCropOptions(newCropOptions);
      setEditedProfile((prev) => ({
        ...prev,
        source_of_irrigation: { ...prev.source_of_irrigation, value: mapStringToIds(farmData.source_of_irrigation || "", newSourceOptions) },
        mode_of_irrigation: { ...prev.mode_of_irrigation, value: mapStringToIds(farmData.mode_of_irrigation || "", newModeOptions) },
        sowing_pattern: { ...prev.sowing_pattern, value: mapStringToIds(farmData.sowing_pattern || "", newSowingOptions) },
        crop_pattern: { ...prev.crop_pattern, value: mapStringToIds(farmData.crop_pattern || "", newCropOptions) },
      }));
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };

  const fetchFamily = async () => {
    if (userData.id) {
      const members = await readFamilyMembers(userData.id);
      console.log("Family members:", members);
      setFamilyMembers(members);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  useEffect(() => {
    fetchFamily();
  }, [userData]);

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

  const handleCheckboxChange = (field, optionId, customValue = "") => {
    setEditedProfile((prevProfile) => {
      const currentValues = Array.isArray(prevProfile[field].value) ? prevProfile[field].value : [];
      let newValues;
      if (optionId === "other" && customValue) {
        newValues = currentValues.includes(customValue)
          ? currentValues.filter((val) => val !== customValue)
          : [...currentValues.filter((val) => val !== "other"), customValue];
      } else {
        newValues = currentValues.includes(optionId)
          ? currentValues.filter((id) => id !== optionId)
          : [...currentValues, optionId];
      }
      return {
        ...prevProfile,
        [field]: { ...prevProfile[field], value: newValues },
      };
    });
  };

  const handleCropsSelect = (optionId, customValue = "") => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      crops: {
        ...prevProfile.crops,
        value: optionId === "other" && customValue ? customValue : optionId,
      },
    }));
    setIsCropsDropdownOpen(false);
  };

  const handleCustomInputChange = (field, value) => {
    if (field === "source_of_irrigation") setCustomSource(value);
    if (field === "mode_of_irrigation") setCustomMode(value);
    if (field === "sowing_pattern") setCustomSowing(value);
    if (field === "crop_pattern") setCustomCropPattern(value);
    if (field === "crops") setCustomCrops(value);
  };

  const handleCustomSubmit = (field, e) => {
    e.preventDefault();
    if (field === "source_of_irrigation" && customSource) handleCheckboxChange(field, "other", customSource);
    if (field === "mode_of_irrigation" && customMode) handleCheckboxChange(field, "other", customMode);
    if (field === "sowing_pattern" && customSowing) handleCheckboxChange(field, "other", customSowing);
    if (field === "crop_pattern" && customCropPattern) handleCheckboxChange(field, "other", customCropPattern);
    if (field === "crops" && customCrops) handleCropsSelect("other", customCrops);
  };

  const handleUpdateProfile = () => {
    const updatedProfile = {
      id: userData.id,
      ...Object.keys(editedProfile).reduce((acc, key) => {
        const value = editedProfile[key].value;
        if (["source_of_irrigation", "mode_of_irrigation", "sowing_pattern", "crop_pattern"].includes(key) && Array.isArray(value)) {
          acc[key] = value
            .map(id => {
              if (id === "other") {
                return key === "source_of_irrigation" ? customSource
                  : key === "mode_of_irrigation" ? customMode
                  : key === "sowing_pattern" ? customSowing
                  : customCropPattern;
              }
              const option = (key === "source_of_irrigation" ? sourceOptions : key === "mode_of_irrigation" ? modeOptions : key === "sowing_pattern" ? sowingOptions : cropOptions).find(opt => opt.id === id);
              return option ? option.name : id;
            })
            .filter(name => name)
            .join(", ");
        } else if (key === "crops" && value === "other") {
          acc[key] = customCrops;
        } else {
          acc[key] = value;
        }
        return acc;
      }, {}),
    };

    console.log("Updated profile before dispatch:", updatedProfile);
    setFarmerProfiles([{
      ...editedProfile,
      source_of_irrigation: { ...editedProfile.source_of_irrigation, value: updatedProfile.source_of_irrigation ? updatedProfile.source_of_irrigation.split(",").map(item => item.trim()) : [] },
      mode_of_irrigation: { ...editedProfile.mode_of_irrigation, value: updatedProfile.mode_of_irrigation ? updatedProfile.mode_of_irrigation.split(",").map(item => item.trim()) : [] },
      sowing_pattern: { ...editedProfile.sowing_pattern, value: updatedProfile.sowing_pattern ? updatedProfile.sowing_pattern.split(",").map(item => item.trim()) : [] },
      crop_pattern: { ...editedProfile.crop_pattern, value: updatedProfile.crop_pattern ? updatedProfile.crop_pattern.split(",").map(item => item.trim()) : [] },
    }]);
    dispatch(updateFarmer(updatedProfile));
    setOpenModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target)) setIsSourceDropdownOpen(false);
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target)) setIsModeDropdownOpen(false);
      if (sowingDropdownRef.current && !sowingDropdownRef.current.contains(event.target)) setIsSowingDropdownOpen(false);
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target)) setIsCropDropdownOpen(false);
      if (cropsDropdownRef.current && !cropsDropdownRef.current.contains(event.target)) setIsCropsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getOptionNameById = (options, ids) => {
    if (typeof ids === "string") return ids;
    return ids.map(id => {
      if (id === "other") {
        return options === sourceOptions ? customSource
          : options === modeOptions ? customMode
          : options === sowingOptions ? customSowing
          : customCropPattern;
      }
      const option = options.find(opt => opt.id === id);
      return option ? option.name : id;
    }).filter(name => name).join(", ");
  };

  const getCropOptionName = (id) => {
    if (id === "other") return customCrops;
    if (typeof id === "string" && id !== "single" && id !== "multiple") return id;
    const option = cropSelectOptions.find(opt => opt.id === id);
    return option ? option.name : id || "";
  };

  const farmerDetailsFields = [
    "name",
    "area",
    "source_of_irrigation",
    "mode_of_irrigation",
    "sowing_pattern",
    "crop_pattern",
    "crops",
    "farm_equipments",
  ];
  const addressDetailsFields = ["shivar", "taluka", "district", "state"];
  const tableFields = [...farmerDetailsFields, ...addressDetailsFields];

  const handleAddFamilyMember = async () => {
    try {
      const response = await createFamilyMember(userData.id, newFamilyMember.relation, newFamilyMember.name);
      setFamilyMembers([...familyMembers, { ...newFamilyMember, id: response.familyMemberId }]);
      setOpenFamilyModal(false);
      setNewFamilyMember({ relation: "", name: "" });
      fetchFamily();
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Farming Profile Information
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Below is the detailed profile information for your farm.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5"
        >
          Edit Farm Profile
        </button>
      </div>

      {farmerProfiles.map((profile, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-300 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {tableFields.map((key) => (
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
                {tableFields.map((key) => (
                  <td
                    key={key}
                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-700 bg-gray-100 text-nowrap"
                  >
                    {key === "crops" && profile[key].value
                      ? getCropOptionName(profile[key].value)
                      : Array.isArray(profile[key].value)
                      ? (key === "source_of_irrigation"
                          ? getOptionNameById(sourceOptions, profile[key].value)
                          : key === "mode_of_irrigation"
                          ? getOptionNameById(modeOptions, profile[key].value)
                          : key === "sowing_pattern"
                          ? getOptionNameById(sowingOptions, profile[key].value)
                          : getOptionNameById(cropOptions, profile[key].value))
                      : profile[key].value !== null
                      ? profile[key].value
                      : "null"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Add Family Member Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setOpenFamilyModal(true)}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
        >
          Add Family Member
        </button>
      </div>

      {/* Family Member Modal */}
      <Modal
        open={openFamilyModal}
        onClose={() => setOpenFamilyModal(false)}
        center
        classNames={{
          modal: "customModal w-full max-w-md",
        }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Add Family Member</h2>
          <div>
            <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-2">
              Relation
            </label>
            <input
              type="text"
              id="relation"
              name="relation"
              value={newFamilyMember.relation}
              onChange={(e) => setNewFamilyMember({ ...newFamilyMember, relation: e.target.value })}
              placeholder="Enter relation (e.g., Wife, Son)"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newFamilyMember.name}
              onChange={(e) => setNewFamilyMember({ ...newFamilyMember, name: e.target.value })}
              placeholder="Enter name"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setOpenFamilyModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddFamilyMember}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      {/* Family Members Table */}
      {familyMembers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Family Members
          </h3>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Relation
                  </th>
                  {tableFields.map((key) => (
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
                {familyMembers.map((member, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-700 text-nowrap">
                      {member.relation || "null"}
                    </td>
                    {tableFields.map((key) => (
                      <td
                        key={key}
                        className="px-4 py-2 text-sm text-gray-800 dark:text-gray-700 text-nowrap"
                      >
                        {key === "name"
                          ? member.name || "null" // Use family member's name for name
                          : key === "crops" && farmerProfiles[0][key].value
                          ? getCropOptionName(farmerProfiles[0][key].value)
                          : Array.isArray(farmerProfiles[0][key].value)
                          ? (key === "source_of_irrigation"
                              ? getOptionNameById(sourceOptions, farmerProfiles[0][key].value)
                              : key === "mode_of_irrigation"
                              ? getOptionNameById(modeOptions, farmerProfiles[0][key].value)
                              : key === "sowing_pattern"
                              ? getOptionNameById(sowingOptions, farmerProfiles[0][key].value)
                              : getOptionNameById(cropOptions, farmerProfiles[0][key].value))
                          : farmerProfiles[0][key].value !== null
                          ? farmerProfiles[0][key].value
                          : "null"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        center
        classNames={{
          modal: "customModal w-full max-w-4xl",
        }}
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Edit Farm Profile</h2>

          {/* Farmer Details Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Farmer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmerDetailsFields.map((key) => {
                const options = key === "source_of_irrigation" ? sourceOptions
                  : key === "mode_of_irrigation" ? modeOptions
                  : key === "sowing_pattern" ? sowingOptions
                  : cropOptions;
                return (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {formatKey(key)}
                    </label>
                    {["source_of_irrigation", "mode_of_irrigation", "sowing_pattern", "crop_pattern"].includes(key) ? (
                      <div
                        className="relative"
                        ref={
                          key === "source_of_irrigation"
                            ? sourceDropdownRef
                            : key === "mode_of_irrigation"
                            ? modeDropdownRef
                            : key === "sowing_pattern"
                            ? sowingDropdownRef
                            : cropDropdownRef
                        }
                      >
                        <div
                          onClick={() => {
                            if (key === "source_of_irrigation") setIsSourceDropdownOpen(!isSourceDropdownOpen);
                            if (key === "mode_of_irrigation") setIsModeDropdownOpen(!isModeDropdownOpen);
                            if (key === "sowing_pattern") setIsSowingDropdownOpen(!isSowingDropdownOpen);
                            if (key === "crop_pattern") setIsCropDropdownOpen(!isCropDropdownOpen);
                          }}
                          className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 cursor-pointer bg-gray-50 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm flex justify-between items-center"
                        >
                          <span>
                            {editedProfile[key].value.length > 0
                              ? `${editedProfile[key].value.length} Selected`
                              : editedProfile[key].placeholder}
                          </span>
                          <span>
                            {(key === "source_of_irrigation" && isSourceDropdownOpen) ||
                            (key === "mode_of_irrigation" && isModeDropdownOpen) ||
                            (key === "sowing_pattern" && isSowingDropdownOpen) ||
                            (key === "crop_pattern" && isCropDropdownOpen)
                              ? "▲"
                              : "▼"}
                          </span>
                        </div>
                        {(key === "source_of_irrigation" && isSourceDropdownOpen) ||
                        (key === "mode_of_irrigation" && isModeDropdownOpen) ||
                        (key === "sowing_pattern" && isSowingDropdownOpen) ||
                        (key === "crop_pattern" && isCropDropdownOpen) ? (
                          <div className="absolute z-50 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
                            {options.map((option) => (
                              <div key={option.id}>
                                <label className="flex items-center px-2 py-1 hover:bg-gray-100">
                                  <input
                                    type="checkbox"
                                    checked={editedProfile[key].value.includes(option.id) || (option.id === "other" && editedProfile[key].value.some(val => val !== "other" && !options.some(opt => opt.name === val)))}
                                    onChange={() => handleCheckboxChange(key, option.id)}
                                    className="mr-2"
                                  />
                                  {option.name}
                                </label>
                                {option.id === "other" && editedProfile[key].value.some(val => val === "other" || !options.some(opt => opt.name === val)) && (
                                  <form onSubmit={(e) => handleCustomSubmit(key, e)} className="px-2 py-1">
                                    <input
                                      type="text"
                                      value={
                                        key === "source_of_irrigation" ? customSource
                                        : key === "mode_of_irrigation" ? customMode
                                        : key === "sowing_pattern" ? customSowing
                                        : customCropPattern
                                      }
                                      onChange={(e) => handleCustomInputChange(key, e.target.value)}
                                      placeholder="Enter custom value"
                                      className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
                                    />
                                  </form>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : key === "crops" ? (
                      <div className="relative" ref={cropsDropdownRef}>
                        <div
                          onClick={() => setIsCropsDropdownOpen(!isCropsDropdownOpen)}
                          className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 cursor-pointer bg-gray-50 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm flex justify-between items-center"
                        >
                          <span>
                            {editedProfile[key].value
                              ? getCropOptionName(editedProfile[key].value)
                              : editedProfile[key].placeholder}
                          </span>
                          <span>{isCropsDropdownOpen ? "▲" : "▼"}</span>
                        </div>
                        {isCropsDropdownOpen && (
                          <div className="absolute z-50 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
                            {cropSelectOptions.map((option) => (
                              <div key={option.id}>
                                <div
                                  onClick={() => handleCropsSelect(option.id)}
                                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                >
                                  {option.name}
                                </div>
                                {option.id === "other" && editedProfile[key].value === "other" && (
                                  <form onSubmit={(e) => handleCustomSubmit(key, e)} className="px-2 py-1">
                                    <input
                                      type="text"
                                      value={customCrops}
                                      onChange={(e) => handleCustomInputChange(key, e.target.value)}
                                      placeholder="Enter custom crop type"
                                      className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
                                    />
                                  </form>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        id={key}
                        name={key}
                        value={editedProfile[key].value || ""}
                        onChange={handleInputChange}
                        placeholder={editedProfile[key].placeholder}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-sm"
                      />
                    )}
                  </div>
                );
              })}
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

export default FarmingProfile;