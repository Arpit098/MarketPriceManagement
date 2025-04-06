import { createSlice } from "@reduxjs/toolkit";
import { AddCity } from "../API/Cites";

const CreateCity = createSlice({
  name: "CreateCity",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddCity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default CreateCity.reducer;
