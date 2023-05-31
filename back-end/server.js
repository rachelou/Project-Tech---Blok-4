const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const bodyParser = require("body-parser");

// Create a MongoClient & declare db and collection name
const client = new MongoClient(uri);
const dbName = "fancy-datepicker";
const collectionName = "reserved-dates";

// Functie om verbinding te maken met MongoDB
async function run() {
  try {
    // Maak verbinding met de MongoDB-server
    await client.connect();
    // Verstuur een ping om een succesvolle verbinding te bevestigen
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

// Middleware voor het parsen van JSON-data
app.use(bodyParser.json());

// Route voor het verwerken van het verzenden van de date range
app.post("/submit-date-range", async (req, res) => {
  try {
    const dateRange = req.body; // Haal de date range op uit het request body
    const dbo = client.db("fancy-datepicker"); // Haal de database op van de client
    console.log("Received date range:", dateRange);

    // Voeg de date range toe aan de "reserved-dates" collectie
    const reservedDate = await dbo
      .collection("reserved-dates")
      .insertOne({ dateRange });
    console.log("Date inserted:", reservedDate);
    res.send("Success"); // Stuur een response terug naar de client
  } catch (error) {
    console.error("Failed to insert document:", error);
    res.status(500).send("Error inserting document");
  }
});

// Stel EJS in als view engine
app.set("view engine", "ejs"); // activeer EJS als templating engine
app.set("views", path.join(__dirname, "views")); // geef de locatie van de view-bestanden aan
app.use("/static", express.static(path.join(__dirname, "static"))); // serveer CSS-bestanden

// Homepage rendering
app.get("", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const dates = await collection.find().toArray();
    res.render("admin.ejs", { dates: dates, name: "" });
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start de server
app.listen(process.env.PORT || 4123, () => {
  console.log("Server started on port 4123");
});
