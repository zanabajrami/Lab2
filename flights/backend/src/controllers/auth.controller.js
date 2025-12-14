import db from "../config/db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, gender, birthday } = req.body;

  const [exists] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (exists.length > 0) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `INSERT INTO users 
     (first_name, last_name, email, password, gender, birthday)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword, gender, birthday]
  );

  res.json({
    user: {
      id: result.insertId,
      firstName,
      lastName,
      email,
      gender,
      birthday,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (users.length === 0) {
    return res.status(404).json({ error: "User not found. Please sign up." });
  }

  const user = users[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
    },
  });
};