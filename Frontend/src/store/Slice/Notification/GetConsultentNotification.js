import { createSlice } from "@reduxjs/toolkit";
import { GetConsultentNotificationbyEmail } from "../../API/Notifications";

const GetConsultentNotification = createSlice({
  name: "Create Consultent Notificatoin",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetConsultentNotificationbyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetConsultentNotificationbyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetConsultentNotificationbyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default GetConsultentNotification.reducer;
