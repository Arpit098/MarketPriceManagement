import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const fetchCollection = createAsyncThunk(
  "fetchCollection",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/collection`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

//add collection

export const addCollection = createAsyncThunk(
  "addCollection",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/collection`,
        FormData
      );
      return response?.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "something went wrong"
      );
    }
  }
);
