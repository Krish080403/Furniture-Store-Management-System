import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import End from './end';
import Login from './Login';
import Products from './ProductsPage'; 
import Sellerlogin from './sellerlogin';
import Emphome from './emphome';
import Update from './update';
import Addproduct from './addproduct';
import Orders from './orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<Update />} />
        <Route path="/products/:username" element={<Products />} />
        <Route path="/end" element={<End />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/sellerlogin" element={<Sellerlogin />} />
        <Route path="/emphome/:username" element={<Emphome />} /> 
      </Routes>
    </Router>
  );
}

export default App;
