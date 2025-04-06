import { createSlice } from "@reduxjs/toolkit";
import { Updatebulk } from "../API/ManageListing";

const UpdatemangeListingBulk = createSlice({
  name: "Updatebulk",
  initialState: {
    Data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Updatebulk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Updatebulk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Data = action.payload;
      })
      .addCase(Updatebulk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default UpdatemangeListingBulk.reducer;
