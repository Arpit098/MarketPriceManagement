import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "../API/Notifications";

const FetchNotifications = createSlice({
  name: "notifications",
  initialState: {
    NotificationData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.NotificationData = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default FetchNotifications.reducer;
