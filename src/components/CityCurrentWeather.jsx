import React, { useState } from "react";
import clearSky from "../assets/images/clear-sky.png";

const CityCurrentWeather = ({ weatherData }) => {
  const kToC = (temp) => {
    return (temp - 273.15).toFixed(0);
  };

  return (
    <>
      <div className="my-6 p-6">
        <div className="flex flex-row justify-between align-middle">
          <div className="w-7/12 flex flex-col">
            <h2 className="text-[#0f172a] dark:text-[#ece8f0] text-xl sm:text-2xl font-bold">
              {weatherData.name}
            </h2>
            <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm sm:text-md font-medium">
              Feels like {kToC(weatherData.main.feels_like)}&deg;
            </h6>
            <h2 className="my-4 text-[#0f172a] dark:text-[#ece8f0] text-4xl sm:text-8xl font-bold">
              {kToC(weatherData.main.temp)}&deg;
            </h2>
          </div>
          <div className="w-5/12 flex justify-end">
            <img src={clearSky} width="50%" className="block sm:hidden" />
            <img src={clearSky} width="60%" className="hidden sm:block" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CityCurrentWeather;
