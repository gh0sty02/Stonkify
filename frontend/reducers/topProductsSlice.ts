import { createSlice } from "@reduxjs/toolkit";

import { IProduct } from "interfaces/products.interface";

import { getTopRatedProducts } from "./asyncActions/productActions";

export type productType = {
  products: IProduct[];
  loading: boolean;
  error: any;
};

const initialState: productType = {
  products: [],
  loading: false,
  error: null,
};

export const topProductsSlice = createSlice({
  name: "top-products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTopRatedProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.loading = false;
    });
    builder.addCase(getTopRatedProducts.pending, (state, { payload }) => {
      state.loading = true;
    }),
      builder.addCase(getTopRatedProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
