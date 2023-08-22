import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import clearSky from "../assets/images/clear-sky.png";
import heavyRain from "../assets/images/heavy-rain.png";
import thunderstrom from "../assets/images/thunderstorm.png";
import lightRain from "../assets/images/weather-app.png";
import humidity from "../assets/icons/humidity.png";
import pressure from "../assets/icons/pressure.png";
import rainSensor from "../assets/icons/rain-sensor.png";
import sunset from "../assets/icons/sunset.png";
import temperature from "../assets/icons/temperature.png";
import visibility from "../assets/icons/visibility.png";
import wind from "../assets/icons/wind.png";
import sun from "../assets/icons/sun.png";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [autocompleteInstance, setAutocompleteInstance] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [hourlyForcast, setHourlyForcast] = useState(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState(null);

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
    console.log(formattedTime); // Output: "11:00 PM"

    return formattedTime;
  };

  const weekdayExtractor = (time) => {
    const dateString = time;
    const date = new Date(dateString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return dayOfWeek;
  };

  const apiKey = "02103929718135a0d2058112a43c96b9"; // Replace with your actual API key

  const openWeatherCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;

  const handlePlaceChanged = () => {
    if (autocompleteInstance) {
      const place = autocompleteInstance.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const cityComponent = place.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_1")
        );
        if (cityComponent) {
          const selectedCity = cityComponent.long_name;
          setCity(selectedCity);
          setSearch(selectedCity);
        }
      }
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDLofR-CXZR_tHoBjSYUY0lHUuXJswuoO8",
    libraries: ["places"],
  });

  const fetchCurrentData = async () => {
    try {
      if (search) {
        const response = await axios.get(openWeatherCurrentUrl);
        console.log("Weather data:", response.data);
        setWeatherData(response.data);
        if (response.data.coord) {
          setLat(response.data.coord.lat);
          setLon(response.data.coord.lon);
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchHourlyForcast = async () => {
    const options = {
      method: "GET",
      url: `https://forecast9.p.rapidapi.com/rapidapi/forecast/${lat}/${lon}/hourly/`,
      headers: {
        "X-RapidAPI-Key": "7546280c35msh087793315cc6757p1c5028jsnae15f2091254",
        "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
      },
    };
    try {
      if (lat !== null && lon !== null) {
        const response = await axios.request(options);
        console.log("One Call Weather data:", response.data);
        setHourlyForcast(response.data);
        // Handle the one call weather data here as needed
      }
    } catch (error) {
      console.error("Error fetching one call weather data:", error);
    }
  };

  const fetchFiveDayForcast = async () => {
    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`,
      headers: {
        "X-RapidAPI-Key": "7546280c35msh087793315cc6757p1c5028jsnae15f2091254",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("fetchFiveDayForcast", response.data);
      setFiveDaysForecast(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentData();
  }, [search, openWeatherCurrentUrl]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetchHourlyForcast();
      fetchFiveDayForcast();
    }
  }, [lat, lon]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const hourlyIndex = [28, 31, 34, 37, 40, 43];
  const hourlyIndexMO = [28, 31, 34];
  const hourlyIndexMT = [37, 40, 43];

  const dailyIndex = [9, 17, 25, 33, 41, 49, 57];

  return (
    <div className="flex">
      <div className="w-full mt-4 mx-2">
        <div className="flex flex-col justify-between h-[77vh]">
          <div className="p-6">
            <Autocomplete
              onLoad={(autocomplete) => setAutocompleteInstance(autocomplete)}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city"
                className="dark:bg-[#33415580] block w-full rounded-lg px-4 py-3 dark:text-[#94a3b8] shadow-sm dark:ring-[#64748b4d] placeholder:text-gray-400 placeholder:text-lg sm:text-sm sm:leading-6"
              />
            </Autocomplete>
            {weatherData && (
              <div className="my-6 p-6">
                <div className="flex flex-row justify-between align-middle">
                  <div className="flex flex-col">
                    <div>
                      <h2 className="text-[#0f172a] dark:text-[#ece8f0] text-2xl font-bold">
                        {weatherData.name}
                      </h2>
                    </div>
                    <div>
                      <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-md font-medium">
                        Feels like {kToC(weatherData.main.feels_like)}
                      </h6>
                    </div>
                    <div>
                      <h2 className="my-4 text-[#0f172a] dark:text-[#ece8f0] text-8xl font-bold">
                        {kToC(weatherData.main.temp)}&deg;
                      </h2>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <img src={clearSky} width="60%" />
                  </div>
                </div>
              </div>
            )}
            {hourlyForcast && (
              <>
                <div className="hidden md:flex my-3 md:my-6 p-3 md:p-6 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                          Today's Forcast
                        </h6>
                      </div>
                      <div className="mt-2 flex flex-row md:gap-x-6 lg:gap-x-8">
                        {hourlyIndex.map((item, index) => (
                          <div
                            key={item}
                            className={`px-6 flex flex-col justify-center ${
                              index !== hourlyIndex.length - 1
                                ? "border-r-2 border-[#263345]"
                                : ""
                            }`}
                          >
                            <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium">
                              {timeExtractor(hourlyForcast.items[item].date)}
                            </h6>
                            <div className="flex justify-center">
                              {hourlyForcast.items[item].rainhours !== null ? (
                                <>
                                  {hourlyForcast.items[item].isNight ===
                                  true ? (
                                    <>
                                      <img
                                        src={lightRain}
                                        width="60%"
                                        className="my-2"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={lightRain}
                                        width="60%"
                                        className="my-2"
                                      />
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {hourlyForcast.items[item].isNight ===
                                  true ? (
                                    <>
                                      <img
                                        src={lightRain}
                                        width="60%"
                                        className="my-2"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={clearSky}
                                        width="60%"
                                        className="my-2"
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            <div className="flex justify-center">
                              <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold">
                                {hourlyForcast.items[item].temperature.avg}
                              </h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:hidden my-3 md:my-6 p-3 md:p-6 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                          Today's Forcast
                        </h6>
                      </div>
                      <div className="mt-2 flex flex-row gap-x-6 border-b-2 pb-3 border-[#263345]">
                        {hourlyIndexMO.map((item, index) => (
                          <div
                            key={item}
                            className={`grid grid-flow-row auto-rows-max gap-3 px-4 ${
                              index !== hourlyIndex.length / 2 - 1
                                ? "border-r-2 border-[#263345]"
                                : ""
                            }`}
                          >
                            <div>
                              <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium">
                                {timeExtractor(hourlyForcast.items[item].date)}
                              </h6>
                              <div className="flex justify-center">
                                {hourlyForcast.items[item].rainhours !==
                                null ? (
                                  <>
                                    {hourlyForcast.items[item].isNight ===
                                    true ? (
                                      <>
                                        <img
                                          src={lightRain}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={lightRain}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {hourlyForcast.items[item].isNight ===
                                    true ? (
                                      <>
                                        <img
                                          src={lightRain}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={clearSky}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="flex justify-center">
                                <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold">
                                  {hourlyForcast.items[item].temperature.avg}
                                </h6>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 flex flex-row gap-x-6">
                        {hourlyIndexMT.map((item, index) => (
                          <div
                            key={item}
                            className={`grid grid-flow-row auto-rows-max gap-3 px-4 ${
                              index !== hourlyIndex.length / 2 - 1
                                ? "border-r-2 border-[#263345]"
                                : ""
                            }`}
                          >
                            <div>
                              <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium">
                                {timeExtractor(hourlyForcast.items[item].date)}
                              </h6>
                              <div className="flex justify-center">
                                {hourlyForcast.items[item].rainhours !==
                                null ? (
                                  <>
                                    {hourlyForcast.items[item].isNight ===
                                    true ? (
                                      <>
                                        <img
                                          src={lightRain}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={lightRain}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {hourlyForcast.items[item].isNight ===
                                    true ? (
                                      <>
                                        <img
                                          src={lightRain}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={clearSky}
                                          width="60%"
                                          className="my-2"
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="flex justify-center">
                                <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold">
                                  {hourlyForcast.items[item].temperature.avg}
                                </h6>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {weatherData && (
              // <div className="my-6 p-6 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
              <>
                <div className="my-3 flex flex-row">
                  <div className="w-1/2 pr-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={sun} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          sunrise
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {timeExtractor(weatherData.sys.sunrise)}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={wind} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          wind
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl text-2xl font-medium">
                          {weatherData.wind.speed}
                          <span className="hidden md:inline-block">
                            &nbsp;km/h
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-3 flex flex-row">
                  <div className="w-1/2 pr-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={humidity} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          humidity
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {weatherData.main.humidity}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={visibility} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          visibility
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {weatherData.visibility}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-3 flex flex-row">
                  <div className="w-1/2 pr-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={humidity} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          feels like
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {kToC(weatherData.main.feels_like)}&deg;
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={rainSensor} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="hidden md:block mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          temperature max
                        </h6>
                        <h6 className="md:hidden mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          temp. max
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {kToC(weatherData.main.temp_max)}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-3 flex flex-row">
                  <div className="w-1/2 pr-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={pressure} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          pressure
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {weatherData.main.pressure}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="p-3 md:p-6 flex flex-row rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                      <div className="w-4/12 md:w-2/12">
                        <img src={sunset} alt="sun-rise" width="60%" />
                      </div>
                      <div className="w-8/12 md:w-10/12">
                        <h6 className="mt-1 text-[#334155] uppercase dark:text-[#94a3b8] text-md font-medium">
                          sunset
                        </h6>
                        <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl md:text-2xl font-medium">
                          {timeExtractor(weatherData.sys.sunset)}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {fiveDaysForecast && (
              <div className="my-6 p-6 rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <div>
                      <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-lg font-medium">
                        Coming Days Forcast
                      </h6>
                    </div>
                    <div className="mt-2 flex flex-row gap-x-6">
                      {hourlyIndex.map((item, index) => (
                        <div
                          key={item}
                          className={`px-4 flex flex-col justify-center ${
                            index !== hourlyIndex.length - 1
                              ? "border-r-2 border-[#263345]"
                              : ""
                          }`}
                        >
                          <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-sm font-medium">
                            {weekdayExtractor(weatherData.list[item].dt_txt)}
                          </h6>
                          <div className="flex justify-center">
                            {hourlyForcast.items[item].rainhours !== null ? (
                              <>
                                {hourlyForcast.items[item].isNight === true ? (
                                  <>
                                    <img
                                      src={lightRain}
                                      width="60%"
                                      className="my-2"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={lightRain}
                                      width="60%"
                                      className="my-2"
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {hourlyForcast.items[item].isNight === true ? (
                                  <>
                                    <img
                                      src={lightRain}
                                      width="60%"
                                      className="my-2"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={clearSky}
                                      width="60%"
                                      className="my-2"
                                    />
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <div className="flex justify-center">
                            <h6 className="mt-1 text-[#334155] dark:text-[#94a3b8] text-xl font-bold">
                              {hourlyForcast.items[item].temperature.avg}
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-6 justify-center rounded-lg shadow-xl bg-[#F8FAFC] dark:bg-[#202b3b]">
              <div className="pb-3 border-b-2 border-[#263345] flex flex-row justify-between">
                <div>
                  <Link
                    to={{ pathname: "https://openweathermap.org/current" }}
                    className="color-[#334155] dark:text-[#94a3b8] hover:text-[#fd7f4c] hover:dark:text-[#fd7f4c] text-lg font-bold"
                  >
                    Current Weather Data
                  </Link>
                </div>
                <div>
                  <Link
                    to={{
                      pathname:
                        "https://rapidapi.com/wettercom-wettercom-default/api/forecast9",
                    }}
                    className="color-[#334155] dark:text-[#94a3b8] hover:text-[#fd7f4c] hover:dark:text-[#fd7f4c] text-lg font-bold"
                  >
                    Forecast
                  </Link>
                </div>
                <div>
                  <Link
                    to={{
                      pathname:
                        "https://rapidapi.com/worldapi/api/open-weather13/",
                    }}
                    className="color-[#334155] dark:text-[#94a3b8] hover:text-[#fd7f4c] hover:dark:text-[#fd7f4c] text-lg font-bold"
                  >
                    Open Weather
                  </Link>
                </div>
              </div>
              <h6 className="mt-1 text-[#334155] text-center dark:text-[#94a3b8] text-md font-semibold">
                Take Home Test for Code Ivy - Built By MUHAMMAD ABID
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
