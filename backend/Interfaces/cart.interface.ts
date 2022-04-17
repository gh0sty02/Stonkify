import mongoose from "mongoose";

interface ICartItem {
  _id: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Product";
    required: true;
  };
  qty: { type: Number; required: true };
  name: { type: String; required: true };
  price: { type: Number; required: true };
  image: { type: String; required: true };
}

export interface ICartDetails extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  cartItems: ICartItem[];
}
