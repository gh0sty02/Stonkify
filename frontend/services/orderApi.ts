import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrder, IOrderDetails } from "interfaces/orderUtils.interface";
import { HYDRATE } from "next-redux-wrapper";
import { REHYDRATE } from "redux-persist";
import { AppState } from "store";

export const orderApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders", "order"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
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
    getOrder: builder.mutation<IOrder, { orderId: string; token: string }>({
      query: (data) => ({
        url: `/${data.orderId}`,
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    changePaymentStatus: builder.mutation<
      IOrder,
      { orderId: string; token: string }
    >({
      query: (data) => {
        return {
          url: `/${data.orderId}/pay`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    changeDeliveryStatus: builder.mutation<
      IOrder,
      { orderId: string; token: string }
    >({
      query: (data) => ({
        url: `/${data.orderId}/deliver`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    createOrder: builder.mutation<IOrder, IOrderDetails>({
      query: (orderDetails) => {
        return {
          url: "",
          method: "POST",
          body: orderDetails,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${(orderDetails as IOrderDetails).token}`,
          },
        };
      },
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
    getMyOrders: builder.mutation<Partial<IOrder[]>, string>({
      query: (token) => ({
        url: `/myorders`,
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllOrders: builder.query<IOrder[], string>({
      query: (token) => ({
        url: "/",
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
  useChangeDeliveryStatusMutation,

  util: { getRunningOperationPromises },
} = orderApi;

export const {
  getAllOrders,
  getOrder,
  changePaymentStatus,
  changeDeliveryStatus,
  getMyOrders,
} = orderApi.endpoints;
