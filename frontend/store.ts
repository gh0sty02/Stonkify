import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { adminOrderSlice } from "reducers/adminOrderSlice";
import { adminProductSlice } from "reducers/adminProductSlice";
import { adminUserSlice } from "reducers/adminUserSlice";
import { createProductSlice } from "reducers/createProductSlice";
import { deleteProductSlice } from "reducers/deleteProductSlice";
import productReviewSlice from "reducers/productReviewSlice";
import { topProductsSlice } from "reducers/topProductsSlice";
import { cartSlice } from "./reducers/cartSlice";
import { orderSlice } from "./reducers/orderSlice";
import { productDetailsSlice } from "./reducers/productDetailsSlice";
import { productsListSlice } from "./reducers/productsListSlice";

import { userSlice } from "./reducers/userInfoSlice";

export const store = () =>
  configureStore({
    reducer: {
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
    },

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
