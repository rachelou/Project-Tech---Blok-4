const express = require("express");
const app = express();
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const bodyParser = require("body-parser");

// Create a MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

run().catch(console.dir);

console.log("Connected to MongoDB");

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// connecting back-end
app.use(bodyParser.json());

app.post("/submit-date-range", async (req, res) => {
  try {
    const dateRange = req.body; // Access the date range sent in the request body
    const dbo = client.db("fancy-datepicker"); // Access the database from the client
    console.log("Received date range:", dateRange);

    // Perform any necessary actions with the date range data

    const reservedDate = await dbo
      .collection("reserved-dates")
      .insertOne({ dateRange });
    console.log("Date inserted:", reservedDate);
    res.send("Success"); // Send a response back to the client
  } catch (error) {
    console.error("Failed to insert document:", error);
    res.status(500).send("Error inserting document");
  }
});

// Homepage rendering
app.get("", (req, res) => {
  res.send("This is the homepage");
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

// Start the server
app.listen(process.env.PORT || 4123, () => {
  console.log("Server started on port 4123");
});
