import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getFarmer = createAsyncThunk(
  "farmer/getFarmer",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/farmerProfile`,
        {
          params: { userId },
        }
      );
      console.log("Farmer:", res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const updateFarmer = createAsyncThunk(
  "farmer/updateFarmer",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Farmer data sent:" + JSON.stringify(userData));
      const res = await axios.post(
        `${API_URL}/farmerProfile`,
        userData
      );
      console.log("Farmer data received:" + JSON.stringify(res.data));

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
