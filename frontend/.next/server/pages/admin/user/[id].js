"use strict";
(() => {
var exports = {};
exports.id = 478;
exports.ids = [478];
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

/***/ 4832:
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
// EXTERNAL MODULE: ./store.ts
var store_0 = __webpack_require__(6594);
// EXTERNAL MODULE: ./services/userApi.ts
var userApi = __webpack_require__(2350);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/FormContainer.tsx
var FormContainer = __webpack_require__(7325);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/UserEditScreen.tsx










const UserEditScreen = ({
  data: {
    user,
    token,
    id
  }
}) => {
  const {
    0: email,
    1: setEmail
  } = (0,external_react_.useState)(user.email);
  const {
    0: name,
    1: setName
  } = (0,external_react_.useState)(user.name);
  const {
    0: isAdmin,
    1: setIsAdmin
  } = (0,external_react_.useState)(user.isAdmin);
  const router = (0,router_.useRouter)();
  const [updateUser, {
    isLoading: updateUserLoading,
    error: updateUserError
  }] = (0,userApi/* useUpdateUserMutation */.kD)();

  const submitHandler = e => {
    e.preventDefault();
    const user = {
      name,
      email,
      isAdmin
    };
    updateUser({
      body: user,
      id,
      token
    });
    router.push("/admin/userList"); // }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/admin/userList",
      passHref: true,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "btn btn-light my-3",
        children: "Go Back"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(FormContainer/* default */.Z, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: "Edit User"
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
          controlId: "email",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
            children: "Email Address"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
            type: "email",
            placeholder: "Enter your Email",
            value: email,
            className: "mb-3",
            required: true,
            onChange: e => setEmail(e.target.value)
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Group, {
          controlId: "isadmin",
          children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Check, {
            type: "checkbox",
            label: "Is Admin",
            checked: isAdmin,
            onChange: e => setIsAdmin(e.target.checked),
            className: "mb-3"
          })
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

/* harmony default export */ const screens_UserEditScreen = (UserEditScreen);
;// CONCATENATED MODULE: ./pages/admin/user/[id].tsx










const UserEdit = ({
  user,
  token,
  id
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | Edit User"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: user && /*#__PURE__*/jsx_runtime_.jsx(screens_UserEditScreen, {
        data: {
          user,
          token,
          id
        }
      })
    })]
  });
};

const getServerSideProps = store_0/* wrapper.getServerSideProps */.YS.getServerSideProps( //@ts-ignore
store => async context => {
  const store = (0,store_0/* makeStore */.n)();
  const id = context.query.id;
  const session = await (0,react_.getSession)({
    req: context.req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;
  const user = await store.dispatch(userApi/* getUserById.initiate */.GA.initiate({
    id,
    token
  }));

  if (token) {
    if ("data" in user) {
      return {
        props: {
          token,
          user: user.data,
          id
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
/* harmony default export */ const _id_ = (UserEdit);

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(4832)));
module.exports = __webpack_exports__;

})();