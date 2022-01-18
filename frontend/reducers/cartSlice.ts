import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { cartType, IShippingAddress } from "interfaces/orderUtils.interface";
import { IProduct } from "interfaces/products.interface";
import { addToCart } from "./asyncActions/cartActions";

const initialState: cartType = {
  cartItems: [],
  shippingAddress: null,
  loading: false,
  error: null,
  paymentMethod: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== payload);

      let loadedCartItems: IProduct[];
      if (typeof window !== "undefined") {
        if (localStorage.getItem("cartItems")) {
          loadedCartItems = JSON.parse(
            localStorage.getItem("cartItems") as string
          );
          const newCartItems = loadedCartItems.filter((p) => p._id !== payload);
          localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
      }
    },
    cartInit: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.cartItems = payload;
    },
    cartReset: (state) => {
      state.cartItems = [];
      if (typeof window !== undefined) {
        localStorage.removeItem("cartItems");
      }
    },
    shippingAddressInit: (
      state,
      { payload }: PayloadAction<IShippingAddress>
    ) => {
      state.shippingAddress = payload;
    },
    paymentMethodInit: (state, { payload }: PayloadAction<string>) => {
      state.paymentMethod = payload;
    },
    saveShippingAddress: (
      state,
      { payload }: PayloadAction<IShippingAddress>
    ) => {
      state.shippingAddress = payload;
    },
    savePaymentMethod: (state, { payload }: PayloadAction<string>) => {
      state.paymentMethod = payload;
      localStorage.setItem("paymentMethod", payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      const existedItem = state.cartItems.find((p) => p._id === payload._id);

      const item = payload;

      if (existedItem) {
        state.cartItems = state.cartItems.map((p) => {
          if (p._id === existedItem._id) {
            return item;
          } else {
            return p;
          }
        });
        state.loading = false;
      } else {
        state.cartItems = state.cartItems.concat(payload);

        state.loading = false;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(addToCart.pending, (state, { payload }) => {
      state.loading = true;
    }),
      builder.addCase(addToCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  removeItem,
  cartInit,
  saveShippingAddress,
  shippingAddressInit,
  savePaymentMethod,
  paymentMethodInit,
  cartReset,
} = cartSlice.actions;
