import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import CityCurrentWeather from "../components/CityCurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import CurrentWeatherStats from "../components/CurrentWeatherStats";
import CommingDaysForecast from "../components/CommingDaysForecast";

const MainPage = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [autocompleteInstance, setAutocompleteInstance] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [hourlyForcast, setHourlyForcast] = useState(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState(null);

  const apiKey = "02103929718135a0d2058112a43c96b9";

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
        // "X-RapidAPI-Key": "7546280c35msh087793315cc6757p1c5028jsnae15f2091254",
        // "X-RapidAPI-Host": "forecast9.p.rapidapi.com",

        "X-RapidAPI-Key": "0d304c9a63mshe391fc257739956p1d79cbjsn72ab22107953",
        "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
      },
    };
    try {
      if (lat !== null && lon !== null) {
        const response = await axios.request(options);
        setHourlyForcast(response.data);
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
        // "X-RapidAPI-Key": "bd3cbb656emsh051a531a00e2ca5p1b25e6jsnf5aac2a93b56",
        // "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",

        "X-RapidAPI-Key": "0d304c9a63mshe391fc257739956p1d79cbjsn72ab22107953",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
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

  return (
    <div className="flex">
      <div className="w-full mt-4 mx-2">
        <div className="flex flex-col justify-between">
          <div className="sm:p-6">
            <div className="px-3 sm:px-0">
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
            </div>
            {weatherData && <CityCurrentWeather weatherData={weatherData} />}
            {hourlyForcast && <HourlyForecast hourlyForcast={hourlyForcast} />}
            {weatherData && <CurrentWeatherStats weatherData={weatherData} />}
            <CommingDaysForecast fiveDaysForecast={fiveDaysForecast} />
            {/* {fiveDaysForecast && (
              <CommingDaysForecast fiveDaysForecast={fiveDaysForecast} />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
