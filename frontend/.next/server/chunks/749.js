"use strict";
exports.id = 749;
exports.ids = [749];
exports.modules = {

/***/ 4749:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Al": () => (/* binding */ shippingAddressInit),
/* harmony export */   "Ao": () => (/* binding */ cartSlice),
/* harmony export */   "BX": () => (/* binding */ savePaymentMethod),
/* harmony export */   "FK": () => (/* binding */ resetShippingData),
/* harmony export */   "Pg": () => (/* binding */ changeQty),
/* harmony export */   "Xq": () => (/* binding */ addToCart),
/* harmony export */   "bJ": () => (/* binding */ cartInit),
/* harmony export */   "h2": () => (/* binding */ removeFromCart),
/* harmony export */   "q7": () => (/* binding */ saveShippingAddress),
/* harmony export */   "s9": () => (/* binding */ resetCart)
/* harmony export */ });
/* unused harmony export paymentMethodInit */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  cartItems: [],
  shippingAddress: null,
  tempCartItems: [],
  loading: false,
  error: null,
  paymentMethod: null
};
const cartSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "cart",
  initialState,
  reducers: {
    // initalise data
    cartInit: (state, {
      payload
    }) => {
      state.cartItems = payload;
    },
    shippingAddressInit: (state, {
      payload
    }) => {
      state.shippingAddress = payload;
    },
    paymentMethodInit: (state, {
      payload
    }) => {
      state.paymentMethod = payload;
    },
    // save data
    saveShippingAddress: (state, {
      payload
    }) => {
      state.shippingAddress = payload;
    },
    savePaymentMethod: (state, {
      payload
    }) => {
      state.paymentMethod = payload;
      localStorage.setItem("paymentMethod", payload);
    },
    resetShippingData: state => {
      state.shippingAddress = null;

      if (true) {
        localStorage.removeItem("shippingAddress");
      }
    },
    // reset data
    resetCart: state => {
      state.cartItems = [];

      if (true) {
        localStorage.removeItem("cartItems");
      }
    },
    // cart actions
    addToCart: (state, {
      payload
    }) => {
      const cartItems = state.cartItems;
      const existingItem = cartItems.filter(item => item.productId === payload.productId);

      if (existingItem.length > 0) {
        existingItem[0].qty += payload.qty;
      } else {
        cartItems.push(payload);
      }

      state.cartItems = cartItems;

      if (true) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, {
      payload
    }) => {
      state.cartItems = state.cartItems.filter(i => i.productId !== payload);

      if (true) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    changeQty: (state, {
      payload
    }) => {
      const cartItems = state.cartItems;
      const existingItem = cartItems.filter(item => item.productId === payload.productId);

      if (existingItem.length > 0) {
        existingItem[0].qty = payload.qty;
      }

      state.cartItems = cartItems;

      if (true) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    }
  }
});
const {
  cartInit,
  saveShippingAddress,
  shippingAddressInit,
  savePaymentMethod,
  paymentMethodInit,
  resetCart,
  addToCart,
  changeQty,
  removeFromCart,
  resetShippingData
} = cartSlice.actions;

/***/ })

};
;