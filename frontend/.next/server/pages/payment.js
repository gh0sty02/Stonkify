"use strict";
(() => {
var exports = {};
exports.id = 252;
exports.ids = [252];
exports.modules = {

/***/ 7325:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



const FormContainer = ({
  children
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_0__.Container, {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_0__.Row, {
      className: "justify-content-md-center",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_0__.Col, {
        xs: 12,
        md: 6,
        children: children
      })
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormContainer);

/***/ }),

/***/ 3157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ payment),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/FormContainer.tsx
var FormContainer = __webpack_require__(7325);
// EXTERNAL MODULE: ./reducers/cartSlice.ts
var cartSlice = __webpack_require__(4749);
// EXTERNAL MODULE: ./components/CheckoutSteps.tsx
var CheckoutSteps = __webpack_require__(238);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/PaymentMethodScreen.tsx










const PaymentScreen = () => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const router = (0,router_.useRouter)();
  const {
    shippingAddress
  } = (0,external_react_redux_.useSelector)(state => state.cart);
  (0,external_react_.useEffect)(() => {
    if (!shippingAddress) {
      router.push("/shipping");
    }
  }, []);
  const {
    0: paymentMethod,
    1: setPaymentMethod
  } = (0,external_react_.useState)("Stripe");

  const submitHandler = e => {
    e.preventDefault();
    dispatch((0,cartSlice/* savePaymentMethod */.BX)(paymentMethod));
    router.push("/placeorder");
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(FormContainer/* default */.Z, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(CheckoutSteps/* default */.Z, {
      step1: true,
      step2: true,
      step3: true
    }), /*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: "Payment Method"
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
      onSubmit: submitHandler,
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
          as: "legend",
          children: "Select Method"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
          children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Check, {
            type: "radio",
            label: "Stripe or Credit Card",
            id: "Stripe",
            name: "paymentMethod",
            value: "Stripe",
            checked: true,
            className: "pb-3",
            onChange: e => setPaymentMethod(e.target.value)
          })
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
        type: "submit",
        variant: "primary",
        children: "Continue"
      })]
    })]
  });
};

/* harmony default export */ const PaymentMethodScreen = (PaymentScreen);
// EXTERNAL MODULE: ./store.ts
var store = __webpack_require__(6594);
;// CONCATENATED MODULE: ./pages/payment/index.tsx








const PaymentMethod = () => {
  // const { user, cartItems, shippingAddress, paymentMethod } = initData();
  const dispatch = (0,external_react_redux_.useDispatch)(); // useEffect(() => {
  //   if (user) {
  //     dispatch(userInit(user));
  //   }
  //   if (cartItems) {
  //     dispatch(cartInit(cartItems));
  //   }
  //   if (shippingAddress) {
  //     dispatch(shippingAddressInit(shippingAddress));
  //   }
  // }, [user, cartItems, shippingAddressInit]);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | Payment Method"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: /*#__PURE__*/jsx_runtime_.jsx(PaymentMethodScreen, {})
    })]
  });
};

const getServerSideProps = store/* wrapper.getServerSideProps */.YS.getServerSideProps(store => async ({
  req,
  res
}) => {
  return {
    props: {}
  };
});
/* harmony default export */ const payment = (PaymentMethod);

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 4335:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit/query/react");

/***/ }),

/***/ 5648:
/***/ ((module) => {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4161:
/***/ ((module) => {

module.exports = require("redux-persist");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594,238], () => (__webpack_exec__(3157)));
module.exports = __webpack_exports__;

})();