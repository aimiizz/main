const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const mysql = require('mysql');

const app = express();
const port = 3000; // You can change this to your desired port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.applicationDefault() // Use service account or applicationDefault
});

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username', // Replace with your MySQL username
  password: 'your_password', // Replace with your MySQL password
  database: 'your_database' // Replace with your MySQL database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API routes
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  admin.auth().createUser({ email, password })
    .then(userRecord => {
      const userId = userRecord.uid;
      db.query('INSERT INTO users (id, email) VALUES (?, ?)', [userId, email], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ uid: userId, email });
      });
    })
    .catch(error => res.status(400).send(error));
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  admin.auth().getUserByEmail(email)
    .then(userRecord => {
      // Password validation logic goes here (optional)
      res.status(200).send({ uid: userRecord.uid, email });
    })
    .catch(error => res.status(404).send(error));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
