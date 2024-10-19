const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET /api/getproducts/:id - Fetch a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);  // Fetch product by ID
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

module.exports = router;
