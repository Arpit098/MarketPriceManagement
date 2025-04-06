const db = require("../config/db");

exports.getUser = (req, res) => {
  const sql = `
   SELECT * FROM users;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching Users", err });
    }
    res.status(200).json(results);
  });
};



exports.updateProfile = (req, res) => {
  const {
    id,
    name,
    mobile_number,
    address,
    city_village,
    pin_code,
    district,
    taluka,
    state
  } = req.body;

  console.log("Request body received:", req.body);

  // SQL query to update user profile
  const sql = `
    UPDATE users 
    SET 
      name = ?, 
      mobile_number = ?, 
      address = ?, 
      city_village = ?, 
      pin_code = ?, 
      district = ?, 
      taluka = ?, 
      state = ? 
    WHERE id = ?
  `;

  const queryParams = [
    name || null,
    mobile_number || null,
    address || null,
    city_village || null,
    pin_code || null,
    district || null,
    taluka || null,
    state || null,
    id,
  ];

  db.query(sql, queryParams, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error updating profile", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Fetch updated profile after update
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, updatedUser) => {
      if (err) {
        console.error("Error fetching updated profile:", err);
        return res.status(500).json({ message: "Error fetching updated profile" });
      }
      res.json({ message: "Profile updated successfully", userData: updatedUser[0] });
    });
  });
};


// ✅ Delete a personal profile
exports.deleteUser = (req, res) => {
  const { id } = req.body;

  const sql = `DELETE FROM user WHERE id=?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting profile", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile deleted successfully" });
  });
};

