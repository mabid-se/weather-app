import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice";
import crntCitySlice from "./crntCitySlice";
// import CrntCitySlice from "./CrntCitySlice";

export const store = configureStore({
  reducer: { theme: ThemeSlice, crntCityLoc: crntCitySlice },
});
