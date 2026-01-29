import db from "../config/db.js";

// CREATE
export const createBooking = async (req, res) => {
    try {
        const {
            flightId,
            departureDate,
            returnDate,
            passengers,
            totalPrice
        } = req.body;

        // VALIDIM
        if (!Array.isArray(passengers) || passengers.length === 0) {
            return res.status(400).json({
                message: "Passengers must be an array"
            });
        }

        // 1️⃣ Insert booking
        const [booking] = await db.query(
            `INSERT INTO bookings 
       (flight_id, departure_date, return_date, total_price, status)
       VALUES (?, ?, ?, ?, 'pending')`,
            [flightId, departureDate, returnDate, totalPrice]
        );

        // 2️⃣ Insert passengers
        for (const p of passengers) {
            await db.query(
                "INSERT INTO passengers SET ?",
                {
                    booking_id: booking.insertId,
                    first_name: p.firstName,
                    last_name: p.lastName,
                    email: p.email,
                    phone: p.phone,
                    passport_number: p.passportNumber,
                    dob: p.dob,
                    nationality: p.nationality
                }
            );
        }

        res.status(201).json({
            message: "Booking created successfully",
            bookingId: booking.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

    //  Kontrollo nëse flight ekziston
    const [[flight]] = await db.query(
        "SELECT id FROM flights WHERE id = ?",
        [flightId]
    );

    if (!flight) {
        return res.status(400).json({ message: "Flight not found in database" });
    }

};

// READ ALL
export const getBookings = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM bookings");
    res.json(rows);
};

// READ ONE
export const getBookingById = async (req, res) => {
    const [rows] = await db.query(
        "SELECT * FROM bookings WHERE id = ?",
        [req.params.id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
    }

    res.json(rows[0]);
};

// CANCEL
export const cancelBooking = async (req, res) => {
    await db.query(
        "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
        [req.params.id]
    );

    res.json({ message: "Booking cancelled" });
};
