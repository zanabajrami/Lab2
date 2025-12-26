import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

export default router;
