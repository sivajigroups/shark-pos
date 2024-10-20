// src/AddInventory.js
import React, { useState } from 'react';
import { TextField, Button, IconButton, Box, Typography, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInventory = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        sku: '',
        modelNumber: '',
        supplier: '',
        warranty: '',
        variants: [{ weight: '', price: '', stock: '' }],
    });

    const [errors, setErrors] = useState({}); // To track validation errors

    // Handle input change for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle variant changes
    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const newVariants = [...formData.variants];
        newVariants[index] = { ...newVariants[index], [name]: value };
        setFormData({ ...formData, variants: newVariants });
    };

    // Add more variant fields
    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { weight: '', price: '', stock: '' }]
        });
    };

    // Validate fields
    const validateFields = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.brand) tempErrors.brand = "Brand is required";
        if (!formData.category) tempErrors.category = "Category is required";
        if (!formData.sku) tempErrors.sku = "SKU is required";
        if (formData.variants.some(v => !v.weight || !v.price || !v.stock)) {
            tempErrors.variants = "All variant fields (weight, price, stock) are required";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;  // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                await axios.post('http://3.110.165.57/api/createproduct', formData);
                
                // Show success toast
                toast.success('Product added successfully!');

                // Clear form fields
                setFormData({
                    name: '',
                    brand: '',
                    category: '',
                    description: '',
                    sku: '',
                    modelNumber: '',
                    supplier: '',
                    warranty: '',
                    variants: [{ weight: '', price: '', stock: '' }],
                });

            } catch (error) {
                console.error('Error adding product', error);
                toast.error('Failed to add product');
            }
        }
    };

    return (
        <Box sx={{ margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Add New Inventory
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* First Row */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Brand"
                            name="brand"
                            fullWidth
                            value={formData.brand}
                            onChange={handleChange}
                            error={!!errors.brand}
                            helperText={errors.brand}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Category"
                            name="category"
                            fullWidth
                            value={formData.category}
                            onChange={handleChange}
                            error={!!errors.category}
                            helperText={errors.category}
                            required
                        />
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="SKU"
                            name="sku"
                            fullWidth
                            value={formData.sku}
                            onChange={handleChange}
                            error={!!errors.sku}
                            helperText={errors.sku}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Model Number"
                            name="modelNumber"
                            fullWidth
                            value={formData.modelNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Supplier"
                            name="supplier"
                            fullWidth
                            value={formData.supplier}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* Third Row */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Warranty"
                            name="warranty"
                            fullWidth
                            value={formData.warranty}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            multiline
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>

                {/* Variants Section */}
                <Typography variant="h6" gutterBottom sx={{ marginTop: '20px' }}>
                    Variants
                </Typography>
                {formData.variants.map((variant, index) => (
                    <Grid container spacing={2} key={index}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Weight (kg)"
                                name="weight"
                                type="number"
                                fullWidth
                                value={variant.weight}
                                onChange={(e) => handleVariantChange(index, e)}
                                error={!!errors.variants}
                                helperText={errors.variants}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Price"
                                name="price"
                                type="number"
                                fullWidth
                                value={variant.price}
                                onChange={(e) => handleVariantChange(index, e)}
                                error={!!errors.variants}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Stock"
                                name="stock"
                                type="number"
                                fullWidth
                                value={variant.stock}
                                onChange={(e) => handleVariantChange(index, e)}
                                error={!!errors.variants}
                                required
                            />
                        </Grid>
                    </Grid>
                ))}

                <IconButton onClick={addVariant} color="primary" aria-label="add variant" sx={{ marginTop: '10px' }}>
                    <AddCircleIcon />
                </IconButton>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '20px' }}
                >
                    Add Product
                </Button>
            </form>

            {/* Toast notification container */}
            <ToastContainer />
        </Box>
    );
};

export default AddInventory;
