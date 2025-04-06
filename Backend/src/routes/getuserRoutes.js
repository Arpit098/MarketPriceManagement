const express = require("express");
const userController = require("../controllers/getuserController");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/by-email", userController.getUserByEmail); // New route to get user by email
router.post("/adminUpdate", userController.adminUpdateUser)
router.get("/getSubscribers", userController.getAllSubscribers);
router.post("/updateSubscriber", userController.updateSubscriber);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/getName/:id", userController.getUserNameById);
module.exports = router;
