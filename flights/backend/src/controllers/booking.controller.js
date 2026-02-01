import db from "../config/db.js";

// Gjeneron booking code unik
const generateBookingCode = () => {
    return "BK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// CREATE BOOKING
export const createBooking = async (req, res) => {
    const connection = await db.getConnection();

    try {
        const { userId, flightId, departureDate, returnDate, passengers } = req.body;

        // Validime bazë
        if (!userId || !flightId || !departureDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!Array.isArray(passengers) || passengers.length === 0) {
            return res.status(400).json({ message: "Passengers must be an array" });
        }

        // Kontrollo nëse flight ekziston
        const [[flight]] = await connection.query(
            "SELECT id, price FROM flights WHERE id = ?",
            [flightId]
        );

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        // Llogarit total price
        const passengersCount = passengers.length;
        const totalPrice = flight.price * passengersCount;
        const bookingCode = generateBookingCode();

        // START TRANSACTION
        await connection.beginTransaction();

        // INSERT në bookings
        const [bookingResult] = await connection.query(
            `INSERT INTO bookings 
       (booking_code, user_id, flight_id, departure_date, return_date, passengers_count, total_price, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [
                bookingCode,
                userId,
                flightId,
                departureDate,
                returnDate || null,
                passengersCount,
                totalPrice
            ]
        );

        const bookingId = bookingResult.insertId;

        // INSERT për secilin passenger
        for (const p of passengers) {
            await connection.query(
                `INSERT INTO passengers 
         (booking_id, first_name, last_name, email, phone, passport_number, dob, nationality)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    bookingId,
                    p.firstName,
                    p.lastName,
                    p.email,
                    p.phone,
                    p.passportNumber,
                    p.dob,
                    p.nationality
                ]
            );
        }

        await connection.commit();

        res.status(201).json({
            message: "Booking created successfully",
            bookingId,
            bookingCode,
            totalPrice
        });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        connection.release();
    }
};

// READ ALL
export const getBookings = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM bookings ORDER BY created_at DESC");
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

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
    await db.query(
        "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
        [req.params.id]
    );

    res.json({ message: "Booking cancelled" });
};
