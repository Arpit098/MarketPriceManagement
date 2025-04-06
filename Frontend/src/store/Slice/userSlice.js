import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../API/Users";
const UserListing = createSlice({
  name: "ManageListingAllCategorys",
  initialState: {
    userData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
  },
});

export default UserListing.reducer;
