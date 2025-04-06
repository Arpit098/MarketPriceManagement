import { createSlice } from "@reduxjs/toolkit";
import { CreateArticles } from "../API/Artical";

const AddArtical = createSlice({
  name: "AddProduct",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(CreateArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AddArtical.reducer;
