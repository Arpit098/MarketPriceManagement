const express = require("express");
const router = express.Router();
const weeklyConsultationController = require("../controllers/weeklyConsultationController");

// Get all weather updates
router.get("/", weeklyConsultationController.getweeklyConsultations);
// Add a new weather update
router.post("/", weeklyConsultationController.createweeklyConsultation);
router.post("/adminFeedback", weeklyConsultationController.adminFeedback);
router.put("/adminUpdate", weeklyConsultationController.adminUpdateWeeklyConsultation);

// Get a weather update by ID
router.get("/:id", weeklyConsultationController.getWeeklyConsultationByUserId);
// Update a weather update
router.put("/:id", weeklyConsultationController.updateWeeklyConsultation);
// Delete a weather update
router.delete("/:id", weeklyConsultationController.deleteWeeklyConsultation);

module.exports = router;
