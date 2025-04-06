const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/successStoriesController");

// Routes
router.post("/", serviceController.createService);
router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getServiceByUserId);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);
router.put("/adminUpdate", serviceController.adminUpdateSuccessStory);

module.exports = router;
