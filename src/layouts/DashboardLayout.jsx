import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MainPage from "../views/MainPage";
import MapView from "../views/MapView";
import menuIco from "../assets/icons/menu.png";
import closeIco from "../assets/icons/close.png";
import Sidebar from "../components/Sidebar";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const DashboardLayout = () => {
  const location = useLocation();

  const [open, setOpen] = useState(true);

  return (
    <div>
      <>
        <div className="flex bg-[#ffffff] dark:bg-[#0b131e]">
          <div
            className={`${
              open
                ? "md:w-[16%] lg:w-[13%] xl:w-[9%]"
                : "w-[18%] md:w-[10%] lg:w-[8%] xl:w-[6%]"
            } hidden sm:flex bg-[#f8fafc] dark:bg-[#202b3b] shadow-xl h-screen p-5 pt-8 relative transition-ease delay-300 duration-1000`}
          >
            <div
              className={`absolute cursor-pointer top-6 w-9 p-2 ring-2 ring-[#fd7f4c] rounded-full ${
                !open
                  ? "rotate-180 right-5"
                  : "right-11 md:right-12 lg:right-14"
              }`}
              onClick={() => setOpen(!open)}
            >
              {open === true ? (
                <img src={closeIco} width={25} />
              ) : (
                <img src={menuIco} width={23} />
              )}
            </div>
            <Sidebar open={open} />
          </div>

          <div className="flex-1 h-screen overflow-y-auto">
            <MainHeader />
            {location.pathname === "/" && <MainPage />}
            {location.pathname === "/map-view" && <MapView />}
            <MainFooter />
          </div>
        </div>
      </>
    </div>
  );
};

export default DashboardLayout;
