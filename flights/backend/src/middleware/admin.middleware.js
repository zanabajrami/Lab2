import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/jwt.js"; 

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("Not authenticated");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token not valid");
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json("Access denied");
  next();
};
