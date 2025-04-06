const db = require("../config/db");

// Create or Update Professional Profile
// Create or Update Professional Profile
exports.createOrUpdateProfessionalProfile = (req, res) => {
    const {
        userid,
        company_name,
        mobile_number,
        address,
        city_village,
        pin_code,
        taluka,
        district,
        state,
        qualification,
        experience,
        field_of_expertise,
        website,
        email_id,
        social_media_channels,
        social_media_accounts
    } = req.body;

    // Check if a professional profile exists for the given userid
    const checkSql = "SELECT * FROM professional_profile WHERE userid = ?";
    db.query(checkSql, [userid], (err, result) => {
        if (err) {
            console.error("Error checking professional profile:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length > 0) {
            // Professional profile exists, so update it
            const updateSql = `
                UPDATE professional_profile 
                SET company_name = ?, mobile_number = ?, address = ?, city_village = ?, pin_code = ?, 
                    taluka = ?, district = ?, state = ?, qualification = ?, experience = ?, 
                    field_of_expertise = ?, website = ?, email_id = ?, social_media_channels = ?, 
                    social_media_accounts = ?
                WHERE userid = ?
            `;
            const values = [
                company_name, mobile_number, address, city_village, pin_code, 
                taluka, district, state, qualification, experience, 
                field_of_expertise, website, email_id, social_media_channels, 
                social_media_accounts, userid
            ];

            db.query(updateSql, values, (err, updateResult) => {
                if (err) {
                    console.error("Error updating professional profile:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                // Fetch the updated profile to return it
                db.query(checkSql, [userid], (fetchErr, updatedProfile) => {
                    if (fetchErr) {
                        console.error("Error fetching updated profile:", fetchErr);
                        return res.status(500).json({ error: "Database error" });
                    }
                    res.status(200).json(updatedProfile[0]); // Return the updated profile
                });
            });
        } else {
            // Professional profile does not exist, so create it
            const insertSql = `
                INSERT INTO professional_profile (userid, company_name, mobile_number, address, city_village, pin_code, taluka, district, state, qualification, experience, field_of_expertise, website, email_id, social_media_channels, social_media_accounts)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                userid, company_name, mobile_number, address, city_village, pin_code, 
                taluka, district, state, qualification, experience, 
                field_of_expertise, website, email_id, social_media_channels, 
                social_media_accounts
            ];

            db.query(insertSql, values, (err, insertResult) => {
                if (err) {
                    console.error("Error creating professional profile:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                // Fetch the newly created profile to return it
                db.query(checkSql, [userid], (fetchErr, newProfile) => {
                    if (fetchErr) {
                        console.error("Error fetching new profile:", fetchErr);
                        return res.status(500).json({ error: "Database error" });
                    }
                    res.status(201).json(newProfile[0]); // Return the new profile
                });
            });
        }
    });
};

// Get a professional profile by userid
exports.getProfessionalProfile = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM professional_profile WHERE userid = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching professional profile:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Professional profile not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Delete a professional profile
exports.deleteProfessionalProfile = (req, res) => {
    const { userid } = req.params; // Changed from 'userid' for consistency

    const sql = "DELETE FROM professional_profile WHERE userid = ?";
    db.query(sql, [userid], (err, result) => {
        if (err) {
            console.error("Error deleting professional profile:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Professional profile deleted successfully" });
    });
};