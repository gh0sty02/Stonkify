import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
export const connectDB = async () => {
  try {
    // creating a connection to the database
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`MongoDB connected : ${connection.connection.host}`);
  } catch (err: unknown) {
    console.log(`error : ${err}`);
    process.exit(1);
  }
};
