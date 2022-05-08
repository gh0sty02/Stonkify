"use strict";
(() => {
var exports = {};
exports.id = 499;
exports.ids = [499];
exports.modules = {

/***/ 4672:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ orderList),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./store.ts
var store_0 = __webpack_require__(6594);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/OrderListScreen.tsx







const OrderListScreen = ({
  data: {
    token,
    user,
    orders
  }
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: orders && token && user.isAdmin && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: "Orders"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Table, {
        striped: true,
        bordered: true,
        hover: true,
        responsive: true,
        className: "table-sm",
        children: [/*#__PURE__*/jsx_runtime_.jsx("thead", {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
            children: [/*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "ID"
            }), /*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "USER"
            }), /*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "DATE"
            }), /*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "TOTAL"
            }), /*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "PAID"
            }), /*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "DELIVERED"
            })]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
          children: orders.map(order => {
            var _order$createdAt;

            return /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
              children: [/*#__PURE__*/jsx_runtime_.jsx("td", {
                children: order._id
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: order.user && order.user.name
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: (_order$createdAt = order.createdAt) === null || _order$createdAt === void 0 ? void 0 : _order$createdAt.substring(0, 10)
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                children: ["$", order.totalPrice]
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: order.isPaid ? external_moment_default()(order.paidAt).format("DD/MM/YYYY") : /*#__PURE__*/jsx_runtime_.jsx("i", {
                  className: "fas fa-times",
                  style: {
                    color: "red"
                  }
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: order.isDelivered ? external_moment_default()(order.deliveredAt).format("DD/MM/YYYY") : /*#__PURE__*/jsx_runtime_.jsx("i", {
                  className: "fas fa-times",
                  style: {
                    color: "red"
                  }
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                  href: `/orders/${order._id}`,
                  children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                    variant: "light",
                    className: "btn-sm",
                    children: "Details"
                  })
                })
              })]
            }, order._id);
          })
        })]
      })]
    })
  });
};

/* harmony default export */ const screens_OrderListScreen = (OrderListScreen);
// EXTERNAL MODULE: ./services/orderApi.ts
var orderApi = __webpack_require__(8892);
;// CONCATENATED MODULE: ./pages/admin/orderList.tsx












const UserList = ({
  orders,
  user,
  token
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const router = (0,router_.useRouter)();
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | All Orders"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: orders && user.isAdmin && /*#__PURE__*/jsx_runtime_.jsx(screens_OrderListScreen, {
        data: {
          orders,
          user,
          token
        }
      })
    })]
  });
};

const getServerSideProps = store_0/* wrapper.getServerSideProps */.YS.getServerSideProps( //@ts-ignore
store => async context => {
  const store = (0,store_0/* makeStore */.n)();
  const session = await (0,react_.getSession)({
    req: context.req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;
  const user = session === null || session === void 0 ? void 0 : session.user;
  const orders = await store.dispatch(orderApi/* getAllOrders.initiate */.zk.initiate(token));

  if (token && user.isAdmin) {
    if ("data" in orders) {
      return {
        props: {
          token,
          orders: orders.data,
          user
        }
      };
    }
  }

  return {
    redirect: {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  };
});
/* harmony default export */ const orderList = (UserList);

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
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(4672)));
module.exports = __webpack_exports__;

})();