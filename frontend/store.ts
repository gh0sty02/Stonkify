import {
  Action,
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
  getDefaultMiddleware,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { adminOrderSlice } from "reducers/adminOrderSlice";
import { adminProductSlice } from "reducers/adminProductSlice";
import { adminUserSlice } from "reducers/adminUserSlice";
import { authSlice } from "reducers/authSlice";
import { createProductSlice } from "reducers/createProductSlice";
import { deleteProductSlice } from "reducers/deleteProductSlice";
import productReviewSlice from "reducers/productReviewSlice";
import { topProductsSlice } from "reducers/topProductsSlice";
import { userApi } from "services/userApi";
import { cartSlice } from "./reducers/cartSlice";
import { orderSlice } from "./reducers/orderSlice";
import { productDetailsSlice } from "./reducers/productDetailsSlice";
import { productsListSlice } from "./reducers/productsListSlice";
import { userSlice } from "./reducers/userInfoSlice";
import { productsApi } from "services/productsApi";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";

import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const reducers = combineReducers({
  productList: productsListSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  cart: cartSlice.reducer,
  // user: userSlice.reducer,
  order: orderSlice.reducer,
  createProduct: createProductSlice.reducer,
  topProducts: topProductsSlice.reducer,
  productReview: productReviewSlice.reducer,
  deleteProduct: deleteProductSlice.reducer,
  adminUserSlice: adminUserSlice.reducer,
  adminProductEdit: adminProductSlice.reducer,
  adminOrderSlice: adminOrderSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whiteList: ["products", "user"],
};
const _persistedReducer = persistReducer(persistConfig, reducers);
export const makeStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(userApi.middleware, productsApi.middleware),
    ...options,
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);
