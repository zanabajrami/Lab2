import express from "express";
import db from "../db.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET all users (ADMIN ONLY)
router.get("/", verifyToken, verifyAdmin, (req, res) => {
  const q = `
    SELECT id, username, email, role, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
});

// DELETE user (ADMIN ONLY)
router.delete("/:id", verifyToken, verifyAdmin, (req, res) => {
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
});

export default router;
