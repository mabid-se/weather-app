import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MainPage from "../views/MainPage";
import MapView from "../views/MapView";
import logoImgLight from "../assets/images/weather-logo-light.png";
import logoImgDark from "../assets/images/weather-logo-dark.png";
import menuIco from "../assets/icons/menu.png";
import closeIco from "../assets/icons/close.png";
import cloudsIcoDark from "../assets/icons/clouds-lightning-dark.png";
import cloudsIcoLight from "../assets/icons/clouds-lightning-light.png";
import listIcoDark from "../assets/icons/list-dark.png";
import listIcoLight from "../assets/icons/list-light.png";
import mapIcoDark from "../assets/icons/map-dark.png";
import mapIcoLight from "../assets/icons/map-light.png";
import settingIcoDark from "../assets/icons/settings-dark.png";
import settingIcoLight from "../assets/icons/settings-light.png";
import ThemeToggler from "../components/ThemeToggler";

const DashboardLayout = () => {
  const location = useLocation();

  const [open, setOpen] = useState(true);

  const Menus = [
    {
      id: 1,
      title: "Weather",
      link: "/",
      imgLight: cloudsIcoLight,
      imgDark: cloudsIcoDark,
    },
    {
      id: 2,
      title: "Cities",
      link: "",
      imgLight: listIcoLight,
      imgDark: listIcoDark,
    },
    {
      id: 3,
      title: "Map",
      link: "/map-view",
      imgLight: mapIcoLight,
      imgDark: mapIcoDark,
    },
    {
      id: 4,
      title: "Settings",
      link: "",
      imgLight: settingIcoLight,
      imgDark: settingIcoDark,
    },
  ];

  const headerNavItem = [
    { id: 9, label: "about us", link: "" },
    { id: 10, label: "home", link: "/" },
    { id: 11, label: "contact us", link: "" },
  ];

  return (
    <div>
      <>
        <div className="flex bg-[#f8fafc] dark:bg-[#0b131e]">
          <div
            className={`${
              open
                ? "md:w-[16%] lg:w-[13%] xl:w-[9%]"
                : "w-[18%] md:w-[10%] lg:w-[8%] xl:w-[6%]"
            } dark:bg-[#202b3b] shadow-xl h-screen p-5 pt-8 relative transition-ease delay-300 duration-1000`}
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
            <div className="flex flex-column justify-between">
              <ul className="py-16">
                {Menus.map((Menu, index) => (
                  <Link
                    to={Menu.link}
                    className={`${
                      location.pathname === Menu.link
                        ? "text-[#fd7f4c]"
                        : "text-[#0f172a] dark:text-[#ece8f0]"
                    } hover:text-[#fd7f4c] text-md font-semibold capitalize`}
                  >
                    <li
                      key={index}
                      className={`my-12 flex flex-col p-2 cursor-pointer items-center gap-x-4 ${
                        Menu.gap ? "mt-9" : "mt-2"
                      } ${index === 0 && "bg-light-white"} `}
                    >
                      <img
                        src={Menu.imgDark}
                        width={20}
                        className="hidden dark:block"
                      />
                      <img
                        src={Menu.imgLight}
                        width={20}
                        className="dark:hidden"
                      />
                      <span className={`${!open && "hidden"} mt-1`}>
                        {Menu.title}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="h-screen flex-1 p-7"> */}
          <div className="flex-1 h-screen overflow-y-auto">
            <header className="shadow-xl dark:bg-[#202b3b]">
              <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
              >
                <div className="hidden md:flex lg:flex-1">
                  <Link to="/">
                    <img
                      src={logoImgLight}
                      alt="weather-forecaster"
                      className="w-12 md:w-20 dark:hidden"
                    />
                    <img
                      src={logoImgDark}
                      alt="weather-forecaster"
                      className="w-12 md:w-20 hidden dark:block"
                    />
                  </Link>
                </div>

                <div className="px-4 flex md:hidden items-center gap-x-40">
                  <div>
                    <Link to="/">
                      <img
                        src={logoImgLight}
                        alt="weather-forecaster"
                        className="w-12 md:w-20 dark:hidden"
                      />
                      <img
                        src={logoImgDark}
                        alt="weather-forecaster"
                        className="w-12 md:w-20 hidden dark:block"
                      />
                    </Link>
                  </div>
                  <div>
                    <ThemeToggler />
                  </div>
                </div>

                <div className="hidden md:flex lg:flex-1 lg:justify-end">
                  <ThemeToggler />
                </div>
              </nav>
            </header>

            {location.pathname === "/" && <MainPage />}
            {location.pathname === "/map-view" && <MapView />}
          </div>
        </div>
      </>
    </div>
  );
};

export default DashboardLayout;
