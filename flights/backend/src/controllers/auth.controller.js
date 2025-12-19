import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.mongo.js";
import {
  ACCESS_SECRET,
  REFRESH_SECRET,
  ACCESS_EXPIRES,
  REFRESH_EXPIRES
} from "../config/jwt.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, birthday } = req.body;

    // Kontrollimi i input-it
    if (!firstName || !lastName || !email || !password || !gender || !birthday)
      return res.status(400).json({ error: "All fields are required" });

    // Kontroll email unik
    const [exists] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = req.body.role || 'user';
    // Shton user në MySQL
    const [result] = await db.query(
      `INSERT INTO users (role, first_name, last_name, email, password, gender, birthday)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [role, firstName, lastName, email, hashedPassword, gender, birthday]
    );

    res.status(201).json({
      user: {
        id: result.insertId,
        firstName,
        lastName,
        email,
        gender,
        birthday,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!users.length) return res.status(404).json({ error: "User not found" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET,
      { expiresIn: REFRESH_EXPIRES }
    );

    // Ruaje refresh token në MongoDB
    await RefreshToken.create({ userId: user.id, token: refreshToken });

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
