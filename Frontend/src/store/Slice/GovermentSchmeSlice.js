import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "../API/Artical";
import { fetchGovermentSchme } from "../API/GovermentSchme";

const FetchGovermentSchme = createSlice({
  name: "articles",
  initialState: {
    govermentSchmedata: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGovermentSchme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGovermentSchme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.govermentSchmedata = action.payload;
      })
      .addCase(fetchGovermentSchme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default FetchGovermentSchme.reducer;
