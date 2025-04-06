import { createSlice } from "@reduxjs/toolkit";
import { CreateConsultentNotification } from "../../API/Notifications";

const ConsultentNotification = createSlice({
  name: "Create Consultent Notificatoin",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateConsultentNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateConsultentNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(CreateConsultentNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ConsultentNotification.reducer;
