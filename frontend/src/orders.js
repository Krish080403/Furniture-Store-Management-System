import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function OrdersPage() {
    const navigate = useNavigate();
    const [orderMessage, setOrderMessage] = useState('');
    const [Orders1, setOrders1] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get('http://localhost:8081/orders')
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => console.error(err));
    }

    const handleback = () => {
        navigate(`/emphome/${encodeURIComponent("what's next?")}`);
    }

    const handleOrders1 = () => {
        if (!Orders1) {
            alert('Please enter Order ID to CONFIRM');
            return;
        }
        axios.post('http://localhost:8081/deleteorder', { Orders1 })
            .then(res => {
                console.log('Order Satisfied:', Orders1);
                setOrderMessage("Order Satisfied Successfully!");
            })
            .catch(err => console.error('Error completing order:', err));
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Copperplate, Fantasy', marginTop: '30px', marginBottom: '30px' }}>Furniture Store Management System</h1>
            <h2 style={{ marginBottom: '20px' }}>Orders</h2>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '90%' }}>
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>ProductID</th>
                        <th>OrderQuantity</th>
                        <th>TotalPrice</th>
                        <th>UserName</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Customer Phone</th>
                        <th>Customer City</th>
                        <th>Customer Pincode</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.OrderID}>
                            <td>{order.OrderID}</td>
                            <td>{order.ProductID}</td>
                            <td>{order.OrderQuantity}</td>
                            <td>{order.TotalPrice}</td>
                            <td>{order.UserName}</td>
                            <td>{order.CustomerName}</td>
                            <td>{order.CustomerEmail}</td>
                            <td>{order.CustomerPhone}</td>
                            <td>{order.CustomerCity}</td>
                            <td>{order.CustomerPincode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '30px' }}>
                <h3>Enter Order ID to satisfy</h3>
                <input
                    type="text"
                    value={Orders1}
                    onChange={(e) => setOrders1(e.target.value)}
                    placeholder="Enter Order ID"
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button onClick={handleOrders1} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Complete Order</button>
            </div>
            <p>{orderMessage}</p>
            <button onClick={handleback} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go back</button>
        </div>
    );
}

export default OrdersPage;
