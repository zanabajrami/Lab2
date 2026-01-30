import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import flightsRoutes from "./routes/flights.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  }
});

// Socket Logic
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join_admin", () => {
    socket.join("admins");
  });

  socket.on("join_user", (id) => {
    socket.join(`user_${id}`);   
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

app.set("io", io);

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

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
