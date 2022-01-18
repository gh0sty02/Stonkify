import { IReview } from "./review.interface";

export interface IBaseProduct {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: IReview[];
}

export interface IProduct extends IBaseProduct {
  _id: string;
}
