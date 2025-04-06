import { createSlice } from "@reduxjs/toolkit";
import { fetchSuccessstories } from "../API/Successstories";

const GetSuccessstories = createSlice({
  name: "successstories",
  initialState: {
    SuccessstoriesData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuccessstories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuccessstories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.SuccessstoriesData = action.payload;
      })
      .addCase(fetchSuccessstories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default GetSuccessstories.reducer;
