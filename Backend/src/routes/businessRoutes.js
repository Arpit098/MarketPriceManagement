const express = require("express");
const router = express.Router();
const businessProfileController = require("../controllers/businesProfile");

router.post("/", businessProfileController.createOrUpdateBusinessProfile);
router.get("/:id", businessProfileController.getBusinessProfile);
router.delete("/:id", businessProfileController.deleteBusinessProfile);

module.exports = router;
