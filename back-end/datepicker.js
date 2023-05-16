import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "moment/locale/en-gb";

moment.locale("en-gb");

const [dateRange, setDateRange] = useState({
  startDate: null,
  endDate: null,
});

const handleDateChange = ({ startDate, endDate }) => {
  setDateRange({ startDate, endDate });
};

return (
  <DateRangePicker
    startDate={dateRange.startDate}
    startDateId="start_date_id"
    endDate={dateRange.endDate}
    endDateId="end_date_id"
    onDatesChange={handleDateChange}
    focusedInput={focusedInput}
    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
    displayFormat="DD/MM/YYYY"
    startDatePlaceholderText="Check-in"
    endDatePlaceholderText="Check-out"
    showClearDates
    showDefaultInputIcon
    hideKeyboardShortcutsPanel
  />
);
