import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { login } from "../controllers/auth.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * CREATE USER (ADMIN ONLY)
 */
router.post("/register", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, role)
       VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, role || "user"]
    );

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.post("/login", login);

export default router;
