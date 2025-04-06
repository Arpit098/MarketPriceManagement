import { createSlice } from "@reduxjs/toolkit";
import { GetAllArtical } from "../../API/Artical"; // Import async thunk

const GetAllArticals = createSlice({
  name: "GetAllArtical",
  initialState: {
    data: [], // Default is an empty array
    status: "idle", // Loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllArtical.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAllArtical.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Ensure data is an array
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(GetAllArtical.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default GetAllArticals.reducer;
