import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import "./styles/styles.css";

const apiKey = "509917b15cee4c22b96205129232405";

export default function BasicDateRangeCalendar() {
  // State variabelen
  const [dateRange, setDateRange] = useState([null, null]);
  const [serverResponse, setServerResponse] = useState("");
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const isArrowFunctionSupported = typeof (() => {}) === "function";

  // Ophalen van weerdata
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=4`;

        axios
          .get(apiUrl)
          .then((response) => {
            const weatherData = response.data;
            const forecastData = weatherData.forecast.forecastday.slice(1, 5);
            setWeatherForecast(forecastData);
          })
          .catch((error) => {
            console.error("Fout:", error);
          });
      },
      (error) => {
        console.error("Fout:", error);
      }
    );
  }, []);

  // Event handler voor het selecteren van een datumbereik
  const handleDateRangeSelect = (range) => {
    setDateRange(range);
  };

  // Event handler voor het klikken op de knop
  const handleButtonClick = () => {
    if (validateName()) {
      setButtonDisabled(true);

      fetch("http://localhost:4123/submit-date-range", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateRange, name }),
      })
        .then((response) => response.text())
        .then((data) => {
          setServerResponse(data);
        })
        .catch((error) => {
          console.error("Fout:", error);
        });
    }
  };

  // Validatie voor het naamveld als HTML browser validatie niet ondersteunt wordt (Progressive enhancement)
  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Naam is verplicht");
      return false;
    }
    setNameError("");
    return true;
  };

  // Thema-aanpassing
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

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="containerStyles">
          <DemoContainer components={["DateRangeCalendar"]}>
            <center>
              <h1>Fancy Datepicker 💫 </h1>
            </center>
            <section className="calendarStyles">
              {/* DateRangeCalendar-component */}
              <DateRangeCalendar
                calendars={2}
                value={dateRange}
                onChange={handleDateRangeSelect}
              />
              {/* Render alleen als een datumbereik is geselecteerd */}
              {dateRange[0] !== null && dateRange[1] !== null && (
                <section className="buttonContainerStyles">
                  {/* Naam invoerveld */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Voer uw naam in"
                    style={{ marginRight: "1rem" }}
                  />
                  {/* Render foutmelding als arrow functions niet worden ondersteund (Progressive enhancement) */}
                  {!isArrowFunctionSupported ? (
                    <span className="error">{nameError}</span>
                  ) : null}
                  {/* Render op basis van arrow function ondersteuning (Progressive enhancement) */}
                  {isArrowFunctionSupported ? (
                    <Button
                      variant="contained"
                      onClick={handleButtonClick}
                      className="buttonStyles"
                      disabled={buttonDisabled}
                    >
                      Reserveer
                    </Button>
                  ) : (
                    <button
                      onClick={handleButtonClick}
                      className="buttonStyles"
                      disabled={buttonDisabled}
                    >
                      Reserveer
                    </button>
                  )}
                </section>
              )}

              {/* Render weerbericht als deze beschikbaar is */}
              {weatherForecast.length > 0 && (
                <section className="weatherAreaStyles">
                  <h3>☀️ Weersverwachting in uw omgeving</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {weatherForecast.map((day, index) => (
                      <li key={day.date}>
                        <strong>
                          {/* Bepaal de dag op basis van de index  */}
                          {index === 0
                            ? "Vandaag"
                            : index === 1
                            ? "Morgen"
                            : index === 2
                            ? "Overmorgen"
                            : ""}
                        </strong>
                        : {day.day.condition.text}, {day.day.avgtemp_c}°C
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
          </DemoContainer>
        </section>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
