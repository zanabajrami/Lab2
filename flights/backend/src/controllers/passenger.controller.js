import db from "../config/db.js";

const sanitizeDate = (date) => {
    if (!date) return null;
    return date.slice(0, 10); // YYYY-MM-DD
};

// CREATE PASSENGER
export const createPassenger = async (req, res) => {
    try {
        const {
            booking_code,
            booking_id,
            first_name,
            last_name,
            email,
            phone,
            passport_number,
            birthday,
            nationality
        } = req.body;

        if (!booking_code || !booking_id) {
            return res.status(400).json({ message: "Booking code and booking_id are required" });
        }

        const [bookingRows] = await db.query(
            "SELECT * FROM bookings WHERE id = ? AND booking_code = ?",
            [booking_id, booking_code]
        );

        if (bookingRows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const birthdayFormatted = sanitizeDate(birthday);

        const [result] = await db.query(
            `INSERT INTO passengers
       (booking_id, booking_code, first_name, last_name, email, phone, passport_number, birthday, nationality)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                booking_id,
                booking_code,
                first_name,
                last_name,
                email,
                phone,
                passport_number,
                birthdayFormatted,
                nationality
            ]
        );

        await db.query(
            "UPDATE bookings SET passengers_count = passengers_count + 1 WHERE id = ?",
            [booking_id]
        );

        res.json({
            message: "Passenger added successfully",
            passengerId: result.insertId,
            booking_id
        });
    } catch (error) {
        console.error("Add passenger error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE PASSENGER
export const updatePassenger = async (req, res) => {
    try {
        const { id } = req.params;

        let {
            first_name,
            last_name,
            email,
            phone,
            passport_number,
            birthday,
            nationality
        } = req.body;

        birthday = sanitizeDate(birthday);

        const [existingRows] = await db.query(
            "SELECT * FROM passengers WHERE id = ?",
            [id]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({ message: "Passenger not found" });
        }

        const existingPassenger = existingRows[0];

        // Lock fields if linked to user
        if (existingPassenger.user_id) {
            first_name = existingPassenger.first_name;
            last_name = existingPassenger.last_name;
            email = existingPassenger.email;
            birthday = existingPassenger.birthday;
        }

        await db.query(
            `UPDATE passengers
       SET first_name = ?, last_name = ?, email = ?, phone = ?, passport_number = ?, birthday = ?, nationality = ?
       WHERE id = ?`,
            [
                first_name,
                last_name,
                email,
                phone,
                passport_number,
                birthday,
                nationality,
                id
            ]
        );

        res.json({ message: "Passenger updated successfully" });
    } catch (error) {
        console.error("Update passenger error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE PASSENGER
export const deletePassenger = async (req, res) => {
    try {
        const { id } = req.params;

        // kontrollo a ekziston passenger
        const [rows] = await db.query(
            "SELECT booking_id FROM passengers WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Passenger not found" });
        }

        const booking_id = rows[0].booking_id;

        await db.query(
            "DELETE FROM passengers WHERE id = ?",
            [id]
        );

        // Update passengers_count
        await db.query(
            `UPDATE bookings 
             SET passengers_count = IF(passengers_count > 0, passengers_count - 1, 0)
             WHERE id = ?`,
            [booking_id]
        );

        res.json({ message: "Passenger deleted successfully" });
    } catch (error) {
        console.error("Delete passenger error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
