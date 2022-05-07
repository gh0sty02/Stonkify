export interface IReview {
  name: string;
  _id: string;
  user: string;
  rating: number;
  comment: string;
  product: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IReviewData {
  rating: number;
  comment: string;
  token: string;
  productId: string;
}
