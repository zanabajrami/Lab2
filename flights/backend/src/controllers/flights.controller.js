import db from "../config/db.js";

/* READ*/
export const getFlights = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM flights");

        const flightsMap = {};

        results.forEach(f => {
            const key = f.flight_code || f.id;

            if (!flightsMap[key]) {
                flightsMap[key] = {
                    id: f.id,
                    flight_code: f.flight_code || "",
                    airline: f.airline || "",

                    // ⬇️ KËTO DUHEN PËR ADMIN
                    origin: f.origin || "",
                    destination: f.destination || "",
                    from_code: f.from_code || "",
                    to_code: f.to_code || "",
                    departure_time: "",
                    arrival_time: "",
                    duration: "",
                    price: 0,

                    // ⬇️ PËR FRONTEND PUBLIK
                    from: f.origin || "",
                    fromCode: f.from_code || "",
                    to: f.destination || "",
                    toCode: f.to_code || "",

                    oneWay: null,
                    return: null,
                    hasReturn: false,
                    valid_days: f.valid_days || "",
                };
            }

            if (f.is_return === 0) {
                flightsMap[key].oneWay = {
                    id: f.id,
                    departure: f.departure_time?.slice(0, 5) || "",
                    arrival: f.arrival_time?.slice(0, 5) || "",
                    duration: f.duration || "",
                    price: f.price || 0,
                };

                flightsMap[key].departure_time = flightsMap[key].oneWay.departure;
                flightsMap[key].arrival_time = flightsMap[key].oneWay.arrival;
                flightsMap[key].price = flightsMap[key].oneWay.price;
                flightsMap[key].duration = flightsMap[key].oneWay.duration;
            }

            if (f.is_return === 1) {
                flightsMap[key].return = {
                    id: f.id,
                    departure: f.departure_time?.slice(0, 5) || "",
                    arrival: f.arrival_time?.slice(0, 5) || "",
                    duration: f.duration || "",
                    price: f.price || 0,
                    returnTo: f.origin || "",
                    returnToCode: f.from_code || "",
                };
                flightsMap[key].hasReturn = true;

                if (!flightsMap[key].oneWay) {
                    flightsMap[key].departure_time = flightsMap[key].return.departure;
                    flightsMap[key].arrival_time = flightsMap[key].return.arrival;
                    flightsMap[key].price = flightsMap[key].return.price;
                    flightsMap[key].duration = flightsMap[key].return.duration;
                }
            }
        });

        res.json(Object.values(flightsMap)); // Direkt array

    } catch (error) {
        console.error("Get flights error:", error);
        res.status(500).json({ message: "Server error" });
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
