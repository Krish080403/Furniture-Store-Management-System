import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddProduct() {
   
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Name: '',
        Price: '',
        Quantity: ''
    });
    const [addedMessage, setAddedMessage] = useState('');

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/addproduct', values)
            .then(res => {
                console.log("Product added Successfully!");
                setAddedMessage("Product added Successfully!");
                // Reset the form after successful addition
                setValues({ Name: '', Price: '', Quantity: '' });
            })
            .catch(err => console.log(err));
    }
    const handleback = () => {
        navigate(`/emphome/${encodeURIComponent("what's next?")}`);

    }
    return (
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='bg-white p-3 rounded w-50'>
                <h1 style={{ textAlign: 'center', fontFamily: 'Copperplate, Fantasy', marginTop: '90px', marginBottom: '30px' }}>Furniture Store Management System</h1>
                <h3 style={{ marginBottom: '20px' }}>Add Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='Name' className='form-control rounded-0' value={values.Name} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="price"><strong>Price</strong></label>
                        <input type="text" placeholder='Enter Price' name='Price' className='form-control rounded-0' value={values.Price} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="quantity"><strong>Quantity</strong></label>
                        <input type="text" placeholder='Enter Quantity' name='Quantity' className='form-control rounded-0' value={values.Quantity} onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Add Product</button>
                </form>
                <p>{addedMessage}</p>
                <button onClick={handleback}>Go back</button>
            </div>
        </div>
    );
}

export default AddProduct;
