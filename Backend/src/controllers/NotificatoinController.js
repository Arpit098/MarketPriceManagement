const db = require("../config/db");

// Create New Notification
exports.createNotification = (req, res) => {
  const {
    date,
    email,
    consultant_id,
    category,
    subject,
    useful_for,
    links,
    title,
    description,
  } = req.body;

  // Validate the required fields
  if (
    !date ||
    !email ||
    !consultant_id ||
    !category ||
    !subject ||
    !useful_for ||
    !links ||
    !title ||
    !description
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // SQL query to insert the notification with a default status of 'Pending'
  const sql = `
    INSERT INTO notifications 
    (date, email, consultant_id, category, subject, useful_for, links, title, description, status, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

  db.query(
    sql,
    [
      date,
      email,
      consultant_id,
      category,
      subject,
      useful_for,
      links,
      title,
      description,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating notification", err });
      }
      res.status(201).json({
        message: "Notification created successfully, awaiting admin review.",
        notificationId: result.insertId,
      });
    }
  );
};

// Get All Notifications
exports.getNotifications = (req, res) => {
  const sql = "SELECT * FROM notifications";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching notifications", err });
    }
    res.status(200).json(results);
  });
};
exports.getApprovedNotifications = (req, res) => {
  const sql = "SELECT * FROM notifications WHERE status = 'Approved'";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching notifications", err });
    }
    res.status(200).json(results);
  });
};
// Get Notifications By Status
exports.getNotificationsByStatus = (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ message: "Status is required to fetch notifications." });
  }

  const sql = "SELECT * FROM notifications WHERE LOWER(status) = LOWER(?)";
  db.query(sql, [status], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching notifications", err });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `No notifications found with status: ${status}` });
    }
    res.status(200).json(results);
  });
};

// Get Notification By ID
exports.getNotificationByConsultantId = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Notification ID is required." });
  }

  const sql = "SELECT * FROM notifications WHERE consultant_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching notification", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(result);
  });
};

// Get Notifications By Creator's Email
exports.getNotificationsByEmail = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to fetch notifications." });
  }

  const sql = "SELECT * FROM notifications WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching notifications", err });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for the provided email." });
    }
    res.status(200).json(results);
  });
};

// Update Notification Status
exports.updateNotificationStatus = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Notification ID and status are required." });
  }

  const sql =
    "UPDATE notifications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating notification status", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    const message =
      status === "Rejected"
        ? "Notification rejected successfully"
        : "Notification approved successfully";
    res.status(200).json({ message });
  });
};

// Update a Notification
exports.updateNotification = (req, res) => {
  const {
    id,
    date,
    email,
    consultant_id,
    category,
    subject,
    useful_for,
    links,
    title,
    description
  } = req.body;

  if (!id || !email) {
    return res
      .status(400)
      .json({ message: "Notification ID and email are required." });
  }

  const sql = `
    UPDATE notifications 
    SET date = COALESCE(?, date),
        consultant_id = COALESCE(?, consultant_id),
        category = COALESCE(?, category),
        subject = COALESCE(?, subject),
        useful_for = COALESCE(?, useful_for),
        links = COALESCE(?, links),
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND email = ?`;

  db.query(
    sql,
    [
      date,
      consultant_id,
      category,
      subject,
      useful_for,
      links,
      title,
      description,
      id,
      email,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating notification", err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Notification not found or unauthorized" });
      }
      res.status(200).json({ message: "Notification updated successfully" });
    }
  );
};

// Delete a Notification
exports.deleteNotification = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Notification ID is required." });
  }

  const sql = "DELETE FROM notifications WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting notification", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  });
};
