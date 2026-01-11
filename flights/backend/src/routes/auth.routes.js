import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * CREATE USER (ADMIN ONLY)
 */
router.post("/register", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      gender,
      birthday
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users 
      (first_name, last_name, email, password, role, gender, birthday)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        role || "user",
        gender || null,
        birthday || null
      ]
    );

    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.post("/login", login);

export default router;
