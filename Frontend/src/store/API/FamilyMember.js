import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createFamilyMember = async (userid, relation, name) => {
  console.log("API called:", userid, relation, name);
  const response = await axios.post(`${API_URL}/farmerProfile/family-members`, { userid, relation, name });
  return response.data; // Expecting { familyMemberId: <id> }
};

export const readFamilyMembers = async (userid) => {
  console.log("API called:", userid);
  const response = await axios.get(`${API_URL}/farmerProfile/family-members`, {
    params: { userid }, // Pass `userid` as a query parameter
  });
  console.log("Family members:", response.data.familyMembers);
  return response.data.familyMembers; // Expecting array of family members
};

export const updateFamilyMember = async (familyMemberId, relation, name) => {
  const response = await axios.put(`${API_URL}/farmerProfile/family-members/${familyMemberId}`, { relation, name });
  return response.data;
};

export const deleteFamilyMember = async (familyMemberId) => {
  const response = await axios.delete(`${API_URL}/farmerProfile/family-members/${familyMemberId}`);
  return response.data;
};