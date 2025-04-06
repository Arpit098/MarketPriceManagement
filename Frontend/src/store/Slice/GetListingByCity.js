import { createSlice } from "@reduxjs/toolkit";
import { GetListingByCity } from "../API/ManageListing";

const ListingByCity = createSlice({
  name: "ListingByCity",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetListingByCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetListingByCity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetListingByCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ListingByCity.reducer;
