import { createSlice } from "@reduxjs/toolkit";
import { fetchArticalByAuthor, fetchArticles } from "../API/Artical";

const FetchArticalbyAuther = createSlice({
  name: "FetchArticalbyAuther",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticalByAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticalByAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchArticalByAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default FetchArticalbyAuther.reducer;
