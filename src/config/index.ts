import dotenv from "dotenv";

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || "myafrimall-jwt-secret",
  clientUrl: process.env.CLIENT_URL || "http://localhost:4096",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/myafrimall",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  port: parseInt(process.env.PORT || "8000", 10),
};
