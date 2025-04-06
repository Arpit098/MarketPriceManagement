const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware"); // Import the middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the protected route!", userId: req.userId });
});

module.exports = router;
