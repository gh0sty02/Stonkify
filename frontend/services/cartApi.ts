import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICartItem, ICartItemDetails } from "interfaces/cart.interface";
import { IOrder, IOrderDetails } from "interfaces/orderUtils.interface";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "store";

export const orderApi = createApi({
  reducerPath: "cart",
  tagTypes: ["orders", "cartItem"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
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
      query: (id) => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authroization: `Bearer ${id}`,
        },
      }),
    }),
    addToCart: builder.mutation<ICartItem[], ICartItemDetails>({
      query: (data) => {
        console.log(data);
        return {
          url: "/",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    changeQty: builder.mutation<ICartItem[], { id: string; qty: number }>({
      query: ({ id, qty }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { qty },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    removeFromCart: builder.mutation<ICartItem[], string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
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
