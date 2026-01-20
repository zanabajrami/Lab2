import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET Mesazhet e fundit
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 10");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST Mesazh i ri
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "All fields required" });

    try {
        const [result] = await db.query(
            "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
            [name, email, message]
        );

        const [newMsg] = await db.query("SELECT * FROM messages WHERE id = ?", [result.insertId]);
        res.status(201).json(newMsg[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// MARK MESSAGE AS READ
router.patch("/:id/read", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            "UPDATE messages SET is_read = 1 WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Message marked as read" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /api/messages/:id
router.delete("/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM messages WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
