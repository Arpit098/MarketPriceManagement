import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for GET ALL Cities registration
export const fetchAllCities = createAsyncThunk(
  "fetchAllCities",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cities`, userData);
      console.log()
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create City into the DB

export const AddCity = createAsyncThunk(
  "AddCity",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/cities`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
