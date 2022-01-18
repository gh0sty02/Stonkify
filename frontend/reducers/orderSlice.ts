import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrder } from "interfaces/orderUtils.interface";
import {
  createOrder,
  getMyOrders,
  getOrderDetails,
  payOrder,
} from "./asyncActions/orderActions";

type orderType = {
  order: IOrder | null;
  orders: IOrder[];
  loading: boolean;
  success: boolean;
  error: any;
};

const initialState: orderType = {
  order: null,
  orders: [],
  loading: false,
  success: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderInit: (state, { payload }: PayloadAction<IOrder>) => {
      state.order = payload;
    },

    resetOrders: (state) => {
      localStorage.removeItem("order");
      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.order = payload;
      state.loading = false;
      state.success = true;

      if (typeof window !== undefined) {
        localStorage.setItem("order", JSON.stringify(payload));
      }
    });
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    builder.addCase(getOrderDetails.fulfilled, (state, { payload }) => {
      state.order = payload;
      state.loading = false;
      state.success = true;
      if (typeof window !== undefined) {
        localStorage.removeItem("order");
        localStorage.setItem("order", JSON.stringify(payload));
      }
    });
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    builder.addCase(
      payOrder.fulfilled,
      (state, { payload }: PayloadAction<IOrder>) => {
        state.success = true;
        state.order = payload;
        state.loading = false;

        if (typeof window !== undefined) {
          localStorage.setItem("order", JSON.stringify(payload));
        }
      }
    );
    builder.addCase(payOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(payOrder.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    builder.addCase(
      getMyOrders.fulfilled,
      (state, { payload }: PayloadAction<IOrder[]>) => {
        state.orders = payload;
        state.loading = false;
      }
    );
    builder.addCase(getMyOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyOrders.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { orderInit, resetOrders } = orderSlice.actions;
