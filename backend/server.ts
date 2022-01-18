import express, { Request, Response } from "express";
import path from "path";
const colors = require("colors");
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import orderRouter from "./routes/order.router";
import { connectDB } from "./config/db";
import productRouter from "./routes/product.router";
import userRouter from "./routes/user.router";
import uploadRouter from "./routes/upload.router";
import { errorHandler, notFound } from "./middleware/error.middleware";
import IUser from "Interfaces/user.interface";

config();

const app = express();
app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(cors());

app.use("/images/", express.static(path.join(__dirname, "images")));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);

app.use(errorHandler);

console.log(process.env.PORT);

connectDB().then(() => {
  app.listen(Number(process.env.PORT) || 5000, () => {
    console.log(`Server running successfully`.yellow.bold);
  });
});
