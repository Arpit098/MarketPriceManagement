import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const fetchArticles = createAsyncThunk(
  "fetchArticles",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/articles/approved`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const CreateArticles = createAsyncThunk(
  "CreateArticles",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/articles`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchArticalByAuthor = createAsyncThunk(
  "fetchArticalByAuthor",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/articles/by-author`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetAllArtical = createAsyncThunk(
  "GetAllArtical",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/articles/approved`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetArticalByStatus = createAsyncThunk(
  "GetArticalByStatus",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/articles/by-status`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const StatusByAdminArticals = createAsyncThunk(
  "GetAllArtical",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/articles/update-status`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
