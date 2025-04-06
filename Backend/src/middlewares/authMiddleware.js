const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from the Authorization header
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Save user ID from the token to request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
