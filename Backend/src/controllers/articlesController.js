const db = require("../config/db");

// Create an Article
exports.createArticle = (req, res) => {
  const {
    name_of_article,
    beneficial_or_useful_for,
    email,
    consultant_id,
    category,
  } = req.body;

  if (
    !name_of_article ||
    !beneficial_or_useful_for ||
    !email ||
    !consultant_id ||
    !category
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO articles (name_of_article, beneficial_or_useful_for, email, status, date, consultant_id, category) 
    VALUES (?, ?, ?, 'Pending', CURRENT_DATE, ?, ?)`;

  db.query(
    sql,
    [name_of_article, beneficial_or_useful_for, email, consultant_id, category],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating article", err });
      }
      res.status(201).json({
        message: "Article created successfully, awaiting admin review.",
        articleId: result.insertId,
      });
    }
  );
};

// Get All Articles
exports.getArticles = (req, res) => {
  const sql = "SELECT * FROM articles";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching articles", err });
    }
    res.status(200).json(results);
  });
};
exports.getApprovedArticles = (req, res) => {
  const sql = "SELECT * FROM articles WHERE status = 'Approved'";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching articles", err });
    }
    res.status(200).json(results);
  });
};

// Get Articles By Author Email
exports.getArticlesByAuthor = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to fetch articles" });
  }

  const sql = "SELECT * FROM articles WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching articles", err });
    }
    res.status(200).json(results);
  });
};

// Get Article By ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM articles WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching article", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(result[0]);
  });
};
exports.getArticleByConsultantId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM articles WHERE consultant_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching article", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Articles not found" });
    }
    res.status(200).json(result);
  });
};

// Update Article Status (Admin approval/rejection)
exports.updateArticleStatus = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Article ID and status are required." });
  }

  const sql = `
    UPDATE articles 
    SET status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?`;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating article status", err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: status === "Rejected"
        ? "Article rejected successfully"
        : "Article approved and published successfully",
    });
  });
};

// Update an Article (Consultant can update their own article before review)
exports.updateArticle = (req, res) => {
  const {
    id,
    email,
    consultant_id,
    name_of_article,
    beneficial_or_useful_for,
    category,
  } = req.body;

  if (!id || !email || !consultant_id) {
    return res
      .status(400)
      .json({ message: "ID, email, and consultant ID are required." });
  }

  // Check if the article belongs to the consultant
  const checkArticleSql = "SELECT * FROM articles WHERE id = ? AND email = ?";
  db.query(checkArticleSql, [id, email], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error checking article ownership", err });
    }

    if (result.length === 0) {
      return res
        .status(403)
        .json({ message: "You can only update your own articles" });
    }

    let updateSql = `UPDATE articles SET consultant_id = ?, updated_at = CURRENT_TIMESTAMP`;
    const updateParams = [consultant_id];

    if (name_of_article) {
      updateSql += ", name_of_article = ?";
      updateParams.push(name_of_article);
    }

    if (beneficial_or_useful_for) {
      updateSql += ", beneficial_or_useful_for = ?";
      updateParams.push(beneficial_or_useful_for);
    }

    if (category) {
      updateSql += ", category = ?";
      updateParams.push(category);
    }

    updateSql += " WHERE id = ?";
    updateParams.push(id);

    db.query(updateSql, updateParams, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating article", err });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Article updated successfully" });
      } else {
        return res.status(404).json({ message: "Article not found" });
      }
    });
  });
};

// Delete an Article (Only admin can delete an article)
exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM articles WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting article", err });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  });
};

// Get Articles by Status
exports.getArticlesByStatus = (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ message: "Status is required to fetch articles." });
  }

  const sql = "SELECT * FROM articles WHERE LOWER(status) = LOWER(?)";
  db.query(sql, [status], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching articles", err });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `No articles found with status: ${status}` });
    }

    res.status(200).json(results);
  });
};
