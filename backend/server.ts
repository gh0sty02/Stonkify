// core packages
const colors = require("colors");
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";

// utils
import { connectDB } from "./config/db";

// routers
import orderRouter from "./routes/order.router";
import productRouter from "./routes/product.router";
import userRouter from "./routes/user.router";
import uploadRouter from "./routes/upload.router";
import CartRouter from "./routes/cart.router";

// middlewares
import { errorHandler, notFound } from "./middleware/error.middleware";

//interfaces
import IUser from "Interfaces/user.interface";

config();

const app = express();
app.use(express.json());

// settting user to the request object
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

// cors
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

// routes handler
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/cart", CartRouter);
app.use("/images/", express.static(path.join(__dirname, "images")));

// not found handler
app.use(notFound);

// error handler
app.use(errorHandler);

// connect to the database
connectDB().then(() => {
  app.listen(Number(process.env.PORT) || 5000, () => {
    console.log(`Server running successfully`.yellow.bold);
  });
});
