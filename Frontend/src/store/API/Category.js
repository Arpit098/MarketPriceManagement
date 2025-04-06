import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const fetchCategory = createAsyncThunk(
  "fetchCategory",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories`, userData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const AddCategory = createAsyncThunk(
  "AddCategory",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, userData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
