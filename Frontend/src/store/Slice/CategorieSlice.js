import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../API/Category";

const CategoryListing = createSlice({
  name: "ManageListingAllCategorys",
  initialState: {
    category: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default CategoryListing.reducer;
