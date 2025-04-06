import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const fetchListing = createAsyncThunk(
  "manageListing",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// Add Product Data

export const AddProduct = createAsyncThunk(
  "manageListing",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/products`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const Updatebulk = createAsyncThunk(
  "Updatebulk",
  async ({ type, data }, { rejectWithValue }) => {
    try {
      let response;
      if (type === "subscriber") {
        // Subscriber API: only min_rate, max_rate, traded_quantity
        response = await axios.post(`${API_URL}/products/bulkUpdate`, data);
      } else if (type === "admin") {
        // Admin API: all fields
        response = await axios.post(`${API_URL}/products/adminBulkUpdate`, data);
      } else {
        throw new Error("Invalid update type");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  }
);

export const GetListingByCity = createAsyncThunk(
  "GetListingByCity",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/products/city`, {city});
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
