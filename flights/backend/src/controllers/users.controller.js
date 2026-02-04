import db from "../config/db.js";

// GET current logged-in user
export const getCurrentUser = async (req, res) => {
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
`);

        if (!rows.length) return res.status(404).json({ message: "User not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Failed to load profile" });
    }
};

// DELETE current logged-in user
export const deleteCurrentUser = async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id = ?", [req.user.id]);
        res.json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error("Error deleting account:", err);
        res.status(500).json({ message: "Failed to delete account" });
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

// DELETE user by ID (ADMIN)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};
