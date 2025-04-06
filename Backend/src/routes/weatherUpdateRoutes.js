const express = require("express");
const router = express.Router();
const weatherUpdateController = require("../controllers/weatherUpdateController");

// Get all weather updates
router.get("/", weatherUpdateController.getWeatherUpdates);

// Add a new weather update
router.post("/", weatherUpdateController.createWeatherUpdate);

// Get a weather update by ID
router.get("/:id", weatherUpdateController.getWeatherUpdateByUserId);

// Update a weather update
router.put("/:id", weatherUpdateController.updateWeatherUpdate);

// Delete a weather update
router.delete("/:id", weatherUpdateController.deleteWeatherUpdate);

router.put("/adminUpdate", weatherUpdateController.adminUpdateWeather);

module.exports = router;
