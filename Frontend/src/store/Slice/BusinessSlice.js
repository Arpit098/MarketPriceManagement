import { createSlice } from "@reduxjs/toolkit";
import { getBusiness, updateBusiness } from "../API/business";

const initialState = {
  data: [], // Align with array structure
  loading: false,
  error: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default businessSlice.reducer;