import { createSlice, createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IProduct } from "interfaces/products.interface";
import { AppState } from "store";
import { getAllProducts } from "./asyncActions/productActions";

export type productListState = {
  products: IProduct[];
  pages: number;
  page: number;
  loading: boolean;
  error: any;
};

const initialState: productListState = {
  products: [],
  pages: 0,
  page: 1,
  loading: false,
  error: null,
};

const hydrate = createAction<AppState>(HYDRATE);

export const productsListSlice = createSlice({
  name: "product-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, { payload: { productList } }) => {
      return {
        ...state,
        ...productList,
      };
    });

    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload.products;
      state.page = payload.page;
      state.pages = payload.pages;
      state.loading = false;
    });
    builder.addCase(getAllProducts.pending, (state, { payload }) => {
      state.products = [];
      state.loading = true;
    });
    builder.addCase(getAllProducts.rejected, (state, { payload }) => {
      state.products = [];
      state.loading = false;
      state.error = payload;
    });
  },
});

export const selectProductList = (state: AppState) =>
  state.productList.products;
