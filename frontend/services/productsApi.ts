import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ILoginFormData, IUserData } from "interfaces/formdata.interface";
import { IProduct } from "interfaces/products.interface";
import { HYDRATE } from "next-redux-wrapper";
import { REHYDRATE } from "redux-persist";

import { AppState } from "store";

export const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ["product"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api/products`,
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query<
      { products: IProduct[]; page: number; pages: number },
      { keyword: string; pageNumber: number }
    >({
      query: ({ keyword, pageNumber }) =>
        `?keyword=${keyword}&pageNumber=${pageNumber}`,
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id) => `/${id}`,
    }),
    getTopRatedProducts: builder.query<IProduct[], void>({
      query: () => `/top`,
    }),
    updateProduct: builder.mutation<
      IProduct,
      { productId: string; token: string; product: Partial<IProduct> }
    >({
      query: (data) => ({
        url: `${data.productId}`,
        method: "PUT",
        body: data.product,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    deleteProduct: builder.mutation<null, { productId: string; token: string }>(
      {
        query: (data) => ({
          url: `${data.productId}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${data.token}`,
          },
        }),
      }
    ),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetTopRatedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  util: { getRunningOperationPromises },
} = productsApi;

export const { getAllProducts, getProduct, getTopRatedProducts } =
  productsApi.endpoints;
