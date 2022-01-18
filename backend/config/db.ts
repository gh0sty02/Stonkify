import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(
      `MongoDB connected : ${connection.connection.host}`.cyan.underline
    );
  } catch (err: unknown) {
    console.log(`error : ${err}`.red.underline.bold);
    process.exit(1);
  }
};
