import { createSlice } from "@reduxjs/toolkit";
import {  GetConsultentNotificationbyStatus } from "../../API/Notifications";

const GetConsultentNotificationByStatus = createSlice({
  name: "GetConsultentNotificationByStatus",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetConsultentNotificationbyStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetConsultentNotificationbyStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetConsultentNotificationbyStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default GetConsultentNotificationByStatus.reducer;
