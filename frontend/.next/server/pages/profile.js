"use strict";
(() => {
var exports = {};
exports.id = 277;
exports.ids = [277];
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

/***/ 2373:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ profile),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./reducers/orderSlice.ts
var orderSlice = __webpack_require__(3139);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/Message.tsx
var Message = __webpack_require__(5348);
// EXTERNAL MODULE: ./components/Loader.tsx
var Loader = __webpack_require__(6121);
// EXTERNAL MODULE: ./services/userApi.ts
var userApi = __webpack_require__(2350);
// EXTERNAL MODULE: ./reducers/authSlice.ts
var authSlice = __webpack_require__(8475);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/OrderTable.tsx







const OrderTable = ({
  orders
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Table, {
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
          children: "DATE"
        }), /*#__PURE__*/jsx_runtime_.jsx("th", {
          children: "TOTAL"
        }), /*#__PURE__*/jsx_runtime_.jsx("th", {
          children: "PAID"
        }), /*#__PURE__*/jsx_runtime_.jsx("th", {
          children: "DELIVERED"
        }), /*#__PURE__*/jsx_runtime_.jsx("th", {})]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
      children: orders && orders.map(order => {
        var _order$createdAt;

        const deliveryDate = order.deliveredAt ? new Date(order.deliveredAt) : null;
        const deliveredAt = deliveryDate ? deliveryDate === null || deliveryDate === void 0 ? void 0 : deliveryDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) : /*#__PURE__*/jsx_runtime_.jsx("i", {
          className: "fas fa-times",
          style: {
            color: "red"
          }
        });
        return /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
          children: [/*#__PURE__*/jsx_runtime_.jsx("td", {
            children: order === null || order === void 0 ? void 0 : order._id
          }), /*#__PURE__*/jsx_runtime_.jsx("td", {
            children: order === null || order === void 0 ? void 0 : (_order$createdAt = order.createdAt) === null || _order$createdAt === void 0 ? void 0 : _order$createdAt.substring(0, 10)
          }), /*#__PURE__*/jsx_runtime_.jsx("td", {
            children: order === null || order === void 0 ? void 0 : order.totalPrice
          }), /*#__PURE__*/jsx_runtime_.jsx("td", {
            children: order !== null && order !== void 0 && order.isPaid ? external_moment_default()(order === null || order === void 0 ? void 0 : order.paidAt).format("DD-MM-YYYY") : /*#__PURE__*/jsx_runtime_.jsx("i", {
              className: "fas fa-times",
              style: {
                color: "red"
              }
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("td", {
            children: deliveredAt ? deliveredAt : /*#__PURE__*/jsx_runtime_.jsx("i", {
              className: "fas fa-times",
              style: {
                color: "red"
              }
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("td", {
            children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
              href: `/orders/${order === null || order === void 0 ? void 0 : order._id}`,
              children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                className: "btn-sm",
                variant: "light",
                children: "Details"
              })
            })
          })]
        }, order === null || order === void 0 ? void 0 : order._id);
      })
    })]
  });
};

/* harmony default export */ const components_OrderTable = (OrderTable);
;// CONCATENATED MODULE: ./utils/reloadSession.ts
const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
;// CONCATENATED MODULE: ./components/UpdateUserForm.tsx










const UpdateUserForm = ({
  user,
  token
}) => {
  const {
    0: email,
    1: setEmail
  } = (0,external_react_.useState)("");
  const {
    0: password,
    1: setPassword
  } = (0,external_react_.useState)("");
  const {
    0: name,
    1: setName
  } = (0,external_react_.useState)("");
  const {
    0: confirmPassword,
    1: setConfirmPassword
  } = (0,external_react_.useState)("");
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    0: message,
    1: setMessage
  } = (0,external_react_.useState)(undefined);
  const [updateProfile] = (0,userApi/* useUpdateUserProfileMutation */.LF)();

  const submitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords Don't Match");
    } else {
      if (user && token) {
        const data = await updateProfile({
          name,
          email,
          password,
          token
        });

        if ("data" in data) {
          reloadSession();
          setMessage("Profile Updated");
          dispatch((0,authSlice/* setCredentials */.Dj)({
            user: data.data,
            token
          }));
        }
      }
    }
  };

  (0,external_react_.useEffect)(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [message && /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Alert, {
      children: message
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
          required: true,
          onChange: e => setName(e.target.value)
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
        controlId: "email",
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
          children: "Email Address"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
          type: "email",
          placeholder: "Enter your Email",
          required: true,
          value: email,
          onChange: e => setEmail(e.target.value)
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
        controlId: "password",
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
          children: "Enter Password"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
          type: "password",
          placeholder: "Enter your Password",
          onChange: e => setPassword(e.target.value)
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
        controlId: "confirmPassword",
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
          children: "Confirm Password"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
          type: "password",
          onChange: e => setConfirmPassword(e.target.value)
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Button, {
        type: "submit",
        variant: "primary",
        className: "my-2",
        children: [" ", "Update"]
      })]
    })]
  });
};

/* harmony default export */ const components_UpdateUserForm = (UpdateUserForm);
;// CONCATENATED MODULE: ./screens/ProfileScreen.tsx














const ProfileScreen = ({
  data: {
    orders,
    token,
    user
  }
}) => {
  const router = (0,router_.useRouter)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    0: message,
    1: setMessage
  } = (0,external_react_.useState)(undefined); // const [getMyOrders, { isLoading: ordersLoading, error: ordersError }] =
  //   useGetMyOrdersMutation();
  // const orders = useSelector((state: AppState) => state.order.userOrders);

  const [updateProfile, {
    isLoading,
    error,
    isSuccess,
    data: updatedUser
  }] = (0,userApi/* useUpdateUserProfileMutation */.LF)(); // const useInitUserOrders = async (token: string) => {
  //   const orders = await getMyOrders({ token });
  //   if ("data" in orders) {
  //     dispatch(setUserOrders(orders.data as IOrder[]));
  //   }
  // };

  (0,external_react_.useEffect)(() => {
    if (updatedUser) {
      dispatch((0,authSlice/* setCredentials */.Dj)({
        token: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.token,
        user: updatedUser
      }));
    }
  }, [updatedUser]); // const submitHandler = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setMessage("Passwords Don't Match");
  //   } else {
  //     if (user && user.token) {
  //       updateProfile({ name, email, password });
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (user) {
  //     setName(user.name as string);
  //     setEmail(user.email as string);
  //   }
  // }, [user]);

  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: user && orders && /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Container, {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
          md: 3,
          children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
            children: "User Profile"
          }), message && /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
            varient: "danger",
            children: message
          }), error && /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
            varient: "danger",
            children: error.data.message
          }), isSuccess && /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
            varient: "success",
            children: `Profile Updated Successfully`
          }), isLoading && /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}), /*#__PURE__*/jsx_runtime_.jsx(components_UpdateUserForm, {
            user: user,
            token: token
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
          md: 9,
          children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
            children: "My Order"
          }), /*#__PURE__*/jsx_runtime_.jsx(components_OrderTable, {
            orders: orders
          })]
        })]
      })
    })
  });
};

/* harmony default export */ const screens_ProfileScreen = (ProfileScreen);
// EXTERNAL MODULE: ./services/orderApi.ts
var orderApi = __webpack_require__(8892);
// EXTERNAL MODULE: ./store.ts
var store = __webpack_require__(6594);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
;// CONCATENATED MODULE: ./pages/profile/index.tsx













const Profile = ({
  user,
  token,
  orders
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  (0,external_react_.useEffect)(() => {
    dispatch((0,authSlice/* userInit */.Fb)(user));
  }, [user]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("title", {
        children: ["Stonkify | ", `${user === null || user === void 0 ? void 0 : user.name}'s Profile`]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: user && orders && /*#__PURE__*/jsx_runtime_.jsx(screens_ProfileScreen, {
        data: {
          user,
          orders,
          token
        }
      })
    })]
  });
};

const getServerSideProps = store/* wrapper.getServerSideProps */.YS.getServerSideProps(store => async ({
  req,
  res
}) => {
  const session = await (0,react_.getSession)({
    req
  });
  const token = session === null || session === void 0 ? void 0 : session.accessToken;

  if (token) {
    const user = await store.dispatch(userApi/* tokenLogin.initiate */.Bm.initiate(token));
    const orders = await store.dispatch(orderApi/* getMyOrders.initiate */.ze.initiate(token));

    if ("data" in user && "data" in orders) {
      const userDetails = user.data;
      const orderDetails = orders.data;
      store.dispatch((0,authSlice/* userInit */.Fb)(userDetails));
      store.dispatch((0,orderSlice/* setAllOrders */.Ot)(orderDetails));
      return {
        props: {
          user: userDetails,
          orders: orderDetails,
          token
        }
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false
    }
  };
});
/* harmony default export */ const profile = (Profile);

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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594], () => (__webpack_exec__(2373)));
module.exports = __webpack_exports__;

})();