import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import DashboardLayout from "../layouts/DashboardLayout";

const RoutesProvider = () => {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<DashboardLayout />} />
          <Route path="/home" exact element={<Navigate to="/" />} />
          <Route path="/map-view" exact element={<DashboardLayout />} />
        </Routes>
      </ScrollToTop>
    </>
  );
};

export default RoutesProvider;
