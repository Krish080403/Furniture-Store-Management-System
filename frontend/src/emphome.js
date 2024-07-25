import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Emphome() {
    const navigate = useNavigate();
    const { username } = useParams();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/sellersignout')
            .then(res => {
                console.log("Seller Signed out Successfully!");
                navigate(`/sellerlogin`);

            })
            .catch(err => console.log(err));
    }
    const styles = `
        .management-page {
            text-align: center;
            padding: 50px;
        }

        .welcome-msg {
            font-size: 36px;
            margin-bottom: 30px;
        }

        .services {
            margin-top: 50px;
        }

        .services-heading {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .buttons {
            display: flex;
            justify-content: center;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 0 10px;
            font-size: 18px;
            text-decoration: none;
            color: #fff;
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, border-color 0.3s;
        }

        .btn:hover {
            background-color: #0056b3;
            border-color: #0056b3;
        }

        .manage-products-btn {
            background-color: #28a745;
            border-color: #28a745;
        }

        .manage-products-btn:hover {
            background-color: #218838;
            border-color: #218838;
        }

        .manage-orders-btn {
            background-color: #dc3545;
            border-color: #dc3545;
        }

        .manage-orders-btn:hover {
            background-color: #c82333;
            border-color: #c82333;
        }
    `;

    return (
        <div>
            <style>{styles}</style>
            <div className="management-page">
                <h1 style={{ textAlign: 'center', fontFamily: 'Copperplate, Fantasy', marginTop: '30px', marginBottom: '30px' }}>Furniture Store Management System</h1>
                <h2 className="welcome-msg">Welcome, {username}</h2>
                <div className="services">
                    <h2 className="services-heading">Services</h2>
                    <div className="buttons">
                        <Link to="/addproduct" className="btn manage-products-btn">Manage Products</Link>
                        <Link to="/orders" className="btn manage-orders-btn">Manage Orders</Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.2rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Out</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Emphome;
