import { createSlice, createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IProduct } from "interfaces/products.interface";
import { AppState } from "store";
import { getProductDetails } from "./asyncActions/productActions";

export type productType = {
  product: Partial<IProduct>;
  loading: boolean;
  error: any;
};

const initialState: productType = {
  product: {},
  loading: false,
  error: null,
};

const hydrate = createAction<AppState>(HYDRATE);

export const productDetailsSlice = createSlice({
  name: "product-details",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, { payload: { productDetails } }) => {
      return {
        ...state,
        ...productDetails,
      };
    });
    builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
      state.product = payload.data;
      state.loading = false;
    });
    builder.addCase(getProductDetails.pending, (state, { payload }) => {
      state.loading = true;
    }),
      builder.addCase(getProductDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectProductList = (state: AppState) =>
  state.productList.products;
