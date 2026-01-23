import db from "../config/db.js"; 

export const createMessage = async (req, res) => {
    const { name, email, message, userId } = req.body;
    const result = await db.query(
        "INSERT INTO messages (name, email, message, user_id) VALUES (?,?,?,?)",
        [name, email, message, userId || null]
    );

    const newMessage = {
        id: result.insertId,
        name,
        email,
        message,
        is_read: 0
    };

    // Emit real-time te admin
    const io = req.app.get("io");
    io.to("admins").emit("receive_message", newMessage);

    res.status(201).json(newMessage);
};

export const replyToUser = async (req, res) => {
    const { messageId, reply } = req.body;

    if (!messageId || !reply) {
        return res.status(400).json({ message: "Missing messageId or reply" });
    }

    try {
        const result = await db.query(
            "UPDATE messages SET reply = ? WHERE id = ?",
            [reply, messageId]
        );
        console.log(result); // për debug

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Reply sent and saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
