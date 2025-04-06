const mysql = require("mysql");
const dotenv = require("dotenv");

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost", // Database host
  user: process.env.DB_USER || "root", // Database user
  password: process.env.DB_PASSWORD || "", // Database password
  database: process.env.DB_NAME || "test", // Database name
  port: process.env.DB_PORT || 3307, // Database port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;