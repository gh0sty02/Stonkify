import { ICartDetails } from "Interfaces/cart.interface";
import { IOrderDetails } from "Interfaces/order.interface";
import mongoose from "mongoose";

type cartProduct = {
  _id: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Product";
    required: true;
  };
  qty: number;
  name: string;
  price: number;
  image: string;
};

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cartItems: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
});

const Cart: mongoose.Model<ICartDetails> = mongoose.model<ICartDetails>(
  "Cart",
  cartSchema
);

export default Cart;
