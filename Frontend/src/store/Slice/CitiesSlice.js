import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCities } from "../API/Cites";

const citiesListing = createSlice({
  name: "AllCities",
  initialState: {
    cities: [], // Initialize as an array
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload; // Replace with the fetched data
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Make sure action.payload contains the error message
      });
  },
});

export default citiesListing.reducer;
