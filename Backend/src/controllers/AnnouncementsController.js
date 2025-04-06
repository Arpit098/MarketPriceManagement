const db = require("../config/db");

// Create New Announcement
exports.createAnnouncement = (req, res) => {
  const {
    date,
    email,
    name_of_consultant,
    category,
    subject,
    useful_for,
    announcements,
    title,
    description,
    status,
  } = req.body;

  // Validate the required fields
  if (
    !date ||
    !email ||
    !name_of_consultant ||
    !category ||
    !subject ||
    !useful_for ||
    !announcements ||
    !title ||
    !description ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // SQL query to insert the announcement with a default status
  const sql = `
    INSERT INTO announcements
    (date, email, name_of_consultant, category, subject, useful_for, announcements, title, description, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  db.query(
    sql,
    [
      date,
      email,
      name_of_consultant,
      category,
      subject,
      useful_for,
      announcements,
      title,
      description,
      status,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating announcement", err });
      }
      res.status(201).json({
        message: "Announcement created successfully",
        announcementId: result.insertId,
      });
    }
  );
};

// Get All Announcements
exports.getAnnouncements = (req, res) => {
  const sql = "SELECT * FROM announcements";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching announcements", err });
    }
    res.status(200).json(results);
  });
};

// Get Announcements By Status
exports.getAnnouncementsByStatus = (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ message: "Status is required to fetch announcements." });
  }

  const sql = "SELECT * FROM announcements WHERE LOWER(status) = LOWER(?)";
  db.query(sql, [status], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching announcements", err });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `No announcements found with status: ${status}` });
    }
    res.status(200).json(results);
  });
};

// Get Announcement By ID
exports.getAnnouncementById = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Announcement ID is required." });
  }

  const sql = "SELECT * FROM announcements WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching announcement", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(result[0]);
  });
};

// Get Announcements By Email
exports.getAnnouncementsByEmail = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to fetch announcements." });
  }

  const sql = "SELECT * FROM announcements WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching announcements", err });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No announcements found for the provided email." });
    }
    res.status(200).json(results);
  });
};

// Update Announcement Status
exports.updateAnnouncementStatus = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Announcement ID and status are required." });
  }

  const sql =
    "UPDATE announcements SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating announcement status", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    const message =
      status === "Rejected"
        ? "Announcement rejected successfully"
        : "Announcement approved successfully";
    res.status(200).json({ message });
  });
};

// Update an Announcement
exports.updateAnnouncement = (req, res) => {
  const {
    id,
    date,
    email,
    name_of_consultant,
    category,
    subject,
    useful_for,
    announcements,
    title,
    description,
    status,
  } = req.body;

  if (!id || !email) {
    return res
      .status(400)
      .json({ message: "Announcement ID and email are required." });
  }

  const sql = `
    UPDATE announcements 
    SET date = COALESCE(?, date),
        email = COALESCE(?, email),
        name_of_consultant = COALESCE(?, name_of_consultant),
        category = COALESCE(?, category),
        subject = COALESCE(?, subject),
        useful_for = COALESCE(?, useful_for),
        announcements = COALESCE(?, announcements),
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND email = ?
  `;

  db.query(
    sql,
    [
      date,
      email,
      name_of_consultant,
      category,
      subject,
      useful_for,
      announcements,
      title,
      description,
      status,
      id,
      email,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating announcement", err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Announcement not found or unauthorized" });
      }
      res.status(200).json({ message: "Announcement updated successfully" });
    }
  );
};

// Delete an Announcement
exports.deleteAnnouncement = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Announcement ID is required." });
  }

  const sql = "DELETE FROM announcements WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting announcement", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  });
};
