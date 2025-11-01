// 🌿 TranquilTrails Resort Backend - server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db"); // ✅ centralized MySQL connection

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import route files
const roomsRoutes = require("./roots/rooms");
const bookingsRoutes = require("./roots/bookings");
const activitiesRoutes = require("./roots/activities");
const paymentsRoutes = require("./roots/payments");

// Use routes
app.use("/rooms", roomsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/activities", activitiesRoutes);
app.use("/payments", paymentsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🏕️ TranquilTrails Resort Backend is running successfully!");
});

// Check DB connection
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database (resortdb)");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
