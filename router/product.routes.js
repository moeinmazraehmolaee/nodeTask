const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const checkPermission = require("../middlewares/checkPermission");


// Create product
router.post(
  "/",
  checkPermission("Product", "Create"),
  productController.createProduct
);

// Get all products 
router.get("/", productController.getAllProducts);

//  Get single product
router.get("/:id", productController.getProductById);

// Update product
router.put(
  "/:id",
  checkPermission("Product", "Edit"),
  productController.updateProduct
);

//  Delete product
router.delete(
  "/:id",
  checkPermission("Product", "Edit"),
  productController.deleteProduct
);

module.exports = router;
