const express = require("express");
const farmProfileController = require("../controllers/farmprofilesController");
const irrigationController = require("../controllers/FarmerProfileSources");

const router = express.Router();


router.post("/", farmProfileController.createOrUpdateFarmProfile);
router.get("/", farmProfileController.getFarmProfiles);
router.get("/", farmProfileController.getFarmProfileByUserId);
router.put("/", farmProfileController.updateFarmProfile);
router.delete("/:id", farmProfileController.deleteFarmProfile);


router.post("/sources/:table", irrigationController.createEntry);
router.put("/sources/:table/:id", irrigationController.updateEntry);
router.delete("/sources/:table/:id", irrigationController.deleteEntry);
router.get("/sources/:table", irrigationController.getAllEntries);
router.get("/sources/:table/:id", irrigationController.getEntryById);


router.post("/family-members", farmProfileController.createFamilyMember);
router.get("/family-members", farmProfileController.getFamilyMembers);
router.put("/family-members/:id", farmProfileController.updateFamilyMember);
router.delete("/family-members/:id", farmProfileController.deleteFamilyMember);


module.exports = router;
