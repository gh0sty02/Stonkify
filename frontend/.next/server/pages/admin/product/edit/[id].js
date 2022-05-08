"use strict";
(() => {
var exports = {};
exports.id = 530;
exports.ids = [530];
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

/***/ 6121:
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




const Loader = () => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Spinner, {
    animation: "border",
    role: "status",
    style: {
      width: "100px",
      height: "100px",
      margin: "auto",
      display: "block"
    },
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
      className: "sr-only",
      children: "Loading..."
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ 1867:
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
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./store.ts
var store_0 = __webpack_require__(6594);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: ./components/FormContainer.tsx
var FormContainer = __webpack_require__(7325);
// EXTERNAL MODULE: ./components/Loader.tsx
var Loader = __webpack_require__(6121);
// EXTERNAL MODULE: ./services/productsApi.ts
var productsApi = __webpack_require__(2307);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/ProductEditScreen.tsx







 // import { resetproduct } from "reducers/createProductSlice";





const ProductEditScreen = ({
  data: {
    token,
    product,
    productId,
    isAdmin
  }
}) => {
  const router = (0,router_.useRouter)();
  const {
    0: price,
    1: setPrice
  } = (0,external_react_.useState)(product.price);
  const {
    0: name,
    1: setName
  } = (0,external_react_.useState)(product.name);
  const {
    0: image,
    1: setImage
  } = (0,external_react_.useState)(product.image);
  const {
    0: brand,
    1: setBrand
  } = (0,external_react_.useState)(product.brand);
  const {
    0: category,
    1: setCategory
  } = (0,external_react_.useState)(product.category);
  const {
    0: countInStock,
    1: setCountInStock
  } = (0,external_react_.useState)(product.countInStock);
  const {
    0: description,
    1: setDescription
  } = (0,external_react_.useState)(product.description);
  const {
    0: uploading,
    1: setUploading
  } = (0,external_react_.useState)(false);
  const [updateProduct, {
    isLoading,
    isSuccess,
    error
  }] = (0,productsApi/* useUpdateProductMutation */.wE)();

  const uploadFileHandler = async e => {
    var _e$target;

    const files = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.files;

    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        const {
          data
        } = await external_axios_default().post(`${"http://localhost:5000"}/api/upload`, formData, config);
        setImage(data);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    const updatedProduct = {
      name,
      brand,
      price,
      image,
      category,
      countInStock,
      description
    };

    if (token && isAdmin) {
      const data = await updateProduct({
        product: updatedProduct,
        productId: product._id,
        token
      });

      if ("data" in data) {
        router.push(`${"http://localhost:3000"}/admin/productList/1`);
      }
    }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/admin/productList",
      passHref: true,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "btn btn-light my-3",
        children: "Go Back"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(FormContainer/* default */.Z, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: "Edit Product"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
        onSubmit: submitHandler,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "name",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Name"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "name",
            placeholder: "Enter your Name",
            value: name,
            onChange: e => setName(e.target.value),
            required: true,
            className: "mb-3"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "price",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Price"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "number",
            placeholder: "Enter Product Price",
            value: price,
            className: "mb-3",
            required: true,
            onChange: e => setPrice(Number(e.target.value))
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "image",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Image"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "text",
            placeholder: "Enter Image Url",
            value: image,
            onChange: e => setImage(e.target.value),
            className: "mb-3",
            required: true
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Select a Image"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "file",
            id: "image-file",
            onChange: uploadFileHandler
          }), uploading && /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {})]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "brand",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Brand"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "text",
            placeholder: "Enter Product Brand",
            value: brand,
            onChange: e => setBrand(e.target.value),
            className: "mb-3",
            required: true
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "countInStock",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "CountInStock"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "text",
            placeholder: "Set Count In Stock ",
            value: countInStock,
            onChange: e => setCountInStock(Number(e.target.value)),
            className: "mb-3"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "category",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Category"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "text",
            placeholder: "Enter Product Category",
            value: category,
            onChange: e => setCategory(e.target.value),
            className: "mb-3",
            required: true
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
          controlId: "escription",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Description"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "text",
            placeholder: "Enter Description Url",
            value: description,
            onChange: e => setDescription(e.target.value),
            className: "mb-3",
            required: true
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Button, {
          type: "submit",
          variant: "primary",
          className: "my-2",
          children: [" ", "Update"]
        })]
      })]
    })]
  });
};

/* harmony default export */ const screens_ProductEditScreen = (ProductEditScreen);
;// CONCATENATED MODULE: ./pages/admin/product/edit/[id].tsx










const EditProduct = ({
  token,
  product,
  productId,
  isAdmin
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | Edit Product"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: product && isAdmin && /*#__PURE__*/jsx_runtime_.jsx(screens_ProductEditScreen, {
        data: {
          token,
          productId,
          product,
          isAdmin
        }
      })
    })]
  });
};

const getServerSideProps = store_0/* wrapper.getServerSideProps */.YS.getServerSideProps( //@ts-ignore
store => async context => {
  const store = (0,store_0/* makeStore */.n)();
  const productId = context.query.id;
  const session = await (0,react_.getSession)({
    req: context.req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;
  const user = session === null || session === void 0 ? void 0 : session.user;
  const product = await store.dispatch(productsApi/* getProduct.initiate */.wv.initiate(productId));

  if (token && user.isAdmin) {
    if ("data" in product) {
      return {
        props: {
          token,
          product: product.data,
          productId,
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
/* harmony default export */ const _id_ = (EditProduct);

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 4335:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit/query/react");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(1867)));
module.exports = __webpack_exports__;

})();