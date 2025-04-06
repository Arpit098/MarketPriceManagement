const express = require("express");
const router = express.Router();
const biddingController = require("../controllers/BiddingsController");

// Subscriber Routes
router.post("/place", biddingController.placeBid); // Place a new bid
router.get("/my-bids", biddingController.getBidsBySubscriber); // Get bids for a specific subscriber by email

// Admin Routes
router.get("/", biddingController.getAllBids); // Get all bids (admin only)
router.get("/:id", biddingController.getBidById); // Get a single bid by ID
router.put("/status", biddingController.updateBidStatus); // Update bid status via request body
router.delete("/:id", biddingController.deleteBid); // Delete a bid (admin only)

module.exports = router;
