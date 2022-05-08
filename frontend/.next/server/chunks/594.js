"use strict";
exports.id = 594;
exports.ids = [594];
exports.modules = {

/***/ 3139:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GO": () => (/* binding */ resetOrders),
/* harmony export */   "OL": () => (/* binding */ setOrder),
/* harmony export */   "Ot": () => (/* binding */ setAllOrders),
/* harmony export */   "wC": () => (/* binding */ orderInit),
/* harmony export */   "zM": () => (/* binding */ orderSlice)
/* harmony export */ });
/* unused harmony export setUserOrders */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  currentOrder: null,
  userOrders: null,
  allOrders: null,
  loading: false,
  success: false,
  error: null
};
const orderSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "order",
  initialState,
  reducers: {
    orderInit: (state, {
      payload
    }) => {
      state.currentOrder = payload;
    },
    resetOrders: state => {
      // localStorage.removeItem("order");
      state.currentOrder = null;
    },
    setOrder: (state, {
      payload
    }) => {
      state.currentOrder = payload;
    },
    setUserOrders: (state, {
      payload
    }) => {
      state.userOrders = payload;
    },
    setAllOrders: (state, {
      payload
    }) => {
      state.allOrders = payload;
    }
  }
});
const {
  orderInit,
  resetOrders,
  setOrder,
  setUserOrders,
  setAllOrders
} = orderSlice.actions;

/***/ }),

/***/ 8892:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Eh": () => (/* binding */ orderApi),
/* harmony export */   "co": () => (/* binding */ getOrder),
/* harmony export */   "kD": () => (/* binding */ useCreateOrderMutation),
/* harmony export */   "kg": () => (/* binding */ changePaymentStatus),
/* harmony export */   "lM": () => (/* binding */ useChangeDeliveryStatusMutation),
/* harmony export */   "ze": () => (/* binding */ getMyOrders),
/* harmony export */   "zk": () => (/* binding */ getAllOrders)
/* harmony export */ });
/* unused harmony exports useGetAllOrdersQuery, useDeliverOrderMutation, useGetMyOrdersMutation, useGetOrderMutation, getRunningOperationPromises, changeDeliveryStatus */
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4335);
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4161);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_1__);


const orderApi = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
  reducerPath: "orders",
  tagTypes: ["orders", "order"],

  extractRehydrationInfo(action, {
    reducerPath
  }) {
    if (action.type === redux_persist__WEBPACK_IMPORTED_MODULE_1__.REHYDRATE) {
      return action.payload[reducerPath];
    }
  },

  baseQuery: (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
    baseUrl: `${"http://localhost:5000"}/api/orders`,
    prepareHeaders: (headers, {
      getState
    }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: builder => ({
    getOrder: builder.mutation({
      query: data => ({
        url: `/${data.orderId}`,
        headers: {
          authorization: `Bearer ${data.token}`
        }
      })
    }),
    changePaymentStatus: builder.mutation({
      query: data => {
        return {
          url: `/${data.orderId}/pay`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${data.token}`
          }
        };
      }
    }),
    changeDeliveryStatus: builder.mutation({
      query: data => ({
        url: `/${data.orderId}/deliver`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`
        }
      })
    }),
    createOrder: builder.mutation({
      query: orderDetails => {
        return {
          url: "",
          method: "POST",
          body: orderDetails,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${orderDetails.token}`
          }
        };
      }
    }),
    deliverOrder: builder.mutation({
      query: id => ({
        url: `/${id}/deliver`,
        method: "PUT",
        body: {},
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    getMyOrders: builder.mutation({
      query: token => ({
        url: `/myorders`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      })
    }),
    getAllOrders: builder.query({
      query: token => ({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      })
    })
  })
});
const {
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useGetMyOrdersMutation,
  useGetOrderMutation,
  useCreateOrderMutation,
  useChangeDeliveryStatusMutation,
  util: {
    getRunningOperationPromises
  }
} = orderApi;
const {
  getAllOrders,
  getOrder,
  changePaymentStatus,
  changeDeliveryStatus,
  getMyOrders
} = orderApi.endpoints;

/***/ }),

/***/ 5996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MS": () => (/* binding */ useAddReviewMutation),
/* harmony export */   "Nk": () => (/* binding */ reviewApi)
/* harmony export */ });
/* unused harmony exports getRunningOperationPromises, addReview */
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4335);
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4161);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_1__);


const reviewApi = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
  reducerPath: "review",
  tagTypes: ["review"],
  baseQuery: (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
    baseUrl: `${"http://localhost:5000"}/api`,
    prepareHeaders: (headers, {
      getState
    }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  extractRehydrationInfo(action, {
    reducerPath
  }) {
    if (action.type === redux_persist__WEBPACK_IMPORTED_MODULE_1__.REHYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: builder => ({
    addReview: builder.mutation({
      query: ({
        review,
        productId,
        token
      }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: review,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    })
  })
});
const {
  useAddReviewMutation,
  util: {
    getRunningOperationPromises
  }
} = reviewApi;
const {
  addReview
} = reviewApi.endpoints;

/***/ }),

/***/ 6594:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YS": () => (/* binding */ wrapper),
/* harmony export */   "n": () => (/* binding */ makeStore)
/* harmony export */ });
/* unused harmony exports store, useTypedSelector */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5648);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reducers_authSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8475);
/* harmony import */ var services_userApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2350);
/* harmony import */ var _reducers_cartSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4749);
/* harmony import */ var _reducers_orderSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3139);
/* harmony import */ var services_productsApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2307);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var services_orderApi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8892);
/* harmony import */ var services_reviewApi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5996);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const reducers = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  cart: _reducers_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .cartSlice.reducer */ .Ao.reducer,
  order: _reducers_orderSlice__WEBPACK_IMPORTED_MODULE_5__/* .orderSlice.reducer */ .zM.reducer,
  [services_userApi__WEBPACK_IMPORTED_MODULE_3__/* .userApi.reducerPath */ .BG.reducerPath]: services_userApi__WEBPACK_IMPORTED_MODULE_3__/* .userApi.reducer */ .BG.reducer,
  [services_productsApi__WEBPACK_IMPORTED_MODULE_6__/* .productsApi.reducerPath */ .fi.reducerPath]: services_productsApi__WEBPACK_IMPORTED_MODULE_6__/* .productsApi.reducer */ .fi.reducer,
  [reducers_authSlice__WEBPACK_IMPORTED_MODULE_2__/* .authSlice.name */ .Gb.name]: reducers_authSlice__WEBPACK_IMPORTED_MODULE_2__/* .authSlice.reducer */ .Gb.reducer,
  [services_orderApi__WEBPACK_IMPORTED_MODULE_8__/* .orderApi.reducerPath */ .Eh.reducerPath]: services_orderApi__WEBPACK_IMPORTED_MODULE_8__/* .orderApi.reducer */ .Eh.reducer,
  [services_reviewApi__WEBPACK_IMPORTED_MODULE_9__/* .reviewApi.reducerPath */ .Nk.reducerPath]: services_reviewApi__WEBPACK_IMPORTED_MODULE_9__/* .reviewApi.reducer */ .Nk.reducer
});
const makeStore = options => (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)(_objectSpread(_objectSpread({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(services_userApi__WEBPACK_IMPORTED_MODULE_3__/* .userApi.middleware */ .BG.middleware, services_productsApi__WEBPACK_IMPORTED_MODULE_6__/* .productsApi.middleware */ .fi.middleware, services_orderApi__WEBPACK_IMPORTED_MODULE_8__/* .orderApi.middleware */ .Eh.middleware, services_reviewApi__WEBPACK_IMPORTED_MODULE_9__/* .reviewApi.middleware */ .Nk.middleware)
}, options), {}, {
  devTools: false
}));
const store = makeStore();
const useTypedSelector = (/* unused pure expression or super */ null && (useSelector));
const wrapper = (0,next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__.createWrapper)(makeStore);

/***/ })

};
;