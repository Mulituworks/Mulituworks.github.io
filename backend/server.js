const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

// 🔌 MySQL connection
const db = mysql.createConnection({
  host: "localhost",       // or your Render DB host
  user: "root",            // or your DB username
  password: "",            // or your DB password
  database: "mulitu"
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

