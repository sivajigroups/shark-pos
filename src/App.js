import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import AddInventory from './AddInventory';
import ProductList from './ProductList';
import EditProduct from './EditProduct';  // Import the new EditProduct component

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <NavBar />
                <div style={{ marginLeft: 0, padding: '20px', width: '100%' }}>
                    <Routes>
                        <Route path="/add-inventory" element={<AddInventory />} />
                        <Route path="/product-list" element={<ProductList />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />  {/* Edit route with parameter */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
