import mongoose from "mongoose";

import { config } from "../config";

let cached = (global as Record<string, unknown>).__mongooseConnection as
  | {
      promise: Promise<typeof mongoose> | null;
      conn: typeof mongoose | null;
    }
  | undefined;

if (!cached) {
  cached = { conn: null, promise: null };
  (global as Record<string, unknown>).__mongooseConnection = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(config.mongodbUri).then((conn) => {
      console.log("Connected to MongoDB via the configured URI");
      return conn;
    });
  }

  cached!.conn = await cached!.promise;

  return cached!.conn;
}
