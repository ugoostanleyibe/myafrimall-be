import dotenv from "dotenv";

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || "myafrimall-jwt-secret",
  clientUrl: process.env.CLIENT_URL || "http://localhost:4096",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/myafrimall",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  port: parseInt(process.env.PORT || "8000", 10),
  smtp: {
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    from: process.env.SMTP_FROM || "MyAfriMall <noreply@myafrimall.com>",
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
};
