import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const fetchNotifications = createAsyncThunk(
  "fetchNotifications",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/notifications`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk for user registration
export const CreateConsultentNotification = createAsyncThunk(
  "CreateConsultentNotification",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/notifications`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Notificatoin by useremail
export const GetConsultentNotificationbyEmail = createAsyncThunk(
  "GetConsultentNotificationbyEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/notifications/by-email`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// Get Notificatoin by Status 
export const GetConsultentNotificationbyStatus = createAsyncThunk(
  "GetConsultentNotificationbyStatus",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/notifications/by-status`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);