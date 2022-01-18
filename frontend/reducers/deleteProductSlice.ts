import { createSlice } from "@reduxjs/toolkit";

import { deleteProduct } from "./asyncActions/productActions";

interface InitialStateType {
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialStateType = {
  success: false,
  loading: false,

  error: null,
};

export const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    setDeleteSuccessFalse: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const { setDeleteSuccessFalse } = deleteProductSlice.actions;
