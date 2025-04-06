import { createSlice } from "@reduxjs/toolkit";
import { getFarmer, updateFarmer } from "../API/Farmer";

const initialState = {
  farmer: null,
  loading: false,
  error: null,
};

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmer = action.payload;
        state.error = null;
      })
      .addCase(getFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmer = action.payload;
        state.error = null;
      })
      .addCase(updateFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default farmerSlice.reducer;
