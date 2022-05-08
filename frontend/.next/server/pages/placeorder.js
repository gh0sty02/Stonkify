"use strict";
(() => {
var exports = {};
exports.id = 567;
exports.ids = [567];
exports.modules = {

/***/ 5348:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




function Message(props) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Alert, {
    variant: props.varient,
    children: props.children
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message);

/***/ }),

/***/ 9073:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ placeorder),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./components/CheckoutSteps.tsx
var CheckoutSteps = __webpack_require__(238);
// EXTERNAL MODULE: ./components/Message.tsx
var Message = __webpack_require__(5348);
// EXTERNAL MODULE: ./services/orderApi.ts
var orderApi = __webpack_require__(8892);
// EXTERNAL MODULE: ./reducers/orderSlice.ts
var orderSlice = __webpack_require__(3139);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./reducers/cartSlice.ts
var cartSlice = __webpack_require__(4749);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/PlaceOrderScreen.tsx














const PlaceOrderScreen = () => {
  var _session$data;

  const dispatch = (0,external_react_redux_.useDispatch)();
  const router = (0,router_.useRouter)();
  (0,external_react_.useEffect)(() => {
    const shippingAddress = localStorage.getItem("shippingAddress");
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (shippingAddress && cartItems.length > 0) {
      dispatch((0,cartSlice/* shippingAddressInit */.Al)(JSON.parse(shippingAddress)));
      dispatch((0,cartSlice/* cartInit */.bJ)(cartItems));
    }
  }, []);
  const {
    cartItems,
    shippingAddress,
    paymentMethod
  } = (0,external_react_redux_.useSelector)(state => state.cart);
  const [createOrder, {
    isLoading,
    isError,
    error
  }] = (0,orderApi/* useCreateOrderMutation */.kD)(); // const { user, token } = useSelector((state: AppState) => state.auth);

  const session = (0,react_.useSession)();
  const token = (_session$data = session.data) === null || _session$data === void 0 ? void 0 : _session$data.accessToken; // calculate price

  const addDecimals = n => Number((Math.round(n * 100) / 100).toFixed(2));

  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const taxPrice = addDecimals(Number(0.15 * Number(itemsPrice)));
  const shippingPrice = addDecimals(itemsPrice > 0 ? 0 : 100);
  const totalPrice = Number((Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2));
  const {
    currentOrder,
    success,
    loading
  } = (0,external_react_redux_.useSelector)(state => state.order);
  const cartProducts = cartItems.map(item => {
    return {
      productId: item.productId,
      qty: item.qty,
      price: item.price,
      name: item.name,
      image: item.image
    };
  });

  const placeOrderHandler = async e => {
    e.preventDefault();

    if (paymentMethod && token) {
      const order = await createOrder({
        orderItems: cartProducts,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        token,
        isPaid: false
      });

      if ("data" in order) {
        dispatch((0,orderSlice/* setOrder */.OL)(order.data));
        router.push(`/orders/${order.data._id}`);
      }
    }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(CheckoutSteps/* default */.Z, {
      step1: true,
      step2: true,
      step3: true,
      step4: true
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
        md: 8,
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup, {
          variant: "flush",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
            children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
              children: "Shipping"
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
              children: [/*#__PURE__*/jsx_runtime_.jsx("strong", {
                children: "Address : "
              }), shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.address, ", ", shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.city, " ", shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.postalCode, ", ", shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
            children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
              children: "Payment Method"
            }), /*#__PURE__*/jsx_runtime_.jsx("strong", {
              children: "Method : "
            }), paymentMethod]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
            children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
              children: "Order Items"
            }), cartItems.length === 0 ? /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
              children: "Your Cart is Empty"
            }) : /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup, {
              variant: "flush",
              children: cartItems.map((item, i) => /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                  children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                    md: 1,
                    children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Image, {
                      src: `${"http://localhost:5000"}${item.image}`,
                      alt: item.name,
                      fluid: true,
                      rounded: true
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                    children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                      href: `/product/${item.productId}`,
                      children: item.name
                    })
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                    md: 4,
                    children: [item.qty, " x $", item.price, " = $", item.qty * item.price]
                  })]
                })
              }, i))
            })]
          })]
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
        md: 4,
        children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Card, {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup, {
            variant: "flush",
            children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: /*#__PURE__*/jsx_runtime_.jsx("h2", {
                children: "Order Summary"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                  children: "Items"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                  children: ["$", itemsPrice]
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                  children: "Shipping"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                  children: ["$", shippingPrice]
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                  children: "Tax"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                  children: ["$", taxPrice]
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                  children: "Total"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                  children: ["$", totalPrice]
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: error && /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
                varient: "error",
                children: error.data.message
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Button, {
                type: "button",
                className: "btn-block",
                disabled: cartItems.length === 0,
                onClick: placeOrderHandler,
                style: {
                  width: "100%"
                },
                children: [" ", "Place Order"]
              })
            })]
          })
        })
      })]
    })]
  });
};

/* harmony default export */ const screens_PlaceOrderScreen = (PlaceOrderScreen);
// EXTERNAL MODULE: ./store.ts
var store = __webpack_require__(6594);
;// CONCATENATED MODULE: ./pages/placeorder/index.tsx










const PlaceOrder = () => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const router = (0,router_.useRouter)();
  const {
    user
  } = (0,external_react_redux_.useSelector)(state => state.auth); // const { cartItems, shippingAddress, paymentMethod } = initData();

  const {
    success,
    currentOrder: order
  } = (0,external_react_redux_.useSelector)(state => state.order);
  (0,external_react_.useEffect)(() => {
    if (success && order) {
      router.push(`/orders/${order === null || order === void 0 ? void 0 : order._id}`);
    }
  }, [success, order]); // useEffect(() => {
  //   if (user) {
  //     dispatch(userInit(user));
  //   }
  //   if (!user) {
  //     router.push("/login");
  //   }
  //   if (cartItems) {
  //     dispatch(cartInit(cartItems));
  //   }
  //   if (shippingAddress) {
  //     dispatch(shippingAddressInit(shippingAddress));
  //   }
  //   if (paymentMethod) {
  //     dispatch(paymentMethodInit(paymentMethod));
  //   }
  // }, [order]);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | Order Summary"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: /*#__PURE__*/jsx_runtime_.jsx(screens_PlaceOrderScreen, {})
    }), ";"]
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
/* harmony default export */ const placeorder = (PlaceOrder);

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 4335:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit/query/react");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

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
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594,238], () => (__webpack_exec__(9073)));
module.exports = __webpack_exports__;

})();