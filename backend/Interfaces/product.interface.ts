import mongoose from "mongoose";
import { IReview } from "./review.interface";

export interface IProduct extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  name: String;
  image: String;
  brand: String;
  category: String;
  description: String;
  reviews: IReview[];
  rating: Number;
  numReviews: Number;
  price: Number;
  countInStock: Number;
  createdAt: Date;
  updatedAt: Date;
}
