import db from "../config/db.js";

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

    // Check if booking exists
    const [bookingRows] = await db.query(
      "SELECT * FROM bookings WHERE id = ? AND booking_code = ?",
      [booking_id, booking_code]
    );

    if (bookingRows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = bookingRows[0];

    // Insert passenger 
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
        birthday || null,
        nationality
      ]
    );

    // Update passengers_count in bookings
    await db.query(
      "UPDATE bookings SET passengers_count = passengers_count + 1 WHERE id = ?",
      [booking_id]
    );

    res.json({ message: "Passenger added successfully", passengerId: result.insertId, booking_id });
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

    if (birthday) {
      birthday = new Date(birthday).toISOString().split("T")[0];
    }

    const [existing] = await db.query(
      "SELECT id FROM passengers WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    const query = `
      UPDATE passengers
      SET 
        first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?,
        passport_number = ?,
        birthday = ?,
        nationality = ?
      WHERE id = ?
    `;

    await db.query(query, [
      first_name,
      last_name,
      email,
      phone,
      passport_number,
      birthday || null, // YYYY-MM-DD
      nationality,
      id
    ]);

    res.json({ message: "Passenger updated successfully" });
  } catch (error) {
    console.error("Update passenger error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
