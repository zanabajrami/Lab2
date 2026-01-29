import db from "../config/mysql.js";

export const getAllFlights = () =>
  db.query("SELECT * FROM flights");

export const createFlight = (data) =>
  db.query("INSERT INTO flights SET ?", data);

export const updateFlight = (id, data) =>
  db.query("UPDATE flights SET ? WHERE id = ?", [data, id]);

export const deleteFlight = (id) =>
  db.query("DELETE FROM flights WHERE id = ?", [id]);
