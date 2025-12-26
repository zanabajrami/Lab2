import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.mongo.js";
import { ACCESS_SECRET, REFRESH_SECRET, ACCESS_EXPIRES, REFRESH_EXPIRES } from "../config/jwt.js";

// REGISTER
export const register = async (req, res) => {
  const { firstName, lastName, email, password, gender, birthday } = req.body;
  try {
    const [exists] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (role, first_name, last_name, email, password, gender, birthday)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ["user", firstName, lastName, email, hashedPassword, gender, birthday]
    );

    res.status(201).json({
      user: {
        id: result.insertId,
        role: "user",
        firstName,
        lastName,
        email,
        gender,
        birthday,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!users.length) return res.status(404).json({ error: "User not found" });

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

    // save refresh token
    await RefreshToken.create({ userId: user.id, token: refreshToken });

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
