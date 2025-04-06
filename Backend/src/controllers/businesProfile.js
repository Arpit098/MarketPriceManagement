const db = require("../config/db");

// Create or Update Business Profile
exports.createOrUpdateBusinessProfile = (req, res) => {
    const {
        userid,
        companyName,
        address,
        cityVillage,
        pinCode,
        district,
        taluka,
        state,
        logo,
        registrationNo,
        slogan,
        specialisation,
        services,
        products
    } = req.body;

    // Check if a business profile exists for the given userid
    const checkSql = "SELECT * FROM business_profiles WHERE userid = ?";
    db.query(checkSql, [userid], (err, result) => {
        if (err) {
            console.error("Error checking business profile:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length > 0) {
            // Business profile exists, so update it
            const updateSql = `
                UPDATE business_profiles 
                SET companyName = ?, address = ?, cityVillage = ?, pinCode = ?, district = ?, 
                    taluka = ?, state = ?, logo = ?, registrationNo = ?, slogan = ?, 
                    specialisation = ?, services = ?, products = ?
                WHERE userid = ?
            `;
            const values = [
                companyName, address, cityVillage, pinCode, district, 
                taluka, state, logo, registrationNo, slogan, 
                specialisation, services, products, userid
            ];

            db.query(updateSql, values, (err, updateResult) => {
                if (err) {
                    console.error("Error updating business profile:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(200).json({ message: "Business profile updated successfully" });
            });

        } else {
            // Business profile does not exist, so create a new one
            const insertSql = `
                INSERT INTO business_profiles (userid, companyName, address, cityVillage, pinCode, district, taluka, state, logo, registrationNo, slogan, specialisation, services, products)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                userid, companyName, address, cityVillage, pinCode, district, 
                taluka, state, logo, registrationNo, slogan, 
                specialisation, services, products
            ];

            db.query(insertSql, values, (err, insertResult) => {
                if (err) {
                    console.error("Error creating business profile:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ message: "Business profile created successfully", id: insertResult.insertId });
            });
        }
    });
};

// Get a business profile by userid
exports.getBusinessProfile = (req, res) => {
    const {id} = req.params;

    const sql = "SELECT * FROM business_profiles WHERE userid = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching business profile:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Business profile not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Delete a business profile
exports.deleteBusinessProfile = (req, res) => {
    const { userid } = req.params;

    const sql = "DELETE FROM business_profiles WHERE userid = ?";
    db.query(sql, [userid], (err, result) => {
        if (err) {
            console.error("Error deleting business profile:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Business profile deleted successfully" });
    });
};
