require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

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

// **Handle Registration Form Submission**
app.post("/submit-signup", (req, res) => {
    const { fullName, email, studentID, course, password } = req.body;

    if (!fullName || !email || !studentID || !course || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO students (fullName, email, studentID, course, password) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [fullName, email, studentID, course, password], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Registration successful" });
    });
});

// **Start the Server**
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
