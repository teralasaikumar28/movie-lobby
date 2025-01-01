import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/movie-lobby";

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI,{serverSelectionTimeoutMS: 15000 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

// Start Server and Ensure DB connection before starting the server
const startServer = async () => {
  await connectDB();  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
