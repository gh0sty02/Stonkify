import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "interfaces/products.interface";

import {
  getCurrentProduct,
  updateProduct,
} from "./asyncActions/productActions";

interface InitialStateType {
  product: IProduct | null;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialStateType = {
  success: false,
  loading: false,
  product: null,
  error: null,
};

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    resetUpdateProductSucces: (state) => {
      state.success = false;
    },
    resetproduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateProduct.fulfilled,
      (state, { payload }: PayloadAction<IProduct>) => {
        state.success = true;
        state.loading = false;
        state.product = null;
      }
    );
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(
      getCurrentProduct.fulfilled,
      (state, { payload }: PayloadAction<{ data: IProduct }>) => {
        state.loading = false;
        state.product = payload.data;
      }
    ),
      builder.addCase(getCurrentProduct.pending, (state, { payload }) => {
        state.loading = true;
      }),
      builder.addCase(getCurrentProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetUpdateProductSucces } = adminProductSlice.actions;
