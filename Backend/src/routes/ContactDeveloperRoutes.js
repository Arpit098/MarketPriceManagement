const express = require("express");
const router = express.Router();
const contactDeveloperController = require("../controllers/contactDeveloperController");

router.post("/", contactDeveloperController.createContactQuery);
router.get("/getall", contactDeveloperController.getAllContactHistory);

router.get("/:userid", contactDeveloperController.getContactHistory);
router.put("/:id", contactDeveloperController.updateContactQuery);
router.delete("/:id", contactDeveloperController.deleteContactQuery);
router.post("/adminUpdate", contactDeveloperController.adminUpdate);

module.exports = router;
