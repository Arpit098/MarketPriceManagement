const db = require("../config/db");

// Create New Weather Update
exports.createWeatherUpdate = (req, res) => {
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
exports.getWeatherUpdates = (req, res) => {
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
exports.getWeatherUpdateByUserId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM weather_update WHERE consultant_id = ?";
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
exports.updateWeatherUpdate = (req, res) => {
  const { id } = req.params;
  const {
    date,
    unique_id,
    consultant_id,
    prediction_area,
    prediction,
    advice,
  } = req.body;

  const sql = `
    UPDATE weather_updates 
    SET date = ?, unique_id = ?, consultant_id = ?, prediction_area = ?, prediction = ?, advice = ?, updated_at = NOW()
    WHERE id = ?
  `;

  db.query(
    sql,
    [date, unique_id, consultant_id, prediction_area, prediction, advice, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating weather update", err });
      }
      res.status(200).json({ message: "Weather update updated successfully" });
    }
  );
};

// Delete a Weather Update
exports.deleteWeatherUpdate = (req, res) => {
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

exports.adminUpdateWeather = (req, res) => {
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

