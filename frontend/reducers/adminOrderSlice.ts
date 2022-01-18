import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "interfaces/orderUtils.interface";
import { getAllOrders, deliverOrder } from "./asyncActions/orderActions";

type initialStateType = {
  orders: IOrder[];
  loading: boolean;
  error: any;
  updateOrderStatus: boolean;
};

const initialState: initialStateType = {
  orders: [],
  loading: false,
  error: null,
  updateOrderStatus: false,
};

export const adminOrderSlice = createSlice({
  name: "admin-order",
  initialState,
  reducers: {
    setUpdateOrderStatusFalse: (state) => {
      state.updateOrderStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllOrders.fulfilled,
      (state, { payload }: PayloadAction<IOrder[]>) => {
        state.orders = payload;
        state.loading = false;
      }
    );
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deliverOrder.fulfilled, (state) => {
      state.loading = false;
      state.updateOrderStatus = true;
    });
    builder.addCase(deliverOrder.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(deliverOrder.rejected, (state) => {
      state.loading = false;
      state.updateOrderStatus = false;
    });
  },
});

export const { setUpdateOrderStatusFalse } = adminOrderSlice.actions;
