import express from "express";
import { getFlights, addFlight } from "../controllers/flight.controller.js";

const router = express.Router();

router.get("/", getFlights);
router.post("/", addFlight);

export default router;
