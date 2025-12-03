import mongoose from "mongoose";

let initialized = false;

export const connectToDB = async () => {
  if (initialized && mongoose.connection.readyState === 1) {
    console.log("📡 MongoDB connection already initialized and connected");
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ Missing environment variable: MONGODB_URI");
  }

  try {
    await mongoose.connect(uri);
    initialized = true;
    console.log("✅ App Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    initialized = false;
    throw error;
  }
};
