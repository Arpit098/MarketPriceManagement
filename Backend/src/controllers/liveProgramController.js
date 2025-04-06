const db = require("../config/db");

// Create New Live Program
exports.createLiveProgram = (req, res) => {
  const {
    unique_id,
    date_of_program,
    consultant_id,
    time,
    conducted_by,
    category,
    subject,
    program_link,
    your_feedback,
    conducted,
    if_not_why,
    number_of_participants,
    subscriber_feedback,
    our_feedback,
  } = req.body;

  const created_at = new Date(); // Get the current date and time

  const sql = `
    INSERT INTO live_programs 
    (unique_id, consultant_id, date_of_program, time, conducted_by, category, subject, program_link, your_feedback, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      unique_id,
      consultant_id,
      date_of_program,
      time,
      conducted_by,
      category,
      subject,
      program_link,
      your_feedback,
      created_at
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating live program", err });
      }
      res.status(201).json({
        message: "Live program created successfully",
        programId: result.insertId,
      });
    }
  );
};


// Get All Live Programs
exports.getLivePrograms = (req, res) => {
  const sql = "SELECT * FROM live_programs";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching live programs", err });
    res.status(200).json(results);
  });
};

// Get Live Program By ID
exports.getLiveProgramByUserId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM live_programs WHERE consultant_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching live program", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Live program not found" });
    res.status(200).json(result);
  });
};

// Update a Live Program
exports.updateLiveProgram = (req, res) => {
  console.log("update called")
  const {
    unique_id,
    date_of_program,
    time,
    conducted_by,
    category,
    subject,
    conducted,
    if_not_why,
    program_link,
    number_of_participants,
    your_feedback,
    consultant_id,
    id,
    
  } = req.body;

  const sql = `
    UPDATE live_programs 
    SET unique_id = ?, date_of_program = ?, time = ?, conducted_by = ?, 
        category = ?, subject = ?, program_link = ?, 
        number_of_participants = ?, your_feedback = ?, updated_at = ?, conducted = ?, if_not_why = ?, number_of_participants = ?
    WHERE id = ?
  `;
   const updated_at = new Date();
  db.query(
    sql,
    [
      unique_id,
      date_of_program,
      time,
      conducted_by,
      category,
      subject,
      program_link,
      number_of_participants,
      your_feedback,
      id,
      updated_at,
      conducted,
      if_not_why,
      number_of_participants,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: "Error updating live program", err });
        
      }
      res.status(200).json({ message: "Live program updated successfully" });
      console.log("successfull")
    }
  );
};

exports.updateConductedStatus = async (req, res) => {
  const { id } = req.params;
  const { conducted, reason } = req.body;
  const sql = "UPDATE live_programs SET conducted = ?, reason = ? WHERE id = ?";
  db.query(sql, [conducted, reason, id], (err, result) => {
    if (err) {
      return res
      .status(500)
      .json({ message: "Error updating conducted status", err });
    }
    res.status(200).json({ message: "Conducted status updated successfully" });
  }
  );
}
// Delete a Live Program
exports.deleteLiveProgram = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM live_programs WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting live program", err });
    res.status(200).json({ message: "Live program deleted successfully" });
  });
};
exports.adminUpdateLiveProgram = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Live Program ID and status are required." });
  }

  const sql =
    "UPDATE live_programs SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating live program status", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Live Program not found" });
    }
    const message =
      status === "rejected"
        ? "Live Program rejected successfully"
        : "Live Program approved successfully";
    res.status(200).json({ message });
  });
};

exports.adminfeedback = async(req, res) =>{
  const {id, feedback} = req.body;
  
  const sql = "UPDATE feedback SET our_feedback = ? WHERE id = ?";
  db.query(sql, [feedback, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding feedback", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Live Program not found" });
    }
    const message = "Live Program updated successfully";
      
    res.status(200).json({ message });
  });

}