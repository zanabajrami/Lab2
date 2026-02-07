import db from "../config/db.js";

/* READ*/
export const getFlights = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit);
        const offset = (page - 1) * limit;

        const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM flights");

        if (!limit) {
            const [rows] = await db.query(
                `SELECT id, flight_code, airline, origin, from_code,
                 destination, to_code, departure_time, arrival_time,
                 duration, price, is_return, valid_days
                 FROM flights
                 ORDER BY id DESC`
            );

            return res.json({
                data: rows,
                totalRows: total,
            });
        }

        const [rows] = await db.query(
            `SELECT id, flight_code, airline, origin, from_code,
             destination, to_code, departure_time, arrival_time,
             duration, price, is_return, valid_days
             FROM flights
             ORDER BY id DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        res.json({
            data: rows,
            page,
            limit,
            totalRows: total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch flights" });
    }
};

/* CREATE */
export const createFlight = async (req, res) => {
    const {
        flight_code,
        airline,
        origin,
        from_code,
        destination,
        to_code,
        departure_time,
        arrival_time,
        duration,
        price,
        is_return,
        valid_days,
    } = req.body;

    await db.query(
        `INSERT INTO flights
     (flight_code, airline, origin, from_code, destination, to_code,
      departure_time, arrival_time, duration, price, is_return, valid_days)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            flight_code,
            airline,
            origin,
            from_code,
            destination,
            to_code,
            departure_time,
            arrival_time,
            duration,
            price,
            is_return,
            valid_days,
        ]
    );

    res.status(201).json({ message: "Flight created" });
};

/* UPDATE */
export const updateFlight = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim(); // heq \n ose space

        const allowedFields = [
            "airline",
            "origin",
            "from_code",
            "destination",
            "to_code",
            "departure_time",
            "arrival_time",
            "duration",
            "price",
            "is_return",
            "valid_days"
        ];

        const updates = [];
        const values = [];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates.push(`${field} = ?`);
                values.push(req.body[field]);
            }
        }

        // NËSE nuk ka asgjë për update
        if (updates.length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        const sql = `
            UPDATE flights
            SET ${updates.join(", ")}
            WHERE id = ?
        `;

        values.push(id);

        await db.query(sql, values);

        res.json({ message: "Flight updated successfully" });
    } catch (error) {
        console.error("Update flight error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* DELETE */
export const deleteFlight = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim(); // heq \n ose space

        const [result] = await db.query(
            "DELETE FROM flights WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.json({ message: "Flight deleted successfully" });
    } catch (error) {
        console.error("Delete flight error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
