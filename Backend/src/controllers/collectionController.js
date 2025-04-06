const db = require("../config/db");

// Create New Collection Entry
exports.createCollection = (req, res) => {
  const {
    title,
    description,
    date,
    name_of_person,
    mobile_number,
    subject,
    purpose,
    image,
    video,
    text,
    beneficial_for,
  } = req.body;

  const sql = `INSERT INTO collection 
    (title, description, date, name_of_person, mobile_number, subject, purpose, image, video, text, beneficial_for) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      title,
      description,
      date,
      name_of_person,
      mobile_number,
      subject,
      purpose,
      image,
      video,
      text,
      beneficial_for,
    ],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating collection entry", err });
      res.status(201).json({
        message: "Collection entry created successfully",
        collectionId: result.insertId,
      });
    }
  );
};

// Get All Collection Entries
exports.getCollections = (req, res) => {
  const sql = "SELECT * FROM collection";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching collections", err });
    res.status(200).json(results);
  });
};

// Get Collection Entry By ID
exports.getCollectionById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM collection WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching collection", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Collection entry not found" });
    res.status(200).json(result[0]);
  });
};

// Update a Collection Entry
exports.updateCollection = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    date,
    name_of_person,
    mobile_number,
    subject,
    purpose,
    image,
    video,
    text,
    beneficial_for,
  } = req.body;

  const sql = `UPDATE collection 
    SET title = ?, description = ?, date = ?, name_of_person = ?, mobile_number = ?, 
        subject = ?, purpose = ?, image = ?, video = ?, text = ?, beneficial_for = ? 
    WHERE id = ?`;

  db.query(
    sql,
    [
      title,
      description,
      date,
      name_of_person,
      mobile_number,
      subject,
      purpose,
      image,
      video,
      text,
      beneficial_for,
      id,
    ],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating collection entry", err });
      res
        .status(200)
        .json({ message: "Collection entry updated successfully" });
    }
  );
};

// Delete a Collection Entry
exports.deleteCollection = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM collection WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting collection entry", err });
    res.status(200).json({ message: "Collection entry deleted successfully" });
  });
};
