import { createSlice } from "@reduxjs/toolkit";
import {
  addCollection,
  fetchCollection,
} from "../API/Collection";

const GetCollection = createSlice({
  name: "collection",
  initialState: {
    CollectionData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCollection.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.CollectionData = action.payload;
        }
      )
      .addCase(
        fetchCollection.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
    builder
      .addCase(addCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.status = "succeded";
        state.CollectionData.push(action.payload);
      })
      .addCase(addCollection.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error = action.payload);
      });
  },
});

export default GetCollection.reducer;
