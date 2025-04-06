import { createSlice } from "@reduxjs/toolkit";
import { fetchListing } from "../API/ManageListing";

const ManageListing = createSlice({
  name: "ManageListingAllCategorys",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ManageListing.reducer;
