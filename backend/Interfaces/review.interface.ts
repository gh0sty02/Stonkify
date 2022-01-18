import mongoose from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
