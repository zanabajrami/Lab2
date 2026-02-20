import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/admin.middleware.js";
import { getAllUsers, updateUser, deleteUser, getCurrentUser, deleteCurrentUser, changePassword } from "../controllers/users.controller.js";

const router = express.Router();

// Current user
router.get("/me", verifyToken, getCurrentUser);
router.delete("/me", verifyToken, deleteCurrentUser);

router.put("/change-password", verifyToken, changePassword);

// Admin actions
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.put("/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
