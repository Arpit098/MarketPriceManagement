import { createSlice } from "@reduxjs/toolkit";
import { fetchFeedback } from "../API/Feedback";

const GetFeedback = createSlice({
  name: "feedback",
  initialState: {
    FeedbackData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.FeedbackData = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default GetFeedback.reducer;
