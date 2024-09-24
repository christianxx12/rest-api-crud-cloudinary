import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error(error);
  }
}
