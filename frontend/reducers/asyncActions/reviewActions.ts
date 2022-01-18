import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReview } from "interfaces/review.interface";

export const createReview = createAsyncThunk(
  "product-review/create",
  async (
    reviewData: {
      rating: number;
      comment: string;
      token: string;
      productId: string;
    },
    thunkApi
  ) => {
    try {
      const { data }: { data: IReview } = await axios.post(
        `${process.env.BACKEND_URL}/api/products/${reviewData.productId}/reviews`,
        {
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${reviewData.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);
