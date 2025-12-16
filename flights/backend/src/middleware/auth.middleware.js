import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/jwt.js";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

export const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.sendStatus(403);
  next();
};
