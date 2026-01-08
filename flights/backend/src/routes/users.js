import express from "express";
import db from "../config/db.js";
import { verifyToken, verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// GET all users (ADMIN ONLY)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id, 
        CONCAT(first_name, ' ', last_name) AS username, 
        email, 
        role, 
        IFNULL(created_at, NOW()) AS created_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// DELETE user (ADMIN ONLY)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// UPDATE user (ADMIN ONLY)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, role } = req.body;

  if (!first_name || !last_name || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [result] = await db.query(
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?",
    [first_name, last_name, email, role, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User updated successfully" });
});

export default router;
