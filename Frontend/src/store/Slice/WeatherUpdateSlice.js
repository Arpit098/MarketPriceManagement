import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherUpdate } from "../API/WeatherUpdate";

const GetWeatherUpdate = createSlice({
  name: "weatherUpdate",
  initialState: {
    WeatherUpdateData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.WeatherUpdateData = action.payload;
      })
      .addCase(fetchWeatherUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default GetWeatherUpdate.reducer;
