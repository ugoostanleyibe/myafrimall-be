import dashboardRoutes from "./routes/dashboard";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { config } from "./config";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:4096",
      "http://127.0.0.1:4096",
      "https://myafrimall.vercel.app/",
      config.clientUrl,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

export default app;
