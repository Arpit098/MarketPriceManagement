const express = require("express");
const router = express.Router();
const  ProfessionalProfileController= require("../controllers/professionalController");

router.post("/", ProfessionalProfileController.createOrUpdateProfessionalProfile);
router.get("/:id", ProfessionalProfileController.getProfessionalProfile);
router.delete("/:id", ProfessionalProfileController.deleteProfessionalProfile);

module.exports = router;
