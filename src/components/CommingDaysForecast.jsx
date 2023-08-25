import React from "react";
import clearSky from "../assets/images/clear-sky.png";
import heavyRain from "../assets/images/heavy-rain.png";
import thunderstrom from "../assets/images/thunderstorm.png";
import lightRain from "../assets/images/weather-app.png";

const CommingDaysForecast = ({ fiveDaysForecast }) => {
  const dailyIndex = [
    { id: 9, day: "monday", dayMo: "mon", label: "clear sky", temp: 23 },
    { id: 17, day: "tuesday", dayMo: "tue", label: "heavy rain", temp: 34 },
    { id: 25, day: "wednesday", dayMo: "wed", label: "thunderstrom", temp: 32 },
    { id: 33, day: "thursday", dayMo: "thu", label: "lightr rain", temp: 29 },
    { id: 41, day: "friday", dayMo: "fri", label: "clear sky", temp: 33 },
    { id: 49, day: "saturday", dayMo: "sat", label: "heavy rain", temp: 37 },
    { id: 57, day: "sunday", dayMo: "sun", label: "thunderstrom", temp: 30 },
  ];
  const dailyIndexMo = [
    { id: 9, day: "monday", dayMo: "mon", label: "clear sky", temp: 23 },
    { id: 17, day: "tuesday", dayMo: "tue", label: "heavy rain", temp: 34 },
    { id: 25, day: "wednesday", dayMo: "wed", label: "thunderstrom", temp: 32 },
    { id: 33, day: "thursday", dayMo: "thu", label: "lightr rain", temp: 29 },
    { id: 41, day: "friday", dayMo: "fri", label: "clear sky", temp: 33 },
  ];

  return (
    <>
      <div className="md:hidden my-6">
        <div className="mx-3 p-4 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center">
              <div>
                <h6 className="px-2 mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                  Daily Forecast
                </h6>
              </div>
              <div className="my-4 flex flex-row gap-x-2 pb-3">
                {dailyIndexMo.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-flow-row auto-rows-max gap-2 px-2"
                  >
                    <div>
                      <h6 className="mt-1 capitalize text-[#334155] dark:text-[#94a3b8] text-sm font-medium text-center">
                        {item.dayMo}
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
                      <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold text-center">
                        {item.temp}&deg;
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block my-6 p-6 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div>
              <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                Daily Forecast
              </h6>
            </div>
            <div className="mt-2 flex flex-row gap-x-3 lg:gap-x-8">
              {dailyIndex.map((item, index) => (
                <div
                  key={index}
                  className={`px-2 lg:px-4 flex flex-col justify-center ${
                    index !== dailyIndex.length - 1
                      ? "border-r-2 border-[#94a3b8] dark:border-[#263345]"
                      : ""
                  }`}
                >
                  <h6 className="mt-1 capitalize text-[#334155] dark:text-[#94a3b8] text-sm font-medium text-center">
                    {item.day}
                  </h6>
                  <div className="flex justify-center">
                    <img
                      src={
                        item.label === "clear sky"
                          ? lightRain
                          : item.label === "heavy rain"
                          ? heavyRain
                          : item.label === "thunderstrom"
                          ? thunderstrom
                          : clearSky
                      }
                      width="60%"
                      className="my-2"
                    />
                  </div>
                  <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold text-center">
                    {item.temp}&deg;
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

export default CommingDaysForecast; // 98
