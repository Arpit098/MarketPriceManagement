const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articlesController");

// Get all articles (Admin Only)
router.get("/", articlesController.getArticles);
router.get("/approved", articlesController.getApprovedArticles);

// Get a specific article by ID
router.get("/consultant/:id", articlesController.getArticleByConsultantId);
router.get("/:id", articlesController.getArticleById);

// Get articles based on status (Admin/Consultant)
router.post("/by-status", articlesController.getArticlesByStatus);

// Get articles by author (Consultant Only)
router.post("/by-author", articlesController.getArticlesByAuthor);

// Create a new article (Consultant Only)
router.post("/", articlesController.createArticle);

// Update article status (Admin approval/rejection)
router.put("/update-status", articlesController.updateArticleStatus);

// Update an article (Consultant can update their own article before review)
router.put("/update", articlesController.updateArticle);

// Delete an article (Consultant can delete before review, Admin can delete rejected articles)
router.delete("/:id", articlesController.deleteArticle);

module.exports = router;
