import dashboardRoutes from "./routes/dashboard";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import { connectDB } from "./lib/db";
import express from "express";
import cors from "cors";

import { config } from "./config";

const app = express();

// Middleware
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    origin: [
      "https://myafrimall.vercel.app",
      "http://localhost:4096",
      "http://127.0.0.1:4096",
      config.clientUrl,
    ],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Ensure DB is connected before handling any request
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server when running locally (not on Vercel)
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
}

export default app;
