const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // password i MySQL
  database: "booking_db",
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected successfully!");
});

module.exports = db;
