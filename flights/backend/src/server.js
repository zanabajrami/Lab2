import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectMongo } from "./config/mongo.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectMongo();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT} 🚀`)
);
