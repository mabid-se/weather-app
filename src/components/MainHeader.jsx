import React from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import logoImgLight from "../assets/images/weather-logo-light.png";
import logoImgDark from "../assets/images/weather-logo-dark.png";

const MainHeader = () => {
  return (
    <div>
      <>
        <header className="w-full bg-transparent sm:shadow-xl sm:bg-[#f8fafc] sm:dark:bg-[#202b3b]">
          <nav className="flex max-w-7xl sm: p-6 lg:px-8" aria-label="Global">
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

            <div className="md:hidden w-full flex flex-wrap justify-between items-center">
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

            <div className="flex flex-1 justify-end">
              <ThemeToggler />
            </div>
          </nav>
        </header>
      </>
    </div>
  );
};

export default MainHeader;
