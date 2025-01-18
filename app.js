const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Routes
app.get('/', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hash], (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.send('User not found');
        bcrypt.compare(password, results[0].password, (err, match) => {
            if (match) res.send('Logged in!');
            else res.send('Wrong password');
        });
    });
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));