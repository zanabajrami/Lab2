import express from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

// GET /api/dashboard
router.get("/", verifyAdmin, dashboardController);

export default router;
