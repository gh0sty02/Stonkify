import {
  Action,
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "reducers/authSlice";

import { userApi } from "services/userApi";
import { cartSlice } from "./reducers/cartSlice";
import { orderSlice } from "./reducers/orderSlice";

import { productsApi } from "services/productsApi";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { orderApi } from "services/orderApi";
import { reviewApi } from "services/reviewApi";

const reducers = combineReducers({
  cart: cartSlice.reducer,
  order: orderSlice.reducer,

  [userApi.reducerPath]: userApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
});

export const makeStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userApi.middleware,
        productsApi.middleware,
        orderApi.middleware,
        reviewApi.middleware
      ),
    ...options,
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);
