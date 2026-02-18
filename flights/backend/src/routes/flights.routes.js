import express from "express";
import {
  getFlights,
  createFlight,
  updateFlight,
  deleteFlight
} from "../controllers/flights.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getFlights);
router.post("/", verifyToken, createFlight);
router.put("/:id", verifyToken, updateFlight);
router.delete("/:id", verifyToken, deleteFlight);

export default router;
