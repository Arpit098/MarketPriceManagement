import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const UpdatePersonal = createAsyncThunk(
  "UpdatePersonal",
  async (updatedProfile, { rejectWithValue }) => {
    try {
        console.log("Api called")
      const response = await axios.post(`${API_URL}/users/updatePersonal`, updatedProfile);
      console.log("Response from API:", response.data);
      return response.data.userData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
