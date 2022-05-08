"use strict";
(() => {
var exports = {};
exports.id = 814;
exports.ids = [814];
exports.modules = {

/***/ 6989:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = ""
}) => {
  return pages > 1 ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Pagination, {
    children: [...Array(pages).keys()].map(x => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
      href: !isAdmin ? keyword ? `/search/query=${keyword}&page=${x + 1}` : `/?page=${x + 1}` : `/admin/productList/${x + 1}`,
      passHref: true,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Pagination.Item, {
        active: x + 1 === page,
        children: x + 1
      })
    }, x + 1))
  }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Paginate);

/***/ }),

/***/ 6554:
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
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./components/Paginate.tsx
var Paginate = __webpack_require__(6989);
// EXTERNAL MODULE: ./services/productsApi.ts
var productsApi = __webpack_require__(2307);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/ProductListScreen.tsx










const ProductListScreen = ({
  data: {
    products,
    page,
    pages,
    token,
    isAdmin
  }
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [deleteProduct, {
    isLoading,
    error
  }] = (0,productsApi/* useDeleteProductMutation */.xq)();
  const {
    refetch
  } = (0,productsApi/* useGetAllProductsQuery */.Jy)({
    pageNumber: 1,
    keyword: ""
  });

  const deleteHandler = async (productId, token) => {
    if (token && isAdmin) {
      const data = await deleteProduct({
        productId: productId,
        token: token
      });

      if ("data" in data) {
        refetch();
      }
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: products && token && isAdmin && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Row, {
        className: "align-items-center",
        children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
          md: 10,
          children: /*#__PURE__*/jsx_runtime_.jsx("h1", {
            children: "Products"
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Table, {
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
                children: "NAME"
              }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                children: "PRICE"
              }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                children: "CATEGORY"
              }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                children: "BRAND"
              }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                children: "Action"
              })]
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
            children: products.map(product => /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
              children: [/*#__PURE__*/jsx_runtime_.jsx("td", {
                children: product._id
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: product.name
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                children: ["$", product.price]
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: product.category
              }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                children: product.brand
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                  href: `/admin/product/edit/${product._id}`,
                  children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                    variant: "light",
                    className: "btn-sm",
                    children: /*#__PURE__*/jsx_runtime_.jsx("i", {
                      className: "fas fa-edit"
                    })
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                  variant: "danger",
                  className: "btn-sm",
                  onClick: () => deleteHandler(product._id, token),
                  children: /*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "fas fa-trash"
                  })
                })]
              })]
            }, product._id))
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(Paginate/* default */.Z, {
          pages: pages,
          page: page,
          isAdmin: true
        })]
      })]
    })
  });
};

/* harmony default export */ const screens_ProductListScreen = (ProductListScreen);
// EXTERNAL MODULE: ./store.ts
var store_0 = __webpack_require__(6594);
;// CONCATENATED MODULE: ./pages/admin/productList/[id].tsx










const ProductList = ({
  page,
  products,
  token,
  isAdmin,
  pages
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | All Products"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: products && token && page && /*#__PURE__*/jsx_runtime_.jsx(screens_ProductListScreen, {
        data: {
          products,
          token,
          page,
          pages,
          isAdmin
        }
      })
    })]
  });
};

const getServerSideProps = store_0/* wrapper.getServerSideProps */.YS.getServerSideProps( //@ts-ignore
store => async context => {
  const store = (0,store_0/* makeStore */.n)();
  const page = context.query.id;
  const session = await (0,react_.getSession)({
    req: context.req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;
  const user = session === null || session === void 0 ? void 0 : session.user;
  const products = await store.dispatch(productsApi/* getAllProducts.initiate */.Dg.initiate({
    keyword: "",
    pageNumber: parseInt(page)
  }));

  if (token && user.isAdmin) {
    if ("data" in products) {
      var _products$data, _products$data2;

      return {
        props: {
          token,
          products: (_products$data = products.data) === null || _products$data === void 0 ? void 0 : _products$data.products,
          pages: (_products$data2 = products.data) === null || _products$data2 === void 0 ? void 0 : _products$data2.pages,
          page,
          isAdmin: user.isAdmin
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
/* harmony default export */ const _id_ = (ProductList);

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(6554)));
module.exports = __webpack_exports__;

})();