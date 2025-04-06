import { createSlice } from "@reduxjs/toolkit";
import { fetchAnnouncements } from "../API/Announcements";

const FetchAnnouncements = createSlice({
  name: "announcements",
  initialState: {
    announcementsData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.announcementsData = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default FetchAnnouncements.reducer;
