import express from "express";
import {
  verifyToken,
  verifyAdmin
} from "../middleware/admin.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  verifyAdmin,
);

export default router;
