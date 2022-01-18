import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "interfaces/products.interface";

import { createProduct } from "./asyncActions/productActions";

interface InitialStateType {
  success: boolean;
  loading: boolean;
  error: any;
  createdProduct: IProduct | null;
}

const initialState: InitialStateType = {
  success: false,
  loading: false,
  createdProduct: null,
  error: null,
};

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    setCreateProductSuccessFalse: (state) => {
      state.success = false;
    },
    resetproduct: (state) => {
      state.createdProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createProduct.fulfilled,
      (state, { payload }: PayloadAction<IProduct>) => {
        state.success = true;
        state.loading = false;
        state.createdProduct = payload;
      }
    );
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const { resetproduct, setCreateProductSuccessFalse } =
  createProductSlice.actions;
