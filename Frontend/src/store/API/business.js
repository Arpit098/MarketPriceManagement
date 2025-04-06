import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getBusiness = createAsyncThunk(
  "business/getbusiness",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/business/${id}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const updateBusiness = createAsyncThunk(
  "business/updatebusiness",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);
      const res = await axios.post(
        `${API_URL}/business`,
        userData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
