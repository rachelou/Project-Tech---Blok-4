import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

// API details
const apiKey = "509917b15cee4c22b96205129232405";
const location = "Amsterdam";
const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`;

export default function BasicDateRangeCalendar() {
  // State variables
  const [dateRange, setDateRange] = useState([null, null]);
  const [serverResponse, setServerResponse] = useState("");
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false); // New state for button disabled state

  useEffect(() => {
    // Fetch weather data on component mount
    axios
      .get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        const forecastData = weatherData.forecast.forecastday.slice(1, 5);
        setWeatherForecast(forecastData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDateRangeSelect = (range) => {
    // Update date range when selected
    setDateRange(range);
  };

  const handleButtonClick = () => {
    // Handle button click
    setButtonDisabled(true); // Disable the button when clicked

    // Send date range data to server
    fetch("http://localhost:4123/submit-date-range", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateRange),
    })
      .then((response) => response.text())
      .then((data) => {
        setServerResponse(data); // Set server response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Custom theme for MUI components
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      primary: {
        main: "#001DF5",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  // Styles for container, calendar, button, and weather area
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
    marginBottom: "2rem",
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
    backgroundColor: buttonDisabled ? "#999999" : undefined, // Change button color if disabled
    color: buttonDisabled ? "white" : undefined, // Change button color if disabled
  };

  const weatherAreaStyles = {
    margin: "2rem",
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={containerStyles}>
          {/* Demo container for MUI components */}
          <DemoContainer components={["DateRangeCalendar"]}>
            <center>
              <h1>Fancy Datepicker 💫 </h1>
            </center>
            <div style={calendarStyles}>
              {/* DateRangeCalendar component */}
              <DateRangeCalendar
                calendars={2}
                value={dateRange}
                onChange={handleDateRangeSelect}
              />
              {dateRange[0] !== null && dateRange[1] !== null && (
                <div style={buttonContainerStyles}>
                  {/* Button component */}
                  <Button
                    variant="contained"
                    onClick={handleButtonClick}
                    style={buttonStyles}
                    disabled={buttonDisabled} // Set the disabled state of the button
                  >
                    Reserve
                  </Button>
                </div>
              )}
              {weatherForecast.length > 0 && (
                <div style={weatherAreaStyles}>
                  {/* Weather forecast */}
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
