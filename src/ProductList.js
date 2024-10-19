import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField } from '@mui/material';  // TextField is now imported
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();  // For navigation to edit page

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost/api/getproducts');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Typography variant="h6">Loading products...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Navigate to edit page when a row is clicked
    const handleRowClick = (params) => {
        navigate(`/edit-product/${params.row.id}`);
    };

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rows = filteredProducts.map((product, index) => ({
        id: product._id,  // Use the product ID for routing
        name: product.name,
        brand: product.brand,
        category: product.category,
        sku: product.sku,
        description: product.description,
        variants: product.variants.map(variant => `${variant.weight}kg, $${variant.price}, Stock: ${variant.stock}`).join('; ')
    }));

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'variants', headerName: 'Variants', width: 300 }
    ];

    return (
        <Box sx={{ height: 600, width: '100%', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Product Inventory
            </Typography>

            {/* Search Input */}
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: '20px' }}
            />

            {/* DataGrid Table */}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={handleRowClick}  // Add this for row click navigation
            />
        </Box>
    );
};

export default ProductList;
