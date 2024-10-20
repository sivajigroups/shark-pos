const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// PUT /api/updateproduct/:id - Update a product by ID
router.put('/:id', async (req, res) => {
    const { name, brand, category, description, sku, modelNumber, supplier, warranty, variants } = req.body;

    try {
        // Find the existing product
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the fields only if they are provided in the request
        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.description = description || product.description;
        product.sku = sku || product.sku;
        product.modelNumber = modelNumber || product.modelNumber;
        product.supplier = supplier || product.supplier;
        product.warranty = warranty || product.warranty;

        // Update variants if provided, otherwise keep existing ones
        if (variants) {
            product.variants = variants;
        }

        // Save the updated product
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

module.exports = router;
