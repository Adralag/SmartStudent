require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// **Connect to MySQL Database**
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

db.query('USE smartstudent', (err) => {
    if (err) {
        console.error('Error selecting database:', err);
    } else {
        console.log('Database selected successfully');
    }
});

// **Handle Registration Form Submission**
app.post("/submit-signup", (req, res) => {
    const { fullName, email, studentID, course, password } = req.body;

    if (!fullName || !email || !studentID || !course || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO users (name, email, student_ID, course_of_study, password_hash) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [fullName, email, studentID, course, password], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Registration successful" });
    });
});

// **Handle Login Request**
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];
        res.status(200).json({ user });
    });
});

// **Start the Server**
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
