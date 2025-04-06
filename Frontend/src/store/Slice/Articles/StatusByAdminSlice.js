import { createSlice } from "@reduxjs/toolkit";
import { StatusByAdminArticals } from "../../API/Artical";

const StatusArtical = createSlice({
  name: "StatusArtical",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(StatusByAdminArticals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(StatusByAdminArticals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(StatusByAdminArticals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default StatusArtical.reducer;
