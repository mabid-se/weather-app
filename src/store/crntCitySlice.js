import { createSlice } from "@reduxjs/toolkit";

const initialState = { cityLat: 0, cityLon: 0 };

const crntCitySlice = createSlice({
  name: "crntCity",
  initialState,
  reducers: {
    setCityLat: (state, action) => {
      state.cityLat = action.payload;
    },
    setCityLon: (state, action) => {
      state.cityLon = action.payload;
    },
  },
});

export const { setCityLat, setCityLon } = crntCitySlice.actions;

export default crntCitySlice.reducer;
