const db = require("../config/db"); // Import database connection

// Allowed tables to prevent SQL injection
const allowedTables = ["source_of_irrigation", "mode_of_irrigation", "sowing_pattern", "crop_pattern"];

// ✅ Create a new entry
exports.createEntry = (req, res) => {
    const { table } = req.params;
    const { name } = req.body;

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: "Invalid table name" });
    }

    const sql = `INSERT INTO ${table} (name) VALUES (?)`;

    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error adding entry", error: err });
        }
        res.json({ message: "Entry added successfully", id: result.insertId });
    });
};

// ✅ Update an existing entry
exports.updateEntry = (req, res) => {
    const { table, id } = req.params;
    const { name } = req.body;

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: "Invalid table name" });
    }

    const sql = `UPDATE ${table} SET name = ? WHERE id = ?`;

    db.query(sql, [name, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error updating entry", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json({ message: "Entry updated successfully" });
    });
};

// ✅ Delete an entry
exports.deleteEntry = (req, res) => {
    const { table, id } = req.params;

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: "Invalid table name" });
    }

    const sql = `DELETE FROM ${table} WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error deleting entry", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json({ message: "Entry deleted successfully" });
    });
};

// ✅ Get all entries
exports.getAllEntries = (req, res) => {
    const { table } = req.params;

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: "Invalid table name" });
    }

    const sql = `SELECT * FROM ${table}`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching entries", error: err });
        }
        res.json(results);
    });
};

// ✅ Get entry by ID
exports.getEntryById = (req, res) => {
    const { table, id } = req.params;

    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: "Invalid table name" });
    }

    const sql = `SELECT * FROM ${table} WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching entry", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json(result[0]);
    });
};
