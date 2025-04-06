const db = require("../config/db");

// Get All Users
exports.getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error fetching users", err });
    console.log(results)
    res.status(200).json(results);
  });
};

// Get User By Email
exports.getUserByEmail = (req, res) => {
  const { email } = req.body; // Get the email from the request body
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error fetching user", err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(result[0]);
  });
};
exports.getUserNameById = (req, res) => {
  const {id} = req.params;
  const sql = `
  SELECT name FROM users WHERE id = ?;
  `;
  db.query(sql, id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching User name", err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
      res.status(200).json(results[0]);
  });
};
// Update a User
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    role,
    mobile_number,
    address,
    city_village,
    pin_code,
    district,
    taluka,
    state,
  } = req.body;

  const sql =
    "UPDATE users SET name = ?, mobile_number = ?, address = ?, city_village = ?, pin_code = ?, district = ?, taluka = ?, state = ? WHERE id = ?";

  db.query(
    sql,
    [
      name,
      mobile_number,
      address,
      city_village,
      pin_code,
      district,
      taluka,
      state,
      id,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error updating user", err });
      res.status(200).json({ message: "User updated successfully" });
    }
  );
};

// Delete a User
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error deleting user", err });
    res.status(200).json({ message: "User deleted successfully" });
  });
};

exports.adminUpdateUser = (req, res, next) => {
  const { id, name, email, role } = req.body;

  // Validate input
  if (!id || (!name && !email && !role)) {
    return res.status(400).json({
      error: "User ID and at least one field (name, email, or role) are required.",
    });
  }

  // Prepare updates
  const updates = [];
  const values = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (email) {
    updates.push("email = ?");
    values.push(email);
  }
  if (role) {
    updates.push("role = ?");
    values.push(role);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No fields provided to update." });
  }

  values.push(parseInt(id));

  // Construct SQL query
  const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error updating user", err });
      res.status(200).json({ message: "User updated successfully." });
  })
};
// subscriberController.js

exports.getAllSubscribers = async (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'subscriber'";
  db.query(sql, (err, results) => {
    if (err)
    return res.status(500).json({ message: "Error fetching subscribers", err });
    console.log(results)
    res.status(200).json(results);
  });
};

exports.updateSubscriber = async (req, res) => {
  const { id, can_update } = req.body;
  const sql = "Update users set can_update = ? where id = ?";
  
  db.query(sql,[can_update, id], (err, results) => {
    if (err)
    return res.status(500).json({ message: "Error updating subscriber", err });
    console.log(results)
    res.status(200).json(results);
  });
};
