import express from "express";
import db from "../config/db.js";
import { verifyToken, verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// GET current logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, first_name, last_name, email, role FROM users WHERE id = ?",
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// DELETE current logged-in user
router.delete("/me", verifyToken, async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.user.id]);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
});

// ADMIN - DELETE user by ID
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// ADMIN - UPDATE user by ID
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { first_name, last_name, email, role } = req.body;
  const { id } = req.params;

  if (!first_name || !last_name || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?",
      [first_name, last_name, email, role, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
});

// GET all users (ADMIN ONLY)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id, 
        CONCAT(first_name, ' ', last_name) AS username, 
        email, 
        role, 
        created_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
