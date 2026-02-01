import express from "express";
import { getAllPassengers } from "../controllers/passenger.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/all", verifyToken, verifyAdmin, getAllPassengers);

export default router;