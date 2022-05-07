import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICartItem, ICartItemDetails } from "interfaces/cart.interface";
import { IOrder, IOrderDetails } from "interfaces/orderUtils.interface";
import { HYDRATE } from "next-redux-wrapper";
import { cartSlice } from "reducers/cartSlice";
import { REHYDRATE } from "redux-persist";
import { AppState } from "store";

export const orderApi = createApi({
  reducerPath: "cart",
  tagTypes: ["cartItem"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api/cart`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllCartItems: builder.mutation<ICartItem[], string>({
      query: (id) => {
        return {
          url: `/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id}`,
          },
        };
      },
    }),
    addToCart: builder.mutation<
      ICartItem[],
      { cartItem: ICartItemDetails; token: string }
    >({
      query: (data) => {
        return {
          url: "/",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    changeQty: builder.mutation<
      ICartItem[],
      { id: string; qty: number; token: string }
    >({
      query: ({ id, qty, token }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { qty },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeFromCart: builder.mutation<
      ICartItem[],
      { cartItemId: string; token: string }
    >({
      query: (data) => ({
        url: `/${data.cartItemId}`,
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    initCartAfterLogin: builder.mutation<ICartItem[], string>({
      query: (id) => ({
        url: `/init`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id}`,
        },
      }),
    }),

    emptyCart: builder.mutation<null, null>({
      query: () => ({
        url: `/`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useEmptyCartMutation,
  useGetAllCartItemsMutation,
  useRemoveFromCartMutation,
  useChangeQtyMutation,
  util: { getRunningOperationPromises },
} = orderApi;

export const { getAllCartItems, emptyCart } = orderApi.endpoints;
