import mongoose from "mongoose";
import dotenv from "dotenv";
const colors = require("colors");
import { users } from "./data/users";
import { products } from "./data/products";
import User from "./models/user.model";
import Product from "./models/product.model";
import Order from "./models/order.model";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("data imported".green.inverse);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data deleted".red.inverse);
  } catch (error) {
    console.log(error.message);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
