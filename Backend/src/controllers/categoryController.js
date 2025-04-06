const db = require("../config/db");

// Create New Category

exports.createCategory = (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO categories (category_name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error Creating category", err });
    res.status(201).json({
      message: "Category created successfully",
      categoryId: result.insertId,
    });
  });
};

// Get All category

exports.getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching categories", err });
    res.status(200).json(results);
  });
};

// Get a category by ID
exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error fetching category", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(result[0]);
  });
};

// Update a category
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  // Validate required field
  if (!category_name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  // Get the current category name
  const sqlGetCategory = "SELECT category_name FROM categories WHERE category_id = ?";
  db.query(sqlGetCategory, [id], (err, categoryResult) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching category", err });
    }

    if (categoryResult.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const oldCategoryName = categoryResult[0].category_name;

    // Update the category
    const sqlUpdateCategory = "UPDATE categories SET category_name = ? WHERE category_id = ?";
    db.query(sqlUpdateCategory, [category_name, id], (err, categoryUpdateResult) => {
      if (err) {
        return res.status(500).json({ message: "Error updating category", err });
      }

      if (categoryUpdateResult.affectedRows === 0) {
        return res.status(500).json({
          message: "Failed to update category, no changes made",
        });
      }

      // Update all products with the old category name
      const sqlUpdateProducts = "UPDATE products SET category_name = ? WHERE category_name = ?";
      db.query(sqlUpdateProducts, [category_name, oldCategoryName], (err, productUpdateResult) => {
        if (err) {
          return res.status(500).json({ message: "Error updating products", err });
        }

        res.status(200).json({
          message: "Category updated successfully",
          updatedProducts: productUpdateResult.affectedRows,
        });
      });
    });
  });
};

// Delete a category
exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE categoy_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error deleting category", err });
    res.status(200).json({ message: "Category deleted successfully" });
  });
};
