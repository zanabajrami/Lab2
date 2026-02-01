import express from "express";
import {createBooking, getBookings, getBookingById, cancelBooking, getAllPassengers} from "../controllers/booking.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/all-passengers", verifyToken, verifyAdmin, getAllPassengers);
router.get("/", verifyToken, verifyAdmin, getBookings);
router.post("/", verifyToken, createBooking);
router.get("/:id", verifyToken, getBookingById);
router.put("/:id/cancel", verifyToken, cancelBooking);

export default router;
