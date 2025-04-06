const express = require("express");
const router = express.Router();
const NotificatoinController = require("../controllers/NotificatoinController");

// Create Notificatoin
router.post("/", NotificatoinController.createNotification);

// Get All Notification
router.get("/", NotificatoinController.getNotifications);
router.get("/approved", NotificatoinController.getApprovedNotifications);

// Get Notification by id
router.get("/:id", NotificatoinController.getNotificationByConsultantId);

// Get Notification by Email
router.post("/by-email", NotificatoinController.getNotificationsByEmail);

// Get Notifications by Status
router.post("/by-status", NotificatoinController.getNotificationsByStatus);

// update Notificatoin
router.put("/update", NotificatoinController.updateNotification);

// Update Status
router.put("/updateStatus", NotificatoinController.updateNotificationStatus);

// Delete notificatoin
router.delete("/delete", NotificatoinController.deleteNotification);

module.exports = router;
