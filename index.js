const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'root'
});

// Connect to the database and handle errors
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Create a random user (unused in the code but can be used for seeding the database)
let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Home route
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS userCount FROM user";
  connection.query(q, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.send("Some error in Database");
    }
    let count = result[0]["userCount"];
    res.render("home.ejs", { count });
  });
});

// Display all users
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  connection.query(q, (err, users) => {
    if (err) {
      console.error("Database query error:", err);
      return res.send("Some error in Database");
    }
    // Ensure data exists before rendering the view
    console.log(users); // To debug and check if users are being fetched
    res.render("show.ejs", { users });
  });
});

// Edit user route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id ='${id}'`;
  connection.query(q, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.send("Some error in Database");
    }
    console.log(result[0]);
    res.render("edit.ejs", { user: result[0] });
  });
});

// Start server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});