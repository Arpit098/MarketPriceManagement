const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  //Validate Role
  const validateRoles = ["subscriber", "consultant", "admin"];
  if (!validateRoles.includes(role)) {
    return res.status(400).json({ Message: "invalid Role Specifed" });
  }

  //   hash Password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ Message: "Error Hashing Password" });
    }

    // Save User Into the DB
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hash, role], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ Message: err.message });
      }
      res.status(201).json({ Message: "user Registerd Sucessfully" });
    });
  });
};

// Login User

// Login User
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find User in database using email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ Message: "Invalid Email" });
    }

    const user = results[0];

    // Compare passwords
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ message: "Invalid Password" });
      }

      // Create and send Token with role
      const token = jwt.sign(
        { id: user.id, role: user.role }, // Only include necessary data
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      // Send token and user name in the response
      res.status(200).json({
        token,
        user: user,
      });
    });
  });
};
