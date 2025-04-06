const db = require("../config/db");

// Create a new city
exports.createCity = (req, res) => {
  const { name } = req.body; // Assuming you're sending { name: "City Name" }
  const sql = "INSERT INTO cities (city_name) VALUES (?)";

  db.query(sql, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating city", err });
    }
    res.status(201).json({
      message: "City created successfully",
      cityId: result.insertId,
    });
  });
};

// Get all cities
// Get all cities (Debugging version)
exports.getCities = (req, res) => {
  const sql = "SELECT * FROM cities";

  console.log("API hit: Fetching all cities"); // Check if route is called

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err); // Log error if any
      return res
        .status(500)
        .json({ message: "Error fetching cities", error: err.message });
    }

    res.status(200).json(results);
  });
};

// Get a city by ID
exports.getCityById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cities WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching city", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json(result[0]);
  });
};

// Update a city
exports.updateCity = (req, res) => {
  const { id } = req.params;
  const { name } = req.body; // Assuming you're sending { name: "New City Name" }
  const sql = "UPDATE cities SET name = ? WHERE id = ?";

  db.query(sql, [name, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating city", err });
    }
    res.status(200).json({ message: "City updated successfully" });
  });
};

// Delete a city
exports.deleteCity = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cities WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting city", err });
    }
    res.status(200).json({ message: "City deleted successfully" });
  });
};
