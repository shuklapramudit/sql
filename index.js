const { faker } = require('@faker-js/faker'); 
const mysql = require("mysql2");

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test', // Make sure 'test' database exists
  password: 'root'
});

// Connect to the database and handle errors
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");

  // Query to show tables
  try {
    connection.query("SHOW TABLES", (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  } catch (err) {
    console.log("Query error:", err);
  } finally {
    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error("Error closing the connection:", err.message);
      } else {
        console.log("Connection closed.");
      }
    });
  }
});

// Function to create a random user
let createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
// console.log(createRandomUser());