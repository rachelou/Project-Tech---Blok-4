const express = require("express");
const app = express();

// Basic routing
app.get("/", (req, res) => {
  res.send("Welcome to my datepicker app!");
});

app.get("/about", (req, res) => {
  res.send("This app helps you pick a date for your next event.");
});

// Error handling
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Serve static files
app.use(express.static("static"));
