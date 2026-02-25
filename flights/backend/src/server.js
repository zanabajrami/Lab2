import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import flightsRoutes from "./routes/flights.routes.js";
import passengerRoutes from "./routes/passenger.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/flights", flightsRoutes);
app.use("/api/passengers", passengerRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
