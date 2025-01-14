import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const initDB = async (): Promise<boolean> => {
  const mongodbUri = process.env.MONGODB_URI ?? "";
  console.log(mongodbUri);
  if (!mongodbUri) {
    console.error("MongoDB URI not found!");
    return false;
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongodbUri);
    console.log("DB Connected!");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return false;
  }
};

// Gracefully handle MongoDB disconnections (optional)
export const handleMongoDBDisconnection = () => {
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection lost. Attempting to reconnect...");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected.");
  });
};
