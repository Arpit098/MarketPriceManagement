import { createSlice } from "@reduxjs/toolkit";
import { AddProduct } from "../API/ManageListing";

const AddProduct = createSlice({
  name: "AddProduct",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload); 
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AddProduct.reducer;
