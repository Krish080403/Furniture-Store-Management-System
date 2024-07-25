import React from 'react';

import { useNavigate } from 'react-router-dom';

function End() {
    const navigate = useNavigate();
    const handleSubmit = () => {
       navigate('/');
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <div>
                <h1 style={{ fontSize: '3rem', fontFamily: 'Arial, sans-serif' }}>Thank you for shopping with us!</h1>
                <form onSubmit={handleSubmit}>
                <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.2rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Out</button>
                </form>
            </div>
        </div>
    );
}

export default End;
