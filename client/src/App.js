import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const apiKey = "509917b15cee4c22b96205129232405";
const location = "Amsterdam"; // Replace with the desired location
const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`;

export default function BasicDateRangeCalendar() {
  const [dateRange, setDateRange] = useState([null, null]); // State to store selected date range
  const [serverResponse, setServerResponse] = useState(""); // State to store server response
  const [weatherForecast, setWeatherForecast] = useState([]); // State to store weather forecast data

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        const forecastData = weatherData.forecast.forecastday.slice(1, 5); // Extract forecast data for the next 4 days
        setWeatherForecast(forecastData); // Store the forecast data in state
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDateRangeSelect = (range) => {
    setDateRange(range); // Update the date range state when a range is selected
  };

  const handleButtonClick = () => {
    fetch("http://localhost:4123/submit-date-range", {
      // Replace with your server endpoint URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateRange),
    })
      .then((response) => response.text())
      .then((data) => {
        setServerResponse(data); // Store the server response in state
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins", // Change the font family here
    },
    palette: {
      primary: {
        main: "#001DF5", // Customize the primary color
      },
      secondary: {
        main: "#ffffff", // Customize the secondary color
      },
      // Add more customizations to the palette if needed
    },
  });

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const calendarStyles = {
    color: "#00000",
    backgroundColor: "#ffffff",
    borderRadius: "2rem",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.1)",
    margin: "1rem",
    marginBottom: "2rem", // Add margin bottom of 2rem
    borderRight: "none",
  };

  const buttonContainerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    margin: "2rem",
  };

  const buttonStyles = {
    width: "fit-content",
    padding: "0.5rem 1rem",
  };

  const weatherAreaStyles = {
    margin: "2rem", // Add margin of 2rem
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={containerStyles}>
          <DemoContainer components={["DateRangeCalendar"]}>
            <center>
              <h1>Fancy Datepicker 💫 </h1>{" "}
            </center>
            <div style={calendarStyles}>
              <DateRangeCalendar
                calendars={2}
                value={dateRange}
                onChange={handleDateRangeSelect}
              />
              {dateRange[0] !== null && dateRange[1] !== null && (
                <div style={buttonContainerStyles}>
                  <Button
                    variant="contained"
                    onClick={handleButtonClick}
                    style={buttonStyles}
                  >
                    Reserve
                  </Button>
                </div>
              )}
              {weatherForecast.length > 0 && (
                <div style={weatherAreaStyles}>
                  <h3>☀️ Weather Forecast</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {weatherForecast.map((day, index) => (
                      <li key={day.date}>
                        <strong>
                          {index === 0
                            ? "Today"
                            : index === 1
                            ? "Tomorrow"
                            : index === 2
                            ? "The Day After Tomorrow"
                            : ""}
                        </strong>
                        : {day.day.condition.text}, {day.day.avgtemp_c}°C
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DemoContainer>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
