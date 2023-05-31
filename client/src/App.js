import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasicDateRangeCalendar from "./datepicker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<BasicDateRangeCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
