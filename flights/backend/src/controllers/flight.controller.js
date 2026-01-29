import * as Flight from "../models/Flight.js";

export const getFlights = async (req, res) => {
  const [rows] = await Flight.getAllFlights();
  res.json(rows);
};

export const addFlight = async (req, res) => {
  await Flight.createFlight(req.body);
  res.status(201).json({ message: "Flight added" });
};
