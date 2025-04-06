import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const fetchLiveProgram = createAsyncThunk(
  "fetchLiveProgram",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/liveProgram`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
