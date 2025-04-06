const db = require("../config/db");

// Create New Weather Update
exports.createweeklyConsultation = (req, res) => {
  const {
    date,
    unique_id,
    consultant_id,
    prediction_area,
    prediction,
    advice
    
  } = req.body;

  const sql = `
    INSERT INTO weather_updates 
    (date, unique_id, consultant_id, prediction_area, prediction, advice, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    sql,
    [date, unique_id, consultant_id, prediction_area, prediction, advice],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating weather update", err });
      }
      res.status(201).json({
        message: "Weather update created successfully",
        updateId: result.insertId,
      });
    }
  );
};

// Get All Weather Updates
exports.getweeklyConsultations = (req, res) => {
  const sql = "SELECT * FROM weather_update";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching weather updates", err });
    res.status(200).json(results);
  });
};

// Get Weather Update By ID
exports.getWeeklyConsultationByUserId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM weekly_co WHERE consultant_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching weather update", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Weather update not found" });
    res.status(200).json(result[0]);
  });
};

// Update a Weather Update
exports.updateWeeklyConsultation = (req, res) => {
    const { id } = req.params;
    const {
      date,
      unique_id,
      date_of_weekly_consultation,
      topic,
      time,
      conducted_by,
      category,
      subject,
      program_link,
      conducted,
      if_not_why,
      number_of_participants,
      subscriber_feedback,
      your_feedback,
      our_feedback,
    } = req.body;
  
    const sql = `
      UPDATE weekly_consultation 
      SET unique_id = ?, date_of_weekly_consultation = ?, topic = ?, time = ?, conducted_by = ?, category = ?, subject = ?, program_link = ?, conducted = ?, if_not_why = ?, number_of_participants = ?, your_feedback = ? 
      WHERE id = ?
    `;
  
    db.query(
      sql,
      [
        unique_id,
        date_of_weekly_consultation,
        topic,
        time,
        conducted_by,
        category,
        subject,
        program_link,
        conducted,
        if_not_why,
        number_of_participants,
        your_feedback,
        id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error updating weekly consultation", err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "No consultation found with the given ID" });
        }
        res.status(200).json({ message: "Weekly consultation updated successfully" });
      }
    );
  };

// Delete a Weather Update
exports.deleteWeeklyConsultation = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM weather_update WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting weather update", err });
    res.status(200).json({ message: "Weather update deleted successfully" });
  });
};

exports.adminUpdateWeeklyConsultation = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Success Stories ID and status are required." });
  }

  const sql =
    "UPDATE weather_updates SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating Weather Update status", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Weather Update not found" });
    }
    const message =
      status === "rejected"
        ? "Weather Update rejected successfully"
        : "Weather Update approved successfully";
    res.status(200).json({ message });
  });
};

exports.adminFeedback = (req, res) => {
    const { id, feedback } = req.body;
    if (!id || !feedback) {
        return res
        .status(400)
        .json({ message: "ID and feedback are required." });
        }
        const sql = "UPDATE weather_updates SET feedback = ? WHERE id = ?";
        db.query(sql, [feedback, id], (err, result) => {
            if (err) {
                return res
                .status(500)
                .json({ message: "Error updating Weather Update feedback", err });
             }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Weather Update not found" });
            }
            res.status(200).json({ message: "Feedback updated successfully" });
     });
};
