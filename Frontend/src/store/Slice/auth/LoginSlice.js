import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "../../API/LoginApi";
import { UpdatePersonal } from "../../API/UpdatePrsnlProfile";

const savedUser = JSON.parse(localStorage.getItem("user")) || [];

const loginSlice = createSlice({
  name: "users/loginUser",
  initialState: {
    data: savedUser,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.data = [];
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [action.payload]; // Store logged-in user data
        localStorage.setItem("user", JSON.stringify(state.data));
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(UpdatePersonal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdatePersonal.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("UpdatePersonal payload:", action.payload.userData); // Debug payload
        console.log("Current state.data before update:", state.data); // Debug current state
        state.data = action.payload
        
        localStorage.setItem("user", JSON.stringify(state.data));
        console.log("Updated state.data:", state.data); // Debug updated state
      })
      .addCase(UpdatePersonal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
