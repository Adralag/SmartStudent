const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smartstudent'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Register route
app.post('/register', (req, res) => {
    const { fullName, email, course, password } = req.body;
    const query = 'INSERT INTO users (name, email, course_of_study, password_hash) VALUES (?, ?, ?, ?)';
    db.query(query, [fullName, email, course, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send({ error: 'Failed to register user' });
            return;
        }
        res.status(201).send({ message: 'User registered successfully' });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            res.status(500).send({ error: 'Failed to login' });
            return;
        }
        if (results.length > 0) {
            res.send({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).send({ error: 'Invalid email or password' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});