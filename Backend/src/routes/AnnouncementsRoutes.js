const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/AnnouncementsController");

// Create New Announcement
router.post("/", AnnouncementController.createAnnouncement);

// Get All Announcements
router.get("/", AnnouncementController.getAnnouncements);

// Get Announcement by ID
router.get("/:id", AnnouncementController.getAnnouncementById);

// Get Announcements by Status
router.post("/by-status", AnnouncementController.getAnnouncementsByStatus);

router.post("/by-email", AnnouncementController.getAnnouncementsByEmail);

// Update Announcement Status
router.put("/status", AnnouncementController.updateAnnouncementStatus);

// Update an Announcement
router.put("/update", AnnouncementController.updateAnnouncement);

// Delete an Announcement
router.delete("/delete", AnnouncementController.deleteAnnouncement);

module.exports = router;
