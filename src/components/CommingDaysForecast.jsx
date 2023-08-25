import React from "react";
import clearSky from "../assets/images/clear-sky.png";
import heavyRain from "../assets/images/heavy-rain.png";
import thunderstrom from "../assets/images/thunderstorm.png";
import lightRain from "../assets/images/weather-app.png";

const CommingDaysForecast = ({ fiveDaysForecast }) => {
  const dailyIndex = [
    { id: 9, label: "clear sky" },
    { id: 17, label: "heavy rain" },
    { id: 25, label: "thunderstrom" },
    { id: 33, label: "lightr rain" },
    { id: 41, label: "clear sky" },
    { id: 49, label: "heavy rain" },
    { id: 57, label: "thunderstrom" },
  ];
  const dailyIndexMo = [
    { id: 9, label: "clear sky" },
    { id: 17, label: "heavy rain" },
    { id: 25, label: "thunderstrom" },
    { id: 33, label: "lightr rain" },
    { id: 41, label: "clear sky" },
  ];

  const kToC = (temp) => {
    return (temp - 273.15).toFixed(0);
  };

  const weekdayExtractor = (time) => {
    const dateString = time;
    const date = new Date(dateString);
    const moDaysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = {
      moLabel: moDaysOfWeek[date.getDay()],
      desLabel: daysOfWeek[date.getDay()],
    };
    return dayOfWeek;
  };

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
                      <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium text-center">
                        {/* Mon */}
                        {
                          weekdayExtractor(fiveDaysForecast.list[item].dt_txt)
                            .moLabel
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
                      <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold text-center">
                        {/* 34&deg; */}
                        {kToC(fiveDaysForecast.list[item].main.temp)}&deg;
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
            <div className="mt-2 flex flex-row gap-x-3 lg:gap-x-6">
              {dailyIndex.map((item, index) => (
                <div
                  key={index}
                  className={`px-2 lg:px-4 flex flex-col justify-center ${
                    index !== dailyIndex.length - 1
                      ? "border-r-2 border-[#94a3b8] dark:border-[#263345]"
                      : ""
                  }`}
                >
                  <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium">
                    {/* Monday */}
                    {weekdayExtractor(fiveDaysForecast.list[item].dt_txt)}
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
                  <div className="flex justify-center">
                    <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold">
                      {/* 34&deg; */}
                      {kToC(fiveDaysForecast.list[item].main.temp)}&deg;
                    </h6>
                  </div>
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
