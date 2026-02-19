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
        if (!flightId || !departureDate) {
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
                userId || null,
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
   (booking_id, booking_code, user_id, first_name, last_name, email, phone, passport_number, birthday, nationality)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    bookingId,
                    bookingCode,
                    userId || null,
                    p.firstName,
                    p.lastName,
                    p.email,
                    p.phone,
                    p.passportNumber,
                    p.birthday,
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
    try {
        const query = `
    SELECT 
        b.id,
        b.booking_code,
        b.user_id,
        b.flight_id,
        b.departure_date,
        b.return_date,
        b.passengers_count,
        b.total_price,
        b.payment_method,
        b.status,
        b.created_at,
        b.updated_at,

        f.flight_code,
        f.airline,
        f.origin,
        f.from_code,
        f.destination,
        f.to_code
    FROM bookings b
    JOIN flights f ON b.flight_id = f.id
    ORDER BY b.created_at DESC
`;

        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

// READ ONE 
export const getBookingById = async (req, res) => {
    try {
        const query = `
    SELECT 
        b.id,
        b.booking_code,
        b.user_id,
        b.flight_id,
        b.departure_date,
        b.return_date,
        b.passengers_count,
        b.total_price,
        b.payment_method,
        b.status,
        b.created_at,
        b.updated_at,

        f.flight_code,
        f.airline,
        f.origin,
        f.from_code,
        f.destination,
        f.to_code
    FROM bookings b
    JOIN flights f ON b.flight_id = f.id
    WHERE b.id = ?
`;

        const [rows] = await db.query(query, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching booking details" });
    }
};

// DELETE BOOKING (nga databaza)
export const deleteBooking = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM bookings WHERE id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting booking" });
    }
};

// CANCEL BOOKING (Update status)
export const cancelBooking = async (req, res) => {
    try {
        await db.query(
            "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
            [req.params.id]
        );
        res.json({ message: "Booking status updated to cancelled" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error cancelling booking" });
    }
};

// UPDATE BOOKING
export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            booking_code,
            departure_date,
            return_date,
            passengers_count,
            total_price,
            status,
            payment_method
        } = req.body;

        const [existing] = await db.query("SELECT id FROM bookings WHERE id = ?", [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const query = `
            UPDATE bookings 
            SET 
                booking_code = ?, 
                departure_date = ?, 
                return_date = ?, 
                passengers_count = ?, 
                total_price = ?, 
                status = ?, 
                payment_method = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

        await db.query(query, [
            booking_code,
            departure_date,
            return_date || null,
            passengers_count,
            total_price,
            status,
            payment_method,
            id
        ]);

        res.json({ message: "Booking updated successfully" });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Server error while updating booking" });
    }
};

// GET ALL PASSENGERS FOR ADMIN
export const getAllPassengers = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id,
                p.booking_code,
                p.first_name,
                p.last_name,
                p.email,
                p.phone,
                p.passport_number,
                p.nationality,
                p.birthday,
                b.status AS booking_status
            FROM passengers p
            JOIN bookings b ON p.booking_id = b.id
            ORDER BY p.id DESC
        `;

        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching passengers:", error);
        res.status(500).json({ message: "Server error while fetching passengers" });
    }
};

// GET all booking codes
export const getBookingCodes = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT booking_code, id, user_id
      FROM bookings
      WHERE status != 'cancelled'
      ORDER BY created_at DESC
    `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching booking codes:", err);
        res.status(500).json({ message: "Server error" });
    }
};