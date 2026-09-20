const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product.controller');

// Route to get all products
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;