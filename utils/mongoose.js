import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error(error);
  }
}
