import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartItemDetails } from "interfaces/cart.interface";
import { cartType, IShippingAddress } from "interfaces/orderUtils.interface";
import { IProduct } from "interfaces/products.interface";

const initialState: cartType = {
  cartItems: [],
  shippingAddress: null,
  tempCartItems: [],
  loading: false,
  error: null,
  paymentMethod: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // initalise data
    cartInit: (state, { payload }: PayloadAction<ICartItem[]>) => {
      state.cartItems = payload;
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

    // save data
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

    resetShippingData: (state) => {
      state.shippingAddress = null;
      if (typeof window !== undefined) {
        localStorage.removeItem("shippingAddress");
      }
    },

    // reset data
    resetCart: (state) => {
      state.cartItems = [];
      if (typeof window !== undefined) {
        localStorage.removeItem("cartItems");
      }
    },

    // cart actions
    addToCart: (state, { payload }: PayloadAction<ICartItemDetails>) => {
      const cartItems = state.cartItems;
      const existingItem = cartItems.filter(
        (item) => item.productId === payload.productId
      );
      if (existingItem.length > 0) {
        existingItem[0].qty += payload.qty;
      } else {
        cartItems.push(payload);
      }

      state.cartItems = cartItems;
      if (typeof window !== undefined) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.productId !== payload);

      if (typeof window !== undefined) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    changeQty: (
      state,
      { payload }: PayloadAction<{ productId: string; qty: number }>
    ) => {
      const cartItems = state.cartItems;
      const existingItem = cartItems.filter(
        (item) => item.productId === payload.productId
      );
      if (existingItem.length > 0) {
        existingItem[0].qty = payload.qty;
      }
      state.cartItems = cartItems;
      if (typeof window !== undefined) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const {
  cartInit,
  saveShippingAddress,
  shippingAddressInit,
  savePaymentMethod,
  paymentMethodInit,
  resetCart,
  addToCart,
  changeQty,
  removeFromCart,
  resetShippingData,
} = cartSlice.actions;
