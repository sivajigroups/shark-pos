const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// PUT /api/updateproduct/:id - Update a product by ID
router.put('/:id', async (req, res) => {
    const { name, brand, category, description, sku, modelNumber, supplier, warranty, variants } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, brand, category, description, sku, modelNumber, supplier, warranty, variants },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

module.exports = router;
