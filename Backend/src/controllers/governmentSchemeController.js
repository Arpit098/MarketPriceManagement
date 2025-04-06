const db = require("../config/db");

// Create New Government Scheme
exports.createGovernmentScheme = (req, res) => {
  const {
    date,
    unique_id,
    consultant_id,
    email,
    scheme_image,
    scheme_name,
    sponsored_by,
    department,
    category,
    subject,
    useful_for,
    government_scheme_description,
    purpose,
    eligibility_criteria,
    documents_required,
    terms_conditions,
    apply_at,
    download_form,
    website,
  } = req.body;

  // Validate required fields
  if (
    !date ||
    !unique_id ||
    !consultant_id ||
    !email ||
    !scheme_image ||
    !scheme_name ||
    !sponsored_by ||
    !department ||
    !category ||
    !subject ||
    !useful_for ||
    !government_scheme_description ||
    !purpose ||
    !eligibility_criteria ||
    !documents_required ||
    !terms_conditions ||
    !apply_at ||
    !download_form ||
    !website
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO government_schemes 
    (date, unique_id, consultant_id, email, scheme_image, scheme_name, sponsored_by, department, category, subject, useful_for, government_scheme_description, purpose, eligibility_criteria, documents_required, terms_conditions, apply_at, download_form, website, status, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  db.query(
    sql,
    [
      date,
      unique_id,
      consultant_id,
      email,
      scheme_image,
      scheme_name,
      sponsored_by,
      department,
      category,
      subject,
      useful_for,
      government_scheme_description,
      purpose,
      eligibility_criteria,
      documents_required,
      terms_conditions,
      apply_at,
      download_form,
      website,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating government scheme", err });
      }
      res.status(201).json({
        message:
          "Government Scheme created successfully, awaiting admin review.",
        schemeId: result.insertId,
      });
    }
  );
};

// Get All Government Schemes
exports.getGovernmentSchemes = (req, res) => {
  const sql = "SELECT * FROM government_schemes";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching government schemes", err });
    }
    res.status(200).json(results);
  });
};
exports.getApprovedSchemes = (req, res) => {
  const sql = "SELECT * FROM government_schemes WHERE status = 'Approved'";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching government schemes", err });
    }
    res.status(200).json(results);
  });
};

// Get Government Schemes by Consultant ID
exports.getGovernmentSchemesByConsultant = (req, res) => {
  const { consultant_id } = req.body;

  if (!consultant_id) {
    return res.status(400).json({ message: "Consultant ID is required." });
  }

  const sql = "SELECT * FROM government_schemes WHERE consultant_id = ?";
  db.query(sql, [consultant_id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching government schemes", err });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({
          message: `No government schemes found for consultant ID: ${consultant_id}`,
        });
    }
    res.status(200).json(results);
  });
};

// Get Government Scheme by ID
exports.getGovernmentSchemeByConsutantId = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Consultant ID is required." });
  }

  const sql = "SELECT * FROM government_schemes WHERE consultant_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching government scheme", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "No government schemes found ." });
    }
    res.status(200).json(result);
  });
};

// Update Government Scheme Status
exports.updateGovernmentSchemeStatus = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Government Scheme ID and status are required." });
  }

  const sql =
    "UPDATE government_schemes SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return resfound
        .status(500)
        .json({ message: "Error updating government scheme status", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Government Scheme not found." });
    }
    const message =
      status === "Rejected"
        ? "Government Scheme rejected successfully."
        : "Government Scheme approved successfully.";
    res.status(200).json({ message });
  });
};

// Update a Government Scheme
exports.updateGovernmentScheme = (req, res) => {
  const { id } = req.body;
  const {
    date,
    unique_id,
    consultant_id,
    email,
    scheme_image,
    scheme_name,
    sponsored_by,
    department,
    category,
    subject,
    useful_for,
    government_scheme_description,
    purpose,
    eligibility_criteria,
    documents_required,
    terms_conditions,
    apply_at,
    download_form,
    website,
  } = req.body;

  if (!id || !email) {
    return res
      .status(400)
      .json({ message: "Government Scheme ID and email are required." });
  }

  const sql = `
    UPDATE government_schemes 
    SET date = COALESCE(?, date),
        unique_id = COALESCE(?, unique_id),
        consultant_id = COALESCE(?, consultant_id),
        email = COALESCE(?, email),
        scheme_image = COALESCE(?, scheme_image),
        scheme_name = COALESCE(?, scheme_name),
        sponsored_by = COALESCE(?, sponsored_by),
        department = COALESCE(?, department),
        category = COALESCE(?, category),
        subject = COALESCE(?, subject),
        useful_for = COALESCE(?, useful_for),
        government_scheme_description = COALESCE(?, government_scheme_description),
        purpose = COALESCE(?, purpose),
        eligibility_criteria = COALESCE(?, eligibility_criteria),
        documents_required = COALESCE(?, documents_required),
        terms_conditions = COALESCE(?, terms_conditions),
        apply_at = COALESCE(?, apply_at),
        download_form = COALESCE(?, download_form),
        website = COALESCE(?, website),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND email = ?
  `;

  db.query(
    sql,
    [
      date,
      unique_id,
      consultant_id,
      email,
      scheme_image,
      scheme_name,
      sponsored_by,
      department,
      category,
      subject,
      useful_for,
      government_scheme_description,
      purpose,
      eligibility_criteria,
      documents_required,
      terms_conditions,
      apply_at,
      download_form,
      website,
      id,
      email,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating government scheme", err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Government Scheme not found or unauthorized." });
      }
      res
        .status(200)
        .json({ message: "Government Scheme updated successfully." });
    }
  );
};

// Delete a Government Scheme
exports.deleteGovernmentScheme = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Government Scheme ID is required." });
  }

  const sql = "DELETE FROM government_schemes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting government scheme", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Government Scheme not found." });
    }
    res
      .status(200)
      .json({ message: "Government Scheme deleted successfully." });
  });
};
