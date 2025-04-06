const pool = require("../../src/config/db"); // MySQL connection pool

// Create a new contact query
exports.createContactQuery = async (req, res) => {
  const { userid, name, email, query } = req.body; // Changed 'userid' to 'userid' for consistency
  console.log("called create", userid, name, email, query);
  if (!userid || !name || !email || !query) {
    return res.status(400).json({ message: "All fields (userid, name, email, query) are required" });
  }

  const sql = "INSERT INTO contact_developer (userid, name, email, query) VALUES (?, ?, ?, ?)"
   const params = [userid, name, email, query];

   pool.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating contact query" });
      }
      res.json({ message: "Contact query created successfully" });
    });
  
};

// Update a contact query (e.g., mark as resolved or update developer response)

exports.updateContactQuery = async (req, res) => {
  const { id } = req.params;
  const { name, email, query } = req.body;
  console.log(id, name, email, query);

  // Check current resolved status
  const checkSql = "SELECT resolved FROM contact_developer WHERE id = ?";
  const checkParams = [id];

  pool.query(checkSql, checkParams, (err, existingRows) => {
    if (err) {
      console.error("Error checking resolved status:", err);
      return res.status(500).json({ message: "Error checking resolved status" });
    }

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Contact query not found" });
    }

    if (existingRows[0].resolved === true) {
      return res.status(403).json({ message: "Cannot update a resolved query" });
    }

    // Proceed with update if not resolved
    const updateSql = `
      UPDATE contact_developer 
      SET name = COALESCE(?, name), 
          email = COALESCE(?, email), 
          query = COALESCE(?, query), 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    const updateParams = [name || null, email || null, query || null, id];

    pool.query(updateSql, updateParams, (updateErr, result) => {
      if (updateErr) {
        console.error("Error updating contact query:", updateErr);
        return res.status(500).json({ message: "Error updating contact query" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Contact query not found" });
      }

      res.json({
        message: "Contact query updated successfully",
      });
    });
  });
};
// Delete a contact query
exports.deleteContactQuery = async (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM contact_developer WHERE id = ?", [id], (err, results) => {
      if (err) {
        return res.status(404).json({ message: "Error deleting query", err });
      }
      res.json({ message: "Contact query deleted successfully" });
    })
};

// Get contact history for a specific user
exports.getContactHistory = async (req, res) => {
  const { userid } = req.params; // Changed to query param to match frontend
    console.log("get called", userid)
    const sql= "SELECT * FROM contact_developer WHERE userid = ? ORDER BY created_at DESC";
 
    pool.query(sql, [userid], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching products", err });
      }
      res.status(200).json(results);
    });
}

// Get all contact queries
exports.getAllContactHistory = async (req, res) => {
    const sql = "SELECT * FROM contact_developer";
    pool.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching products", err });
      }
      console.log(results)
      res.status(200).json(results);
    });
};

exports.adminUpdate = async (req, res) =>{
    const {id, resolved} = req.body;
    const sql = "UPDATE contact_developer SET resolved = ? WHERE id = ?";
    pool.query(sql, [resolved, id], (err, results) => {
      if (err) {
        return res.status(404).json({ message: "Error updating query", err });
      }
        res.json({ message: "Query updated successfully" });
    });
}