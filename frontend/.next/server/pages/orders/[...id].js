"use strict";
(() => {
var exports = {};
exports.id = 743;
exports.ids = [743];
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

/***/ 9660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _id_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/Message.tsx
var Message = __webpack_require__(5348);
;// CONCATENATED MODULE: external "@stripe/stripe-js"
const stripe_js_namespaceObject = require("@stripe/stripe-js");
;// CONCATENATED MODULE: ./utils/getStripe.ts

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = (0,stripe_js_namespaceObject.loadStripe)("pk_test_51KD67rSEMve4LTTE3FecGBULj5GSvl7UcnqtMjk21K5dxVR81b5GOq7o1RKcF347RmpoAvybZUSeYrpseYT6G1fN00Jwhh3r9W");
  }

  return stripePromise;
};

/* harmony default export */ const utils_getStripe = (getStripe);
;// CONCATENATED MODULE: ./utils/apiHelper.ts
async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
async function fetchPostJSON(url, data) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      // no-cors, *cors, same-origin
      cache: "no-cache",
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json" // 'Content-Type': 'application/x-www-form-urlencoded',

      },
      redirect: "follow",
      // manual, *follow, error
      referrerPolicy: "no-referrer",
      // no-referrer, *client
      body: JSON.stringify(data || {}) // body data type must match "Content-Type" header

    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message);
  }
}
// EXTERNAL MODULE: ./services/orderApi.ts
var orderApi = __webpack_require__(8892);
// EXTERNAL MODULE: ./reducers/orderSlice.ts
var orderSlice = __webpack_require__(3139);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/OrderScreen.tsx





 //@ts-ignore










const OrderScreen = ({
  user,
  token
}) => {
  var _order$shippingAddres, _order$shippingAddres2, _order$shippingAddres3, _order$shippingAddres4;

  const dispatch = (0,external_react_redux_.useDispatch)();
  const router = (0,router_.useRouter)();
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const [changeDeliveryStatus, {
    isLoading,
    isSuccess
  }] = (0,orderApi/* useChangeDeliveryStatusMutation */.lM)();
  const {
    currentOrder: order
  } = (0,external_react_redux_.useSelector)(state => state.order);

  const deliverProductHandler = async () => {
    if (user !== null && user !== void 0 && user.isAdmin && token && order && order._id && !order.isDelivered) {
      const data = await changeDeliveryStatus({
        orderId: order._id,
        token
      });

      if ("data" in data) {
        dispatch((0,orderSlice/* orderInit */.wC)(data.data));
      }
    }
  };

  const paymentHandler = async e => {
    e.preventDefault();

    if (order) {
      setLoading(true);
      const response = await fetchPostJSON("/api/checkout_sessions", {
        order
      }); // create checkout session

      const stripe = await utils_getStripe();
      const {
        error
      } = await stripe.redirectToCheckout({
        // passing the sessionId of the strip payment to get the payment session
        sessionId: response.id
      });
      console.warn(error.message);
      setLoading(false);
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
    children: /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
      children: order && user && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h1", {
          children: ["Order ", order === null || order === void 0 ? void 0 : order._id]
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
                    children: "Name :"
                  }), " ", user.name]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                  children: [/*#__PURE__*/jsx_runtime_.jsx("strong", {
                    children: "Email :"
                  }), " ", /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                    href: `mailto:${user.email}`,
                    passHref: true,
                    children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                      children: user.email
                    })
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                  children: [/*#__PURE__*/jsx_runtime_.jsx("strong", {
                    children: "Address : "
                  }), (_order$shippingAddres = order.shippingAddress) === null || _order$shippingAddres === void 0 ? void 0 : _order$shippingAddres.address, ",", " ", (_order$shippingAddres2 = order.shippingAddress) === null || _order$shippingAddres2 === void 0 ? void 0 : _order$shippingAddres2.city, " ", (_order$shippingAddres3 = order.shippingAddress) === null || _order$shippingAddres3 === void 0 ? void 0 : _order$shippingAddres3.postalCode, ",", " ", (_order$shippingAddres4 = order.shippingAddress) === null || _order$shippingAddres4 === void 0 ? void 0 : _order$shippingAddres4.country]
                }), order.isDelivered ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(Message/* default */.Z, {
                  varient: "success",
                  children: ["Delivered On", " ", external_moment_default()(order.deliveredAt).format("DD/MM/YYYY")]
                }) : /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
                  varient: "danger",
                  children: "Not Delivered"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
                children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                  children: "Payment Method"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                  children: [/*#__PURE__*/jsx_runtime_.jsx("strong", {
                    children: "Method : "
                  }), order.paymentMethod]
                }), order.isPaid ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(Message/* default */.Z, {
                  varient: "success",
                  children: ["Paid on ", external_moment_default()(order.paidAt).format("DD/MM/YYYY")]
                }) : /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
                  varient: "danger",
                  children: "Not Paid"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
                children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                  children: "Order Items"
                }), order && (order === null || order === void 0 ? void 0 : order.orderItems.length) === 0 ? /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
                  children: "Your Cart is Empty"
                }) : /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup, {
                  variant: "flush",
                  children: order.orderItems.map((item, i) => /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
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
                      children: ["$", order.itemsPrice]
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                    children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                      children: "Shipping"
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                      children: ["$", order.shippingPrice]
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                    children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                      children: "Tax"
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                      children: ["$", order.taxPrice]
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                    children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                      children: "Total"
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                      children: ["$", order.totalPrice]
                    })]
                  })
                }), !order.isPaid && /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                    target: "_blank",
                    style: {
                      width: "100%"
                    },
                    type: "submit",
                    onClick: paymentHandler,
                    children: "Pay"
                  })
                }), (user === null || user === void 0 ? void 0 : user.isAdmin) && order.isPaid && !order.isDelivered && /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                    style: {
                      width: "100%"
                    },
                    onClick: () => {
                      deliverProductHandler();
                    },
                    children: !isLoading && !isSuccess ? "Mark as Deliver" : "Delivered"
                  })
                })]
              })
            })
          })]
        })]
      })
    })
  });
};

/* harmony default export */ const screens_OrderScreen = (OrderScreen);
// EXTERNAL MODULE: ./store.ts
var store = __webpack_require__(6594);
// EXTERNAL MODULE: ./services/userApi.ts
var userApi = __webpack_require__(2350);
;// CONCATENATED MODULE: ./pages/orders/[...id].tsx












const Order = ({
  order,
  user,
  token
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  (0,external_react_.useEffect)(() => {
    dispatch((0,orderSlice/* orderInit */.wC)(order));
  }, []);
  return /*#__PURE__*/jsx_runtime_.jsx(external_react_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
        children: /*#__PURE__*/jsx_runtime_.jsx("title", {
          children: "Stonkify | Order Details"
        })
      }), order && user && /*#__PURE__*/jsx_runtime_.jsx(screens_OrderScreen, {
        order: order,
        user: user,
        token: token
      })]
    })
  });
};

const getServerSideProps = store/* wrapper.getServerSideProps */.YS.getServerSideProps( //@ts-ignore
store => async context => {
  const queries = context.query.id;
  const session_id = context.query.session_id;
  const id = queries[0];
  const session = await (0,react_.getSession)({
    req: context.req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;

  if (token && session_id) {
    if (session_id) {
      const data = await store.dispatch(orderApi/* changePaymentStatus.initiate */.kg.initiate({
        orderId: id,
        token
      }));

      if ("data" in data) {
        store.dispatch((0,orderSlice/* resetOrders */.GO)());
        return {
          props: {
            order: data.data,
            user: session === null || session === void 0 ? void 0 : session.user,
            token
          }
        };
      }
    }
  }

  if (token) {
    const order = await store.dispatch(orderApi/* getOrder.initiate */.co.initiate({
      orderId: id,
      token
    }));
    const user = await store.dispatch(userApi/* tokenLogin.initiate */.Bm.initiate(token));

    if ("data" in order && "data" in user) {
      return {
        props: {
          order: order.data,
          user: user.data,
          token
        }
      };
    }
  }

  return {
    props: {
      order: null,
      user: null
    },
    redirect: {
      pathname: "/login"
    }
  };
});
/* harmony default export */ const _id_ = (Order);

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 4335:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit/query/react");

/***/ }),

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(9660)));
module.exports = __webpack_exports__;

})();