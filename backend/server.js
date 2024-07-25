// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db",
    connectionLimit: 20
});

// Endpoint to insert user data into the database
app.post('/db', (req, res) => {
    const { Name, Email, Phone, City, Pincode, UserName, Password } = req.body;
    const sql = `INSERT INTO cust (Name, Email, Phone, City, Pincode, UserName, Password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const sql6 = `UPDATE cust SET loggedin = TRUE WHERE UserName = ?`;
    const values = [Name, Email, Phone, City, Pincode, UserName, Password];
    const values1 = [UserName];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("User inserted successfully");

    pool.query(sql6, values1, (err, result2) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log("Login Updated");
        return res.json({ message: "Login Updated" });
    });
});
});

app.post('/update', (req, res) => {
    const { UserName, Name, Email, Phone, City, Pincode } = req.body;
    const sql10 = `call UpdateCustomerInformation(?,?,?,?,?,?)`;
    const values = [UserName, Name, Email, Phone, City, Pincode];

    pool.query(sql10, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Profile Updated ");
        return res.json({ message: "Profile Updated" });
    });
});
app.post('/deleteorder', (req, res) => {
    const { Orders1 } = req.body;
    const sql14 = `call DeleteOrder(?)`;
    const values = [Orders1];

    pool.query(sql14, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Order Completed ");
        return res.json({ message: "Order Completed" });
    });
});
app.post('/addproduct', (req, res) => {
    const { Name, Price, Quantity } = req.body;
    const sql11 = `INSERT INTO Product (Name, Price, Quantity) VALUES (?, ?, ?)`;
    const values = [Name, Price, Quantity];

    pool.query(sql11, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Product Added");
        return res.json({ message: "Product Added" });
    });
});

app.post('/login', (req, res) => {
    const { UserName, Password } = req.body;
    const sql5 = `UPDATE cust SET loggedin = TRUE WHERE UserName = ? AND Password= ? `;
    const values = [UserName, Password];

    pool.query(sql5, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("logged in");
        return res.json({ message: "logged in" });
    });
});

app.get('/orders', (req, res) => {
    const sql13 = `SELECT * FROM ordersdisplay`;

    pool.query(sql13, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Orders fetched successfully");
        return res.json(result);
    });
});

app.post('/sellersignout', (req, res) => {
    const sql12 = `UPDATE employee SET sellerloggedin = FALSE`;


    pool.query(sql12,(err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("User Signed Out");
        return res.json({ message: "User Signed Out" });
    });
});


app.post('/sellerlogin', (req, res) => {
    const { UserName, Password } = req.body;
    const sql8 = `UPDATE employee SET sellerloggedin = TRUE WHERE UserName = ? AND Password= ? `;
    const values = [UserName, Password];
    pool.query(sql8, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("seller logged in");
        return res.json({ message: "seller logged in" });
    });
});

// Endpoint to fetch products from the database
app.get('/products', (req, res) => {
    const sql = `SELECT * FROM Product`;

    pool.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Products fetched successfully");
        return res.json(result);
    });
});

app.post('/orderdetails', (req, res) => {
    const selectedProducts = req.body;

    // Check if selectedProducts is not undefined and is an array
    if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty selected products data' });
    }

    // Insert selected products into the orderdetails table
    const sql1 = `INSERT INTO orderdetails (ProductID, Name, ItemPrice, OrderQuantity, TotalPrice) VALUES (?, ?, ?, ?, ?)`;

    selectedProducts.forEach(product => {
        const { ProductID, Name, ItemPrice, OrderQuantity, TotalPrice } = product;
        const values = [ProductID, Name, ItemPrice, OrderQuantity, TotalPrice];

        pool.query(sql1, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log("Product added to orderdetails:", product);
        });
    });

    return res.json({ message: "Products added to cart successfully" });
});

app.post('/username', (req, res) => {
    const { Username } = req.body;
    const sql2 = `UPDATE orderdetails SET Username = ?`;
    const sql3 = `INSERT INTO allorders SELECT * FROM orderdetails`;
    const sql4 = `DELETE FROM orderdetails`;
    const sql7 = `UPDATE cust SET loggedin = FALSE WHERE UserName = ?`;
    const values = [Username];

    pool.query(sql2, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Username inserted successfully",req.body);
        
    pool.query(sql3, (err1, result1) => {
        if (err) {
            console.error(err1);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Inserted into allorders table",req.body);
        
    pool.query(sql4, (err2, result2) => {
        if (err) {
            console.error(err2);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Cleared orderdetails table",req.body);
    pool.query(sql7, values, (err2, result3) => {
            if (err) {
                console.error(err2);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log("Cleared orderdetails table",req.body);
        return res.json({ message: "All queries done" });
    });
});
    });
});
});


// Define the port to listen on
const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
