const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");

// Get all collections
router.get("/", collectionController.getCollections);

// Add a new collection entry
router.post("/", collectionController.createCollection);

// Get a collection entry by ID
router.get("/:id", collectionController.getCollectionById);

// Update a collection entry
router.put("/:id", collectionController.updateCollection);

// Delete a collection entry
router.delete("/:id", collectionController.deleteCollection);

module.exports = router;
