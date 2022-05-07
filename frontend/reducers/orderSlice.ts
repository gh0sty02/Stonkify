import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrder } from "interfaces/orderUtils.interface";
import {
  createOrder,
  getMyOrders,
  getOrderDetails,
  payOrder,
} from "./asyncActions/orderActions";

type orderType = {
  currentOrder: IOrder | null;
  userOrders: IOrder[] | null;
  allOrders: IOrder[] | null;
  loading: boolean;
  success: boolean;
  error: any;
};

const initialState: orderType = {
  currentOrder: null,
  userOrders: null,
  allOrders: null,
  loading: false,
  success: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderInit: (state, { payload }: PayloadAction<IOrder>) => {
      state.currentOrder = payload;
    },

    resetOrders: (state) => {
      // localStorage.removeItem("order");
      state.currentOrder = null;
    },
    setOrder: (state, { payload }: PayloadAction<IOrder>) => {
      state.currentOrder = payload;
    },
    setUserOrders: (state, { payload }: PayloadAction<IOrder[]>) => {
      state.userOrders = payload;
    },
    setAllOrders: (state, { payload }: PayloadAction<IOrder[]>) => {
      state.allOrders = payload;
    },
  },
});

export const { orderInit, resetOrders, setOrder, setUserOrders, setAllOrders } =
  orderSlice.actions;
