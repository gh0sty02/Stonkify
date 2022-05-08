"use strict";
(() => {
var exports = {};
exports.id = 842;
exports.ids = [842];
exports.modules = {

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

/***/ 8926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ userList),
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
var store = __webpack_require__(6594);
// EXTERNAL MODULE: ./services/userApi.ts
var userApi = __webpack_require__(2350);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./components/Loader.tsx
var Loader = __webpack_require__(6121);
// EXTERNAL MODULE: ./components/Message.tsx
var Message = __webpack_require__(5348);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/UserListScreen.tsx










const UserListScreen = ({
  data: {
    users,
    token,
    user
  }
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    isLoading,
    isError,
    error,
    data,
    refetch
  } = (0,userApi/* useGetAllUsersQuery */.wv)(token);
  const [deleteUser] = (0,userApi/* useDeleteUserMutation */.I1)();

  const deleteHandler = data => {
    if (window.confirm("Are You Sure ?")) {
      deleteUser({
        id: data.id,
        token: data.token
      });
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: users && token && user.isAdmin && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: "Users"
      }), isLoading ? /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}) : error ? /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
        varient: "danger",
        children: error.data.message
      }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Table, {
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
              children: "EMAIL"
            }), /*#__PURE__*/jsx_runtime_.jsx("th", {
              children: "ADMIN"
            })]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
          children: users.map(user => /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
            children: [/*#__PURE__*/jsx_runtime_.jsx("td", {
              children: user._id
            }), /*#__PURE__*/jsx_runtime_.jsx("td", {
              children: user.name
            }), /*#__PURE__*/jsx_runtime_.jsx("td", {
              children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                href: `mailto:${user.email}`,
                children: user.email
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("td", {
              children: user.isAdmin ? /*#__PURE__*/jsx_runtime_.jsx("i", {
                className: "fas fa-check",
                style: {
                  color: "green"
                }
              }) : /*#__PURE__*/jsx_runtime_.jsx("i", {
                className: "fas fa-times",
                style: {
                  color: "red"
                }
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("td", {
              children: user._id
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
              children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                href: `/admin/user/${user._id}`,
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
                onClick: () => deleteHandler({
                  id: user._id,
                  token: token
                }),
                children: /*#__PURE__*/jsx_runtime_.jsx("i", {
                  className: "fas fa-trash"
                })
              })]
            })]
          }, user._id))
        })]
      })]
    })
  });
};

/* harmony default export */ const screens_UserListScreen = (UserListScreen);
;// CONCATENATED MODULE: ./pages/admin/userList.tsx










const UserList = ({
  users,
  token,
  user
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Stonkify | All Users"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: users && token && /*#__PURE__*/jsx_runtime_.jsx(screens_UserListScreen, {
        data: {
          users,
          token,
          user
        }
      })
    })]
  });
};

const getServerSideProps = store/* wrapper.getServerSideProps */.YS.getServerSideProps( //@ts-ignore
store => async context => {
  const session = await (0,react_.getSession)({
    req: context.req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;
  const users = await store.dispatch(userApi/* getAllUsers.initiate */.AW.initiate(token));
  const user = session === null || session === void 0 ? void 0 : session.user;

  if ("data" in users) {
    return {
      props: {
        users: users.data,
        token,
        user
      }
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false
    }
  };
});
/* harmony default export */ const userList = (UserList);

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(8926)));
module.exports = __webpack_exports__;

})();