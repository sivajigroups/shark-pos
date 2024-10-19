import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const EditProduct = () => {
    const { id } = useParams();  // Get the product ID from the route
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product details by ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost/api/getproducts/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <Typography variant="h6">Loading product...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Handle variant input changes
    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const newVariants = [...product.variants];
        newVariants[index] = { ...newVariants[index], [name]: value };
        setProduct({
            ...product,
            variants: newVariants
        });
    };

    // Add new variant
    const addVariant = () => {
        setProduct({
            ...product,
            variants: [...product.variants, { weight: '', price: '', stock: '' }]
        });
    };

    // Handle form submission to update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost/api/updateproduct/${id}`, product);

            // Show success toast
            toast.success('Product updated successfully!');
        } catch (err) {
            console.error('Failed to update product', err);
            toast.error('Failed to update product');
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Edit Product
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Brand"
                    name="brand"
                    fullWidth
                    margin="normal"
                    value={product.brand}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Category"
                    name="category"
                    fullWidth
                    margin="normal"
                    value={product.category}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="SKU"
                    name="sku"
                    fullWidth
                    margin="normal"
                    value={product.sku}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Model Number"
                    name="modelNumber"
                    fullWidth
                    margin="normal"
                    value={product.modelNumber}
                    onChange={handleChange}
                />
                <TextField
                    label="Supplier"
                    name="supplier"
                    fullWidth
                    margin="normal"
                    value={product.supplier}
                    onChange={handleChange}
                />
                <TextField
                    label="Warranty"
                    name="warranty"
                    fullWidth
                    margin="normal"
                    value={product.warranty}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    multiline
                    value={product.description}
                    onChange={handleChange}
                />

                {/* Variants Section */}
                <Typography variant="h6" gutterBottom sx={{ marginTop: '20px' }}>
                    Variants
                </Typography>
                {product.variants.map((variant, index) => (
                    <Box key={index} sx={{ marginBottom: '20px' }}>
                        <TextField
                            label="Weight (kg)"
                            name="weight"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={variant.weight}
                            onChange={(e) => handleVariantChange(index, e)}
                            required
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, e)}
                            required
                        />
                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={variant.stock}
                            onChange={(e) => handleVariantChange(index, e)}
                            required
                        />
                    </Box>
                ))}

                <IconButton onClick={addVariant} color="primary" aria-label="add variant">
                    <AddCircleIcon />
                </IconButton>

                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                    Update Product
                </Button>
            </form>

            {/* Toast notification container */}
            <ToastContainer />
        </Box>
    );
};

export default EditProduct;
