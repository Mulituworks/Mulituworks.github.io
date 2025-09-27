require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,     
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


// 🛠️ Store MulituQR payload
app.post("/api/store", (req, res) => {
  const { binary, zone, role, access } = req.body;
  db.query(
    "INSERT INTO mulitu_codes (binary_code, zone, role, access) VALUES (?, ?, ?, ?)",
    [binary, zone, role, access],
    (err) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).send("Database error");
      }
      res.send("Stored in MySQL");
    }
  );
});

app.listen(3000, () => console.log("Mulitu backend running"));

