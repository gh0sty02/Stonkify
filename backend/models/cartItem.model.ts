import { ICartItem } from "Interfaces/cart.interface";
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

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const CartItem: mongoose.Model<ICartItem> = mongoose.model<ICartItem>(
  "CartItem",
  cartItemSchema
);

export default CartItem;
