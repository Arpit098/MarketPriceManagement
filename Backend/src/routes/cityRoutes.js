const express = require("express");
const {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");

const router = express.Router();

router.post("/", createCity); // Create a new city
router.get("/", getCities); // Get all cities
router.get("/:id", getCityById); // Get a city by ID
router.put("/:id", updateCity); // Update a city
router.delete("/:id", deleteCity); // Delete a city

module.exports = router;
