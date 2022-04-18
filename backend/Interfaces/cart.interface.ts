import mongoose, { Document } from "mongoose";

export interface ICartItem {
  productId: string;
  qty: Number;
  name: String;
  price: Number;
  image: String;
  _id?: mongoose.Schema.Types.ObjectId;
}

// export interface ICartDetails extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   cartItems: mongoose.Schema.Types.ObjectId[];
// }
