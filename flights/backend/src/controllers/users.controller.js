import db from "../config/db.js";
import bcrypt from "bcryptjs";

// GET current logged-in user
export const getCurrentUser = async (req, res) => {
    try {
        const [rows] = await db.query(
            `
      SELECT 
        id,
        first_name,
        last_name,
        email,
        role,
        gender,
        DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday,
        created_at
      FROM users
      WHERE id = ?
      `,
            [req.user.id]
        );

        if (!rows.length)
            return res.status(404).json({ message: "User not found" });

        res.json(rows[0]);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Failed to load profile" });
    }
};

// GET all users (ADMIN ONLY)
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT 
        id, 
        CONCAT(first_name, ' ', last_name) AS username, 
        email, 
        role, 
        gender,
        DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// UPDATE user by ID (ADMIN)
export const updateUser = async (req, res) => {
    const { first_name, last_name, email, role, birthday, gender } = req.body;
    const { id } = req.params;

    if (!first_name || !last_name || !email || !role) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    try {
        // Update users table
        const [result] = await db.query(
            `UPDATE users
       SET first_name = ?, last_name = ?, email = ?, role = ?, birthday = ?, gender = ?
       WHERE id = ?`,
            [first_name, last_name, email, role, birthday || null, gender || null, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "User not found" });

        // Update passengers table (user_id = id)
        await db.query(
            `UPDATE passengers
       SET first_name = ?, last_name = ?, email = ?, birthday = ?
       WHERE user_id = ?`,
            [first_name, last_name, email, birthday || null, id]
        );

        res.json({ message: "User and passenger updated successfully" });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Failed to update user" });
    }
};

//CHANGE PASSWORD
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    try {
        // Merr userin nga MySQL
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.user.id]);

        if (!rows.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        // Kontrollo password-in aktual
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash password i ri
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.user.id]);

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE user by ID (ADMIN)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Kontrollo nëse user ekziston
    const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!userRows.length) return res.status(404).json({ message: "User not found" });

    // Fshi userin nga tabela users
    await db.query("DELETE FROM users WHERE id = ?", [id]);

    res.json({ message: "User and all related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// DELETE current logged-in user
export const deleteCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fshi userin
    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    res.json({ message: "Your account and all related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
