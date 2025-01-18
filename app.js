const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quiz_website",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

// Routes

// User Registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error registering user." });
        } else {
            res.status(201).json({ message: "User registered successfully." });
        }
    });
});

// User Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error logging in." });
        } else if (results.length === 0) {
            res.status(401).json({ error: "Invalid username or password." });
        } else {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.status(200).json({ message: "Login successful." });
            } else {
                res.status(401).json({ error: "Invalid username or password." });
            }
        }
    });
});

// Fetch Quiz Questions
app.get("/quiz", (req, res) => {
    const query = "SELECT * FROM questions";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error fetching quiz questions." });
        } else {
            res.status(200).json(results);
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});