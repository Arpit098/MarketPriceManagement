const express = require("express");
const router = express.Router();
const liveProgramController = require("../controllers/liveProgramController");

// Get all live programs
router.get("/", liveProgramController.getLivePrograms);

// Add a new live program
router.post("/", liveProgramController.createLiveProgram);

// Get a live program by ID
router.get("/myPrograms/:id", liveProgramController.getLiveProgramByUserId);

// Update a live program
router.put("/update", liveProgramController.updateLiveProgram);
router.put("/conducted-status/:id", liveProgramController.updateConductedStatus);

router.put("/adminUpdate", liveProgramController.adminUpdateLiveProgram);
// Delete a live program
router.delete("/:id", liveProgramController.deleteLiveProgram);

module.exports = router;
