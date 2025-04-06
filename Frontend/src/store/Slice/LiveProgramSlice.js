import { createSlice } from "@reduxjs/toolkit";
import { fetchLiveProgram } from "../API/LiveProgram";

const GetLiveProgram = createSlice({
  name: "liveProgram",
  initialState: {
    LiveProgramData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveProgram.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLiveProgram.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.LiveProgramData = action.payload;
      })
      .addCase(fetchLiveProgram.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default GetLiveProgram.reducer;
