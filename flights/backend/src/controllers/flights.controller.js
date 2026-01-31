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
    const { id } = req.params;

    await db.query(
        `UPDATE flights SET ? WHERE id = ?`,
        [req.body, id]
    );

    res.json({ message: "Flight updated" });
};

/* DELETE */
export const deleteFlight = async (req, res) => {
    const { id } = req.params;

    await db.query(
        "DELETE FROM flights WHERE id = ?",
        [id]
    );

    res.json({ message: "Flight deleted" });
};
