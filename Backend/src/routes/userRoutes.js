const express = require("express");
const { getUser, updateProfile, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUser);
router.post("/updatePersonal", updateProfile);
router.delete("/deleteSubscriber", deleteUser);

module.exports = router;
