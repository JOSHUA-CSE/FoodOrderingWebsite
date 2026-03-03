require('dotenv').config();
const createDB = require("../backend/config/db");
const express = require("express");
const app = express();
const authRouter = require("../backend/routes/auth");
const adminRouter = require("../backend/routes/admin");
const authMiddleware = require("../backend/middlewares/authMiddleware");
const itemRouter = require("../backend/routes/item");
const cartRouter = require("../backend/routes/cart");
const orderRouter = require("../backend/routes/order");
const cors = require("cors");

// Initialize database
createDB();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.FRONTEND_URL || "https://your-frontend.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/admin", authMiddleware, adminRouter);
app.use("/cart", authMiddleware, cartRouter);
app.use("/orders", authMiddleware, orderRouter);
app.use("/items", itemRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

module.exports = app;
