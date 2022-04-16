import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrder, IOrderDetails } from "interfaces/orderUtils.interface";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "store";

export const orderApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders", "order"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api/orders`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllOrders: builder.query<IOrder[], null>({
      query: () => `/`,
    }),
    getOrder: builder.mutation<IOrder, string>({
      query: (id) => `/${id}`,
    }),
    createOrder: builder.mutation<IOrder, IOrderDetails>({
      query: (orderDetails) => ({
        url: "",
        method: "POST",
        body: orderDetails,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deliverOrder: builder.mutation<IOrder, string>({
      query: (id) => ({
        url: `/${id}/deliver`,
        method: "PUT",
        body: {},
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyOrders: builder.mutation<Partial<IOrder[]>, { token: string }>({
      query: ({ token }) => ({
        url: `/myorders`,
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useGetMyOrdersMutation,
  useGetOrderMutation,
  useCreateOrderMutation,

  util: { getRunningOperationPromises },
} = orderApi;

export const { getAllOrders, getOrder } = orderApi.endpoints;
