import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../API/RegiserApi";

const RegisterUser = createSlice({
  name: "users/FetchData",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload); // Optional: Add registered user data to state
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default RegisterUser.reducer;
