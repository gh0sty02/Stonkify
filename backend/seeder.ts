import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import { users } from "./data/users";
import { products } from "./data/products";
import User from "./models/user.model";
import Product from "./models/product.model";
import Order from "./models/order.model";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const constData = async () => {
  try {
    // await Order.deleteMany();
    await Product.deleteMany();
    // await User.deleteMany();

    // await User.insertMany(users);

    const adminUser = "61e66dc73fa663d53330c01b";

    const sampleProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser,
      };
    });
    sampleProducts.map(async (product) => {
      await Product.collection.insertOne(product);
    });

    console.log("done");

    // await Product.insertMany(products).console.log("data consted");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    // await User.deleteMany();

    console.log("data deleted");
  } catch (error) {
    console.log(error.message);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  console.log("executing");
  constData();
}
