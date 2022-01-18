import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "interfaces/review.interface";
import { createReview } from "./asyncActions/reviewActions";

type initialStateType = {
  loading: boolean;
  error: any;
  review: IReview | null;
  success: boolean;
};

const initialState: initialStateType = {
  loading: false,
  error: null,
  review: null,
  success: false,
};

const productReviewSlice = createSlice({
  name: "product-review",
  initialState,
  reducers: {
    clearReviews: (state) => {
      (state.success = false), (state.review = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createReview.fulfilled,
      (state, { payload }: PayloadAction<IReview>) => {
        (state.loading = false),
          (state.review = payload),
          (state.success = true);
      }
    );
    builder.addCase(createReview.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(createReview.rejected, (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.review = null;
      state.error = payload;
    });
  },
});

export const { clearReviews } = productReviewSlice.actions;

export default productReviewSlice;
