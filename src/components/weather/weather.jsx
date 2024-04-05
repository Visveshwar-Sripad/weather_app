import React, { useState } from "react";
import { TextField, InputAdornment, Avatar, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import "./weather.css";
import ClearIcon from "@mui/icons-material/Clear";

function Weather(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const AutoComplete = async (event, newValue) => {
    const input = newValue || "";
    console.log("input ", input);
    const response = await fetch(
      `http://localhost:3001/api/cities?city=${input}`
    );
    if (response.ok) {
      response.json().then((cities) => {
        cities = cities.map((data) => ({
          city: data.city,
          uiLabel: data.city + ", " + data.country,
          latitude: data.lat,
          longitude: data.lon,
        }));
        console.log("data ", cities);
        setSuggestions(cities);
        console.log("suggestions ", suggestions);
      });
    }
  };

  const OnCityChange = async (event, updatedValue) => {
    const response = await fetch(
      `http://localhost:3001/api/weather?latitude=${updatedValue.latitude}&longitude=${updatedValue.longitude}`
    );
    response.json().then((data) => {
      const convertedData = {
        city: updatedValue.city,
        temperature: (parseFloat(data.main.temp) - 273.15).toFixed(2),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
      setWeatherData(convertedData);
    });
  };

  const ClearInput = () => {
    setSuggestions([]);
    setWeatherData(null);
    console.log(document.getElementById("input-field"));
    document.getElementById("input-field").value = "";
  };

  const searchBar = () => {
    return (
      <div>
        <h1>Welcome {sessionStorage.getItem("username")}!!!! Type your city</h1>
        <Stack className="searchBarContainer" spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id="input-field"
            disableClearable
            options={suggestions}
            getOptionLabel={(option) => option.uiLabel}
            onInputChange={(e) => AutoComplete(null, e.target.value)}
            onChange={OnCityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search city"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar className="icon">
                        <SearchIcon />
                      </Avatar>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* Clear icon */}
                      <ClearIcon onClick={ClearInput} className="clearIcon" />
                    </InputAdornment>
                  ),
                  type: "search",
                }}
              />
            )}
          />
          {weatherData && (
            <div className="weather-info">
              <h2>Weather in {weatherData.city}</h2>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Weather: {weatherData.description}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
            </div>
          )}
        </Stack>
      </div>
    );
  };

  return <div className="content">{searchBar()}</div>;
}

export default Weather;
