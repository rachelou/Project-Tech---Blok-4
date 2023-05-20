import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme();

export default function BasicDateRangeCalendar() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [serverResponse, setServerResponse] = useState("");

  const handleDateRangeSelect = (range) => {
    setDateRange(range);
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
        setServerResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const calendarStyles = {
    backgroundColor: "lightblue",
    color: "white",
    border: "2px solid red",
    borderRadius: "4px",
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangeCalendar"]}>
          <div style={calendarStyles}>
            <DateRangeCalendar
              calendars={2}
              value={dateRange}
              onChange={handleDateRangeSelect}
            />
          </div>
          {dateRange[0] !== null && dateRange[1] !== null && (
            <button onClick={handleButtonClick}>Do Something</button>
          )}
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
