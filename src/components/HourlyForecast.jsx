import React from "react";
import clearSky from "../assets/images/clear-sky.png";
import heavyRain from "../assets/images/heavy-rain.png";
import thunderstrom from "../assets/images/thunderstorm.png";
import lightRain from "../assets/images/weather-app.png";
import { Link } from "react-router-dom";

const HourlyForecast = ({ hourlyForcast }) => {
  const hourlyIndex = [
    { id: 28, label: "clear sky" },
    { id: 31, label: "heavy rain" },
    { id: 34, label: "thunderstrom" },
    { id: 37, label: "lightr rain" },
    { id: 40, label: "clear sky" },
    { id: 43, label: "heavy rain" },
    { id: 46, label: "thunderstrom" },
    { id: 49, label: "light rain" },
    { id: 52, label: "clear sky" },
  ];
  const hourlyIndexMo = [
    { id: 28, label: "clear sky" },
    { id: 31, label: "heavy rain" },
    { id: 34, label: "thunderstrom" },
    { id: 37, label: "lightr rain" },
    { id: 40, label: "clear sky" },
  ];

  const timeExtractor = (time) => {
    const timestamp = time;
    const date = new Date(timestamp);
    // Get hours and minutes from the Date object
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    // Convert hours to AM/PM format
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    // Format minutes with leading zero if needed
    const formattedMinutes = String(minutes).padStart(2, "0");
    // Construct the final formatted time string
    const formattedTime = {
      xsFormat: `${formattedHours} ${ampm}`,
      smFormat: `${formattedHours}:${formattedMinutes} ${ampm}`,
    };

    return formattedTime;
  };

  return (
    <>
      <div className="md:hidden my-6 mx-2 py-4 px-2 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center">
            <div>
              <h6 className="px-4 mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                Hourly Forcast
              </h6>
            </div>
            <div className="my-4 flex flex-row gap-x-2 pb-3">
              {hourlyIndexMo.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-flow-row auto-rows-max gap-2 px-2"
                >
                  <div>
                    <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium text-center">
                      {
                        timeExtractor(hourlyForcast.items[item.id].date)
                          .xsFormat
                      }
                    </h6>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={
                        item.label === "light rain"
                          ? lightRain
                          : item.label === "heavy rain"
                          ? heavyRain
                          : item.label === "thunderstrom"
                          ? thunderstrom
                          : clearSky
                      }
                      width="65%"
                      className="my-2"
                    />
                  </div>
                  <div>
                    <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-md font-md text-center">
                      {hourlyForcast.items[item.id].temperature.avg}&deg;
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link className="bg-[#0B131D] py-2 px-4 rounded-full text-[#ffffff] font-md text-md hover:bg-[#ffffff] hover:text-[#0B131D]">
                More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:my-6 md:p-6 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div>
              <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                Hourly Forcast
              </h6>
            </div>
            <div className="mt-2 flex flex-row md:gap-x-3 lg:gap-x-6">
              {hourlyIndex.map((item, index) => (
                <div
                  key={item.id}
                  className={`px-2 lg:px-3 flex flex-col ${
                    index !== hourlyIndex.length - 1
                      ? "border-r-2 border-[#263345]"
                      : ""
                  }`}
                >
                  <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium text-center">
                    {timeExtractor(hourlyForcast.items[item.id].date).smFormat}
                  </h6>
                  <div className="flex justify-center">
                    <img
                      src={
                        item.label === "light rain"
                          ? lightRain
                          : item.label === "heavy rain"
                          ? heavyRain
                          : item.label === "thunderstrom"
                          ? thunderstrom
                          : clearSky
                      }
                      width="55%"
                      className="my-2"
                    />
                  </div>

                  <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold text-center">
                    {hourlyForcast.items[item.id].temperature.avg}
                  </h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HourlyForecast;
