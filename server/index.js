const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const CryptoJS = require('crypto-js');

app.use(express.json());
app.use(cors());

// Start the server
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'safeguard'
});

const secretKey = 'your-secret-key'; // Use a strong secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Register endpoint
app.post('/register', (req, res) => {
  const { email, password, userName } = req.body;

  const encryptedPassword = encryptData(password);
  console.log('Encrypted Password:', encryptedPassword);  // Log encrypted password

  const SQL = 'INSERT INTO Users (email, username, password) VALUES (?, ?, ?)';
  const VALUES = [email, userName, encryptedPassword];

  db.query(SQL, VALUES, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log('User inserted successfully');
      res.send({ message: 'User Added' });
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { LoginUserName, LoginPassword } = req.body;

  const SQL = 'SELECT * FROM Users WHERE username = ?';
  const VALUES = [LoginUserName];

  db.query(SQL, VALUES, (err, result) => {
    if (err) {
      res.send({ error: err });
    } else if (result.length > 0) {
      const user = result[0];
      const decryptedPassword = decryptData(user.password);
      if (decryptedPassword === LoginPassword) {
        res.send(user);
      } else {
        res.send({ message: "Credentials Don't Match" });
      }
    } else {
      res.send({ message: "Credentials Don't Match" });
    }
  });
});

// Insert password into the database
app.post('/dashboard', (req, res) => {
  const { UserEmail, formUserName, formPassword, company } = req.body;

  const encryptedPassword = encryptData(formPassword);
  console.log('Encrypted Password:', encryptedPassword);  // Log encrypted password

  const SQL = 'INSERT INTO Passwords (email, username, password, company) VALUES (?, ?, ?, ?)';
  const VALUES = [UserEmail, formUserName, encryptedPassword, company];

  db.query(SQL, VALUES, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log('Password inserted successfully');
      res.send({ message: 'Password Added' });
    }
  });
});

// Retrieve passwords from the database
app.get('/dashboard', (req, res) => {
  const SQL = 'SELECT email, username, password, company FROM Passwords';

  db.query(SQL, (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      const decryptedResult = result.map((item) => {
        return {
          email: item.email,
          username: item.username,
          password: decryptData(item.password),
          company: item.company
        };
      });
      res.send(decryptedResult);
    }
  });
});
