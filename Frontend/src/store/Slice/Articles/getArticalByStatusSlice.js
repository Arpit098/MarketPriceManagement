import { createSlice } from "@reduxjs/toolkit";
import { GetArticalByStatus } from "../../API/Artical"; // Import async thunk

const GetAllArticalsByStatus = createSlice({
  name: "GetAllArticalsByStatus",
  initialState: {
    data: [], // Default is an empty array
    status: "idle", // Loading, succeeded, failed
    error: null,
  },
  reducers: {
    // Action to set the filtered data to an empty array
    setDataEmpty: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetArticalByStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetArticalByStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Ensure data is an array
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(GetArticalByStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Export the new action to clear data
export const { setDataEmpty } = GetAllArticalsByStatus.actions;

export default GetAllArticalsByStatus.reducer;
