import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
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

import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
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
import { userSlice } from "./reducers/userInfoSlice";
import { productsApi } from "services/productsApi";

const reducers = combineReducers({
  productList: productsListSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  createProduct: createProductSlice.reducer,
  topProducts: topProductsSlice.reducer,
  productReview: productReviewSlice.reducer,
  deleteProduct: deleteProductSlice.reducer,
  adminUserSlice: adminUserSlice.reducer,
  adminProductEdit: adminProductSlice.reducer,
  adminOrderSlice: adminOrderSlice.reducer,
  //////////////////////////////////////////////
  [userApi.reducerPath]: userApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = () =>
  configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          /* ignore persistance actions */
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(userApi.middleware),

    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(store);
