import { createSlice } from "@reduxjs/toolkit";
import { getProfessional, updateProfessional } from "../API/professional";

const initialState = {
  data: [], // Align with array structure
  loading: false,
  error: null,
};

const ProfessionalSlice = createSlice({
  name: "Professional",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfessional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfessional.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload]; // Flat Professional object array
        state.error = null;
      })
      .addCase(getProfessional.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfessional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfessional.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload]; // Flat Professional object array
        state.error = null;
        
      })
      .addCase(updateProfessional.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProfessionalSlice.reducer;