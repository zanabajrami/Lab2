import express from "express";
import {
  verifyToken,
  verifyAdmin
} from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  verifyAdmin,
  adminDashboardController
);

export default router;
