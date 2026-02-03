import express from "express";
import { updatePassenger } from "../controllers/passenger.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:id", verifyToken, updatePassenger);

export default router;
