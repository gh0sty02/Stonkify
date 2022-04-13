import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ILoginFormData, IUserData } from "interfaces/formdata.interface";
import { IProduct } from "interfaces/products.interface";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "store";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["product"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  //   keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api/products`,
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query<
      { products: IProduct[]; page: number; pages: number },
      { keyword: string; pageNumber: number }
    >({
      query: ({ keyword, pageNumber }) =>
        keyword && pageNumber
          ? `?keyword=${keyword}&pageNumber=${pageNumber}`
          : `/`,
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  util: { getRunningOperationPromises },
} = productsApi;

export const { getAllProducts, getProduct } = productsApi.endpoints;