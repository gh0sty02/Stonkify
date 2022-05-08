"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 4532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/credentials"
const credentials_namespaceObject = require("next-auth/providers/credentials");
var credentials_default = /*#__PURE__*/__webpack_require__.n(credentials_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].ts


/* harmony default export */ const _nextauth_ = (external_next_auth_default()({
  // Configure one or more authentication providers
  //@ts-ignore
  providers: [credentials_default()({
    async authorize(credentials, req) {
      const res = await fetch(`${"http://localhost:5000"}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const user = await res.json();

      if (res.ok && user) {
        return user;
      }

      return null;
    },

    credentials: {
      email: {
        label: "email",
        type: "text"
      },
      password: {
        label: "Password",
        type: "password"
      }
    }
  })],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt: async ({
      token,
      user,
      account
    }) => {
      if (user) {
        token = {
          accessToken: user.token
        };
        token.user = user;
      }

      return token;
    },
    session: async ({
      session,
      token
    }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    }
  }
}));

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4532));
module.exports = __webpack_exports__;

})();