import express from "express";
import {createPassenger, updatePassenger} from "../controllers/passenger.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:id", verifyToken, updatePassenger);
router.post("/", verifyToken, createPassenger);

export default router;
