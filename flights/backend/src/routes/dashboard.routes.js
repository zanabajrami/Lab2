import express from "express";
import { verifyAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", verifyAdmin, (req, res) => {
  res.status(200).json({ message: "Authorized", user: req.user });
});

export default router;
