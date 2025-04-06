const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/", feedbackController.createFeedback);
router.get("/:userid", feedbackController.getFeedbackHistory);
router.get("/", feedbackController.getAllFeedback);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.get("/service/:name", feedbackController.getAllServices);
module.exports = router;
