import React from "react";
import humidity from "../assets/icons/humidity.png";
import pressure from "../assets/icons/pressure.png";
import rainSensor from "../assets/icons/rain-sensor.png";
import sunset from "../assets/icons/sunset.png";
import temperature from "../assets/icons/temperature.png";
import visibility from "../assets/icons/visibility.png";
import wind from "../assets/icons/wind.png";
import sun from "../assets/icons/sun.png";

const CurrentWeatherStats = ({ weatherData }) => {
  const kToC = (temp) => {
    return (temp - 273.15).toFixed(0);
  };

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
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedTime;
  };
  const weatherStats = [
    {
      label: "sunrise",
      icon: sun,
      value: timeExtractor(weatherData.sys.sunrise),
    },
    { label: "wind", icon: wind, value: `${weatherData.wind.speed} km/h` },
    { label: "humidity", icon: humidity, value: weatherData.main.humidity },
    { label: "visibility", icon: visibility, value: weatherData.visibility },
    {
      label: "feels like",
      icon: temperature,
      value: <>{kToC(weatherData.main.feels_like)}&deg;</>,
    },
    {
      label: "temperature max",
      icon: rainSensor,
      value: <>{kToC(weatherData.main.temp_max)}&deg;</>,
    },
    { label: "pressure", icon: pressure, value: weatherData.main.pressure },
    {
      label: "sunset",
      icon: sunset,
      value: timeExtractor(weatherData.sys.sunset),
    },
  ];

  return (
    <>
      <div className="sm:hidden my-6 mx-2 px-4 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
        {weatherStats.map((item, index) => (
          <div
            key={index}
            className={`py-3 px-4 flex flex-col ${
              index !== weatherStats.length - 1
                ? "border-b-2 border-[#94a3b8] dark:border-[#263345]"
                : ""
            }`}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-x-4 justify-start items-center">
                <img src={item.icon} width={32} />
                <h6 className="text-[#334155] dark:text-[#94a3b8] capitalize">
                  {item.label}
                </h6>
              </div>
              <div>
                <h6 className="text-[#0F172A] dark:text-[#ECE8F0] capitalize font-bold">
                  {item.value}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      <>
        <div className="hidden sm:block">
          <div className="grid grid-flow-row grid-cols-2 grid-rows-4 gap-x-4">
            {weatherStats.map((item, index) => (
              <div key={index} className="my-3">
                <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                  <div className="w-4/12 md:w-2/12">
                    <img src={item.icon} alt="sun-rise" width="60%" />
                  </div>
                  <div className="w-8/12 md:w-10/12">
                    <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] uppercase text-md font-medium">
                      {item.label}
                    </h6>
                    <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                      {item.value}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
};

export default CurrentWeatherStats;
