const express = require("express");
const router = express.Router();
const governmentSchemeController = require("../controllers/governmentSchemeController");

// Routes
router.post("/create", governmentSchemeController.createGovernmentScheme);
router.get("/", governmentSchemeController.getGovernmentSchemes);
router.get("/approved", governmentSchemeController.getApprovedSchemes);

// router.post(
//   "/by-status", governmentSchemeController.getGovernmentSchemesByStatus
// );
router.get("/consultant/:id", governmentSchemeController.getGovernmentSchemeByConsutantId);
router.put(
  "/update-status",
  governmentSchemeController.updateGovernmentSchemeStatus
);
router.put("/update", governmentSchemeController.updateGovernmentScheme);
router.delete("/delete", governmentSchemeController.deleteGovernmentScheme);

// New Route: Get schemes by email
// router.post(
//   "/by-email",
//   governmentSchemeController.getGovernmentSchemesByEmail
// );

module.exports = router;
