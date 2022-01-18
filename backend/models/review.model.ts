import { IReview } from "Interfaces/review.interface";
import mongoose, { mongo } from "mongoose";

export const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },

  { timestamps: true }
);

const Review: mongoose.Model<IReview> = mongoose.model<IReview>(
  "Review",
  reviewSchema
);

export default Review;
