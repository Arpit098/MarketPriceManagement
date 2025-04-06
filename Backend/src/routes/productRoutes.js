const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  getProductByDate,
  getProductByCity,
  updateProduct,
  updateMultipleProducts,
  deleteProduct,
  downloadProductData,
  adminBulkUpdateProducts,
  getPriceHistory,
  adminEditProduct
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.post("/downloadImage", downloadProductData );
router.post("/city", getProductByCity);
router.post("/price-history", getPriceHistory);
router.put("/adminEdit/:id", adminEditProduct)
router.get("/product-price-history/date", getProductByDate);
router.post("/bulkUpdate", updateMultipleProducts);
router.post("/adminbulkUpdate",adminBulkUpdateProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
