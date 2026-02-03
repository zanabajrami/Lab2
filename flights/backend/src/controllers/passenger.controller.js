import db from "../config/db.js";

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
      dob,
      nationality
    } = req.body;

    if (dob) {
      dob = new Date(dob).toISOString().split("T")[0];
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
        dob = ?,
        nationality = ?
      WHERE id = ?
    `;

    await db.query(query, [
      first_name,
      last_name,
      email,
      phone,
      passport_number,
      dob || null, // YYYY-MM-DD
      nationality,
      id
    ]);

    res.json({ message: "Passenger updated successfully" });
  } catch (error) {
    console.error("Update passenger error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
