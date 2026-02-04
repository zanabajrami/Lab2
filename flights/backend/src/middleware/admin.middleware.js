import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/jwt.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const role = req.user.role || req.user.isAdmin;

  if (role !== "admin" && role !== true) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
