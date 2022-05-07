import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ILoginFormData, IUserData } from "interfaces/formdata.interface";
import { IReview, IReviewData } from "interfaces/review.interface";
import IUser from "interfaces/user.interface";
import { HYDRATE } from "next-redux-wrapper";
import { authSlice } from "reducers/authSlice";
import { REHYDRATE } from "redux-persist";

import { AppState } from "store";

export const reviewApi = createApi({
  reducerPath: "review",
  tagTypes: ["review"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api`,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    addReview: builder.mutation<
      IReview,
      { review: IReviewData; productId: string; token: string }
    >({
      query: ({ review, productId, token }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: review,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useAddReviewMutation,
  util: { getRunningOperationPromises },
} = reviewApi;

export const { addReview } = reviewApi.endpoints;
