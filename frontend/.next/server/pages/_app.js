"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2738:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/SearchBox.tsx






const SearchBox = () => {
  const {
    0: keyword,
    1: setKeyword
  } = (0,external_react_.useState)(" ");
  const router = (0,router_.useRouter)();

  const submitHandler = e => {
    e.preventDefault();

    if (keyword.trim()) {
      router.push(`/search/query=${keyword}&page=1`);
    } else {
      router.push("/");
    }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
    onSubmit: submitHandler,
    className: "d-flex",
    children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
      type: "text",
      name: "q",
      onChange: e => setKeyword(e.target.value),
      placeholder: "Search Products...."
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
      type: "submit",
      variant: "outline-success",
      className: "p-2",
      children: "Search"
    })]
  });
};

/* harmony default export */ const components_SearchBox = (SearchBox);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./reducers/cartSlice.ts
var cartSlice = __webpack_require__(4749);
// EXTERNAL MODULE: ./reducers/orderSlice.ts
var orderSlice = __webpack_require__(3139);
;// CONCATENATED MODULE: ./utils/useResetUserStateData.ts



const useResetUserStateData = () => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  return () => {
    dispatch((0,orderSlice/* resetOrders */.GO)());
    dispatch((0,cartSlice/* resetCart */.s9)());
    dispatch((0,cartSlice/* resetShippingData */.FK)());
  };
};
;// CONCATENATED MODULE: ./components/Header.tsx









const Header = ({
  data: {
    totalCartItems,
    stateUser
  }
}) => {
  const {
    data
  } = (0,react_.useSession)();
  const sessionUser = data === null || data === void 0 ? void 0 : data.user;
  const resetData = useResetUserStateData();
  const user = stateUser ? stateUser : sessionUser;

  const logoutHandler = () => {
    resetData();
    (0,react_.signOut)({
      callbackUrl: "/login"
    });
  };

  return /*#__PURE__*/jsx_runtime_.jsx("header", {
    className: "pb-3",
    children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Navbar, {
      bg: "dark",
      variant: "dark",
      expand: "lg",
      collapseOnSelect: true,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
        children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/",
          passHref: true,
          children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
            children: "Stonkify"
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Toggle, {
          "aria-controls": "basic-navbar-nav"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Navbar.Collapse, {
          id: "basic-navbar-nav",
          style: {
            justifyContent: "space-between"
          },
          children: [/*#__PURE__*/jsx_runtime_.jsx(components_SearchBox, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav, {
            className: "ml-auto ",
            children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
              href: "/cart",
              passHref: true,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav.Link, {
                children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                  className: "fas fa-shopping-cart"
                }), "Cart ", `${totalCartItems > 0 ? `(${totalCartItems})` : ""}`]
              })
            }), user ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.NavDropdown, {
              title: user.name,
              id: "username",
              children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                href: "/profile",
                passHref: true,
                prefetch: false,
                children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.NavDropdown.Item, {
                  children: "Profile"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.NavDropdown.Item, {
                onClick: logoutHandler,
                children: "Logout"
              })]
            }) : /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
              href: "/login",
              passHref: true,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav.Link, {
                children: [" ", /*#__PURE__*/jsx_runtime_.jsx("i", {
                  className: "fas fa-user"
                }), " Sign In"]
              })
            }), user && user.isAdmin && /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.NavDropdown, {
              title: "Admin",
              id: "adminmenu",
              children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                href: "/admin/userList",
                passHref: true,
                prefetch: false,
                children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.NavDropdown.Item, {
                  children: "Users"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                href: "/admin/productList/1",
                passHref: true,
                prefetch: false,
                children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.NavDropdown.Item, {
                  children: "Products"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                href: "/admin/orderList",
                passHref: true,
                prefetch: false,
                children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.NavDropdown.Item, {
                  children: "Orders"
                })
              })]
            })]
          })]
        })]
      })
    })
  });
};

/* harmony default export */ const components_Header = (/*#__PURE__*/(0,external_react_.memo)(Header));
;// CONCATENATED MODULE: ./components/Footer.tsx



const Footer = () => {
  return /*#__PURE__*/jsx_runtime_.jsx("footer", {
    children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Row, {
        children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
          className: "text-center py-3 ",
          children: "Copyright \xA9 Stonkify"
        })
      })
    })
  });
};

/* harmony default export */ const components_Footer = (Footer);
// EXTERNAL MODULE: ./store.ts
var store = __webpack_require__(6594);
// EXTERNAL MODULE: external "react-cookie"
var external_react_cookie_ = __webpack_require__(5515);
;// CONCATENATED MODULE: ./pages/_app.tsx
const _excluded = ["session"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }













function MyApp(_ref) {
  let {
    Component,
    pageProps: {
      session
    }
  } = _ref,
      pageProps = _objectWithoutProperties(_ref.pageProps, _excluded);

  const {
    cartItems
  } = (0,external_react_redux_.useSelector)(state => state.cart);
  const {
    user: stateUser
  } = (0,external_react_redux_.useSelector)(state => state.auth);
  return /*#__PURE__*/jsx_runtime_.jsx(react_.SessionProvider, {
    session: session,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_cookie_.CookiesProvider, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_Header, {
        data: {
          totalCartItems: cartItems.length,
          stateUser: stateUser
        }
      }), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps)), /*#__PURE__*/jsx_runtime_.jsx(components_Footer, {})]
    })
  });
}

/* harmony default export */ const _app = (store/* wrapper.withRedux */.YS.withRedux(MyApp));

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

/***/ 5515:
/***/ ((module) => {

module.exports = require("react-cookie");

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
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(2738)));
module.exports = __webpack_exports__;

})();