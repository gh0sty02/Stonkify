"use strict";
(() => {
var exports = {};
exports.id = 272;
exports.ids = [272];
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

/***/ 7852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _keyword_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./services/productsApi.ts
var productsApi = __webpack_require__(2307);
// EXTERNAL MODULE: ./components/Message.tsx
var Message = __webpack_require__(5348);
// EXTERNAL MODULE: ./components/Product.tsx
var Product = __webpack_require__(7466);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/ListProducts.tsx






const ListProducts = ({
  products,
  loading
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
    children: [products.map(prod => /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
      sm: 12,
      md: 4,
      xl: 3,
      children: /*#__PURE__*/jsx_runtime_.jsx(Product/* default */.Z, {
        product: prod
      })
    }, prod._id)), products.length === 0 && !loading && /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
      children: "No Products Found"
    })]
  });
};

/* harmony default export */ const components_ListProducts = (ListProducts);
// EXTERNAL MODULE: ./components/Loader.tsx
var Loader = __webpack_require__(6121);
// EXTERNAL MODULE: ./components/Paginate.tsx
var Paginate = __webpack_require__(6989);
;// CONCATENATED MODULE: ./pages/search/[...keyword].tsx












const Products = ({
  keyword,
  page
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    data,
    isLoading,
    isError
  } = (0,productsApi/* useGetAllProductsQuery */.Jy)({
    pageNumber: page,
    keyword
  });
  const products = data === null || data === void 0 ? void 0 : data.products;
  const pages = data === null || data === void 0 ? void 0 : data.pages; // useEffect(() => {
  //   if (keyword) {
  //     dispatch(getAllProducts({ keyword, pageNumber: page }));
  //   }
  // }, [keyword, page]);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | Search Products"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: "Products"
      }), isLoading && /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
        href: "/",
        passHref: true,
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          className: "btn btn-light",
          children: "Go Back"
        })
      }), products && /*#__PURE__*/jsx_runtime_.jsx(components_ListProducts, {
        products: products,
        loading: isLoading
      }), pages && /*#__PURE__*/jsx_runtime_.jsx(Paginate/* default */.Z, {
        pages: pages,
        page: page,
        keyword: keyword
      })]
    })]
  });
};

const getServerSideProps = context => {
  var _context$params;

  if ((_context$params = context.params) !== null && _context$params !== void 0 && _context$params.keyword) {
    const params = context.params.keyword;
    const query = params[0].split("&");
    const keywords = query.map(keyword => keyword.split("=")).flat();
    const searchQuery = keywords[1];
    const page = keywords[3];
    return {
      props: {
        keyword: searchQuery,
        page
      }
    };
  } else {
    return {
      props: {
        keyword: "",
        page: 1
      }
    };
  }
};
/* harmony default export */ const _keyword_ = (Products);

/***/ }),

/***/ 4335:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit/query/react");

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
var __webpack_exports__ = __webpack_require__.X(0, [932,664,307,592,838], () => (__webpack_exec__(7852)));
module.exports = __webpack_exports__;

})();