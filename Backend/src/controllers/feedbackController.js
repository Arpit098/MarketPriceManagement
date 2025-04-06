const db = require("../config/db");

// Create a new feedback entry
exports.createFeedback = async (req, res) => {
  const { userid, name, mobile_number, subject, purpose } = req.body;
  console.log("called create feedback", userid, name, mobile_number, subject, purpose);

  if (!userid || !name || !mobile_number || !subject || !purpose) {
    return res.status(400).json({ message: "All fields (userid, name, mobile_number, subject, purpose) are required" });
  }

  const sql = "INSERT INTO feedback (userid, name, mobile_number, subject, purpose) VALUES (?, ?, ?, ?, ?)";
  const params = [userid, name, mobile_number, subject, purpose];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error creating feedback:", err);
      return res.status(500).json({ message: "Error creating feedback" });
    }
    res.json({ message: "Feedback created successfully" });
  });
};

// Update a feedback entry
exports.updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { name, mobile_number, subject, purpose } = req.body;
  console.log("update feedback", id, name, mobile_number, subject, purpose);

  const updateSql = `
    UPDATE feedback 
    SET name = COALESCE(?, name), 
        mobile_number = COALESCE(?, mobile_number), 
        subject = COALESCE(?, subject), 
        purpose = COALESCE(?, purpose), 
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;
  const updateParams = [name || null, mobile_number || null, subject || null, purpose || null, id];

  db.query(updateSql, updateParams, (updateErr, result) => {
    if (updateErr) {
      console.error("Error updating feedback:", updateErr);
      return res.status(500).json({ message: "Error updating feedback" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({
      message: "Feedback updated successfully",
    });
  });
};

// Delete a feedback entry
exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM feedback WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error deleting feedback:", err);
      return res.status(500).json({ message: "Error deleting feedback", err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  });
};

// Get feedback history for a specific user
exports.getFeedbackHistory = async (req, res) => {
  const { userid } = req.params;
  console.log("get feedback history called", userid);

  const sql = "SELECT * FROM feedback WHERE userid = ? ORDER BY created_at DESC";
  db.query(sql, [userid], (err, results) => {
    if (err) {
      console.error("Error fetching feedback history:", err);
      return res.status(500).json({ message: "Error fetching feedback history", err });
    }
    res.status(200).json(results);
  });
};

// Get all feedback entries
exports.getAllFeedback = async (req, res) => {
  console.log("get all feedback history called");

  const sql = "SELECT * FROM feedback";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching all feedback:", err);
      return res.status(500).json({ message: "Error fetching all feedback", err });
    }
    console.log(results);
    res.status(200).json(results);
  });
};

exports.getAllServices = async (req, res) =>{
   const {service} = req.params;

   if(service == "basic"){
     const sql1 = "SELECT * FROM articles"
     const sql2 = "SELECT * FROM notifications"
     const sql3 = "SELECT * FROM government_schemes"
   }
   else{
    
   }

}
