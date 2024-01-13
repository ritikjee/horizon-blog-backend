import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbURL = process.env.MONGO_URI;

export default async function connectDB() {
  try {
    await mongoose.connect(dbURL!);
    console.log(`mongoose connection successfully `);
  } catch (error) {
    console.log("Unable to connect to mongoDB");
    console.log(error);
  }
}
