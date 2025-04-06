const db = require("../config/db");

// Place a New Bid
exports.placeBid = (req, res) => {
  const {
    name_of_person,
    email,
    mobile_number,
    market,
    bidding_amount,
    manual_entry,
    bidding_for_month,
    date_of_bidding,
  } = req.body;

  const sql = `INSERT INTO biddings 
    (name_of_person, email, mobile_number, market, bidding_amount, manual_entry, bidding_for_month, date_of_bidding, bidding_status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`;

  db.query(
    sql,
    [
      name_of_person,
      email,
      mobile_number,
      market,
      bidding_amount,
      manual_entry,
      bidding_for_month,
      date_of_bidding,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error placing bid", err });
      res.status(201).json({
        message: "Bid placed successfully",
        bidId: result.insertId,
      });
    }
  );
};

// Get All Bids (Admin Only)
exports.getAllBids = (req, res) => {
  const sql = "SELECT * FROM biddings ORDER BY date_of_bidding DESC";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error fetching bids", err });
    res.status(200).json(results);
  });
};

// Get a Single Bid by ID
exports.getBidById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM biddings WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error fetching bid", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Bid not found" });
    res.status(200).json(result[0]);
  });
};

// Update Bid Status by Email (Admin Only)
exports.updateBidStatus = (req, res) => {
  const { email, id, bidding_status, admin_opinion } = req.body; // Extract email, id, bidding_status, and admin_opinion from the request body

  // Validate input
  if (!email || !id || !bidding_status) {
    return res
      .status(400)
      .json({ message: "Email, ID, and bidding status are required." });
  }

  console.log(
    `Updating bid status for email: ${email}, id: ${id}, status: ${bidding_status}`
  ); // Debugging log
  console.log("Request Body:", req.body); // Additional debugging log to see the full request

  // SQL query to update the bidding status and admin opinion based on email and id
  const sql = `
      UPDATE biddings
      SET bidding_status = ?, admin_opinion = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND email = ?
    `;

  // Log SQL and parameters before executing the query
  console.log("SQL Query being executed: ", sql);
  console.log("Parameters: ", [bidding_status, admin_opinion, id, email]);

  // Execute the query
  db.query(sql, [bidding_status, admin_opinion, id, email], (err, result) => {
    if (err) {
      console.error("Error executing query:", err); // Log the error for debugging
      return res
        .status(500)
        .json({ message: "Error updating bid status", err });
    }

    console.log("Query result:", result); // Debugging log

    // Check if any row was affected
    if (result.affectedRows === 0) {
      console.log("No record updated - possibly incorrect email or id");
      return res
        .status(404)
        .json({ message: "No bid found for the given email and id" });
    }

    res.status(200).json({ message: "Bid status updated successfully" });
  });
};

// Delete a Bid (Admin Only)
exports.deleteBid = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM biddings WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error deleting bid", err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Bid not found" });
    res.status(200).json({ message: "Bid deleted successfully" });
  });
};

exports.getBidsBySubscriber = (req, res) => {
  const { email } = req.body;

  // Validate email query parameter
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to fetch bids." });
  }

  console.log("Email received in query:", email); // Debugging

  const sql =
    "SELECT * FROM biddings WHERE email = ? ORDER BY date_of_bidding DESC";
  db.query(sql, [email], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching bids for subscriber", err });

    // Debugging: Log the results
    console.log("Query results:", results);

    res.status(200).json(results);
  });
};
