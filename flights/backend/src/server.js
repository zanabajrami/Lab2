import dotenv from "dotenv";
dotenv.config(); 

console.log("ACCESS_SECRET:", process.env.ACCESS_SECRET);
console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);

import express from "express";
import cors from "cors";
import "./config/db.mongo.js"; 
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // login/register
app.use("/api", dashboardRoutes); // dashboard access

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT} 🚀`));
