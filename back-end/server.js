const express = require("express");
const app = express();
const ejs = require("ejs");

// Home page rendering
app.get("/", function (req, res) {
  const items = ["item 1", "item 2", "item 3"];
  ejs.renderFile("views/home.ejs", { items: items }, function (err, html) {
    // Error handling for rendering
    if (err) {
      console.log(err);
      res.status(500).send("Error rendering template");
    } else {
      res.send(html);
    }
  });
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
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
