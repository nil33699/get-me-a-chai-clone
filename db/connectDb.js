import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in environment variables.");
}

let isConnected = false; // Track connection status

const connectDb = async () => {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
    });

    isConnected = db.connections[0].readyState === 1; // 1 = connected
    console.log(`✅ MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDb;
