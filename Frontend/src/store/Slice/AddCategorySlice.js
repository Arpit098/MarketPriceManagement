import { createSlice } from "@reduxjs/toolkit";
import { AddCategory } from "../API/Category";

const AddCategoryList = createSlice({
  name: "AddProduct",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AddCategoryList.reducer;
