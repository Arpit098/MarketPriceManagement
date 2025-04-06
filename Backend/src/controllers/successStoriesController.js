const db = require("../config/db");


exports.createService = (req, res) => {
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
    INSERT INTO weekly_consultation 
    (unique_id, date_of_weekly_consultation, topic, time, conducted_by, category, subject, program_link, your_feedback) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      your_feedback,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating weekly consultation", err });
      }
      res.status(201).json({
        message: "Weekly consultation created successfully",
        consultationId: result.insertId,
      });
    }
  );
};



// Get All Value Added Services
exports.getServices = (req, res) => {
  const sql = "SELECT * FROM success_stories";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching value added services", err });
    res.status(200).json(results);
  });
};

// Get Value Added Service by ID
exports.getServiceByUserId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM success_stories WHERE consultant_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching value added service", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Value Added Service not found" });
    res.status(200).json(result);
  });
};

// Update a Value Added Service
exports.updateService = (req, res) => {
  const {
    date,
    unique_id,
    consultant_id,
    topic,
    category,
    subject,
    success_story,
    id,
  } = req.body;
  console.log(req.body)
  const sql = `
    UPDATE success_stories
    SET date = ?, unique_id = ?, consultant_id = ?, topic = ?, category = ?, subject = ?, success_story = ? 
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      date,
      unique_id,
      consultant_id,
      topic,
      category,
      subject,
      success_story,
      id,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating success story", err });
      }
      res.status(200).json({ message: "Success story updated successfully" });
    }
  );
};

// Delete a Value Added Service
exports.deleteService = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM success_stories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting value added service", err });
    res
      .status(200)
      .json({ message: "Value Added Service deleted successfully" });
  });
};

exports.adminUpdateSuccessStory = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Success Stories ID and status are required." });
  }

  const sql = "UPDATE success_stories SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating Success Story status", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Success Story not found" });
    }
    const message =
      status === "rejected"
        ? "Success Story rejected successfully"
        : "Success Story approved successfully";
    res.status(200).json({ message });
  });
};
