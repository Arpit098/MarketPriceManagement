const db = require("../config/db");

// Create a new farm profile
exports.createOrUpdateFarmProfile = (req, res) => {
  const {
    id,
    self_name,
    area,
    source_of_irrigation,
    mode_of_irrigation,
    sowing_pattern,
    crop_pattern,
    crops,
    shivar,
    taluka,
    district,
    state,
    farm_equipments,
  } = req.body;

  // Check if a farm profile already exists for this user
  const checkSql = `SELECT id FROM farm_profiles WHERE userid = ?`;

  db.query(checkSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length > 0) {
      // If the profile exists, update it
      const updateSql = `
        UPDATE farm_profiles
        SET self_name = ?, area = ?, source_of_irrigation = ?, mode_of_irrigation = ?, 
            sowing_pattern = ?, crop_pattern = ?, crops = ?, shivar = ?, 
            taluka = ?, district = ?, state = ?, farm_equipments = ?
        WHERE userid = ?
      `;

      db.query(
        updateSql,
        [
          self_name,
          area,
          source_of_irrigation,
          mode_of_irrigation,
          sowing_pattern,
          crop_pattern,
          crops,
          shivar,
          taluka,
          district,
          state,
          farm_equipments,
          id,
        ],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({
              message: "Error updating farm profile",
              error: updateErr,
            });
          }
          // Return the updated data from req.body
          res.json({
            message: "Farm profile updated successfully",
            data: [{
              id,
              self_name,
              area,
              source_of_irrigation,
              mode_of_irrigation,
              sowing_pattern,
              crop_pattern,
              crops,
              shivar,
              taluka,
              district,
              state,
              farm_equipments,
            }],
          });
        }
      );
    } else {
      // If the profile does not exist, create a new one
      const insertSql = `
        INSERT INTO farm_profiles 
        (userid, self_name, area, source_of_irrigation, mode_of_irrigation, 
         sowing_pattern, crop_pattern, crops, shivar, taluka, district, state, farm_equipments) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          id,
          self_name,
          area,
          source_of_irrigation,
          mode_of_irrigation,
          sowing_pattern,
          crop_pattern,
          crops,
          shivar,
          taluka,
          district,
          state,
          farm_equipments,
        ],
        (insertErr, insertResult) => {
          if (insertErr) {
            return res.status(500).json({
              message: "Error creating farm profile",
              error: insertErr,
            });
          }
          // Return the inserted data from req.body with farmProfileId
          res.status(201).json({
            message: "Farm profile created successfully",
            farmProfileId: insertResult.insertId,
            data: [{
              id,
              self_name,
              area,
              source_of_irrigation,
              mode_of_irrigation,
              sowing_pattern,
              crop_pattern,
              crops,
              shivar,
              taluka,
              district,
              state,
              farm_equipments,
            }],
          });
        }
      );
    }
  });
};


// Get all farm profiles
exports.getFarmProfiles = (req, res) => {
  const sql = "SELECT * FROM farm_profiles";

  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching farm profiles", err });
    }
    res.status(200).json(results);
  });
};

// Get a farm profile by userid
// Get a farm profile by userid
exports.getFarmProfileByUserId = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const sql = "SELECT * FROM farm_profiles WHERE userid = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching farm profile", err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Farm profile not found" });
    }
    res.status(200).json(results);
  });
};

// Update a farm profile by id
exports.updateFarmProfile = (req, res) => {
  const { id, ...updates } = req.body; // Extract `id` and the rest of the fields from the request body

  if (!id) {
    return res.status(400).json({ message: "Farm profile ID is required" });
  }

  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: "No fields to update provided" });
  }

  // Dynamically construct the SQL query and values
  const fields = [];
  const values = [];

  for (const key in updates) {
    if (updates[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }
  }

  values.push(id); // Add `id` to the values array for the WHERE clause

  const sql = `
    UPDATE farm_profiles 
    SET ${fields.join(", ")} 
    WHERE id = ?
  `;

  db.query(sql, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating farm profile", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Farm profile not found" });
    }
    res.status(200).json({ message: "Farm profile updated successfully" });
  });
};

// Delete a farm profile by id
exports.deleteFarmProfile = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM farm_profiles WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting farm profile", err });
    }
    res.status(200).json({ message: "Farm profile deleted successfully" });
  });
};

exports.createFamilyMember = (req, res) => {
  const { userid, relation, name } = req.body;

  if (!userid || !relation || !name) {
      return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO family_members (userid, relation, name) VALUES (?, ?, ?)";
  db.query(sql, [userid, relation, name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Family member added", id: result.insertId });
  });
};

// Get all family members of a user by userid
exports.getFamilyMembers = (req, res) => {
  const { userid } = req.query;

  if (!userid) {
      return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "SELECT * FROM family_members WHERE userid = ?";
  db.query(sql, [userid], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ familyMembers: results });
  });
};

// Update a family member
exports.updateFamilyMember = (req, res) => {
  const { id } = req.params;
  const { relation, name } = req.body;

  if (!relation || !name) {
      return res.status(400).json({ error: "Both relation and name are required" });
  }

  const sql = "UPDATE family_members SET relation = ?, name = ? WHERE userid = ?";
  db.query(sql, [relation, name, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Family member not found" });

      res.status(200).json({ message: "Family member updated" });
  });
};

// Delete a family member
exports.deleteFamilyMember = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM family_members WHERE id = ?";
  db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Family member not found" });

      res.status(200).json({ message: "Family member deleted" });
  });
};
