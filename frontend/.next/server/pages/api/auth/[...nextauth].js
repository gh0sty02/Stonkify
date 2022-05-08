"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n  // Configure one or more authentication providers\n  //@ts-ignore\n  providers: [next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n    async authorize(credentials, req) {\n      const res = await fetch(`${\"http://localhost:5000\"}/api/users/login`, {\n        method: \"POST\",\n        body: JSON.stringify(credentials),\n        headers: {\n          \"Content-Type\": \"application/json\"\n        }\n      });\n      const user = await res.json();\n\n      if (res.ok && user) {\n        return user;\n      }\n\n      return null;\n    },\n\n    credentials: {\n      email: {\n        label: \"email\",\n        type: \"text\"\n      },\n      password: {\n        label: \"Password\",\n        type: \"password\"\n      }\n    }\n  })],\n  secret: process.env.JWT_SECRET,\n  callbacks: {\n    jwt: async ({\n      token,\n      user,\n      account\n    }) => {\n      if (user) {\n        token = {\n          accessToken: user.token\n        };\n        token.user = user;\n      }\n\n      return token;\n    },\n    session: async ({\n      session,\n      token\n    }) => {\n      session.user = token.user;\n      session.accessToken = token.accessToken;\n      return session;\n    }\n  }\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUVBLGlFQUFlQSxnREFBUSxDQUFDO0FBQ3RCO0FBRUE7QUFDQUUsRUFBQUEsU0FBUyxFQUFFLENBQ1RELHNFQUFtQixDQUFDO0FBQ2xCLFVBQU1FLFNBQU4sQ0FBZ0JDLFdBQWhCLEVBQTZCQyxHQUE3QixFQUFrQztBQUNoQyxZQUFNQyxHQUFHLEdBQUcsTUFBTUMsS0FBSyxDQUFFLEdBQUVDLHVCQUF3QixrQkFBNUIsRUFBK0M7QUFDcEVHLFFBQUFBLE1BQU0sRUFBRSxNQUQ0RDtBQUVwRUMsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZVYsV0FBZixDQUY4RDtBQUdwRVcsUUFBQUEsT0FBTyxFQUFFO0FBQUUsMEJBQWdCO0FBQWxCO0FBSDJELE9BQS9DLENBQXZCO0FBS0EsWUFBTUMsSUFBSSxHQUFHLE1BQU1WLEdBQUcsQ0FBQ1csSUFBSixFQUFuQjs7QUFFQSxVQUFJWCxHQUFHLENBQUNZLEVBQUosSUFBVUYsSUFBZCxFQUFvQjtBQUNsQixlQUFPQSxJQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0QsS0FiaUI7O0FBY2xCWixJQUFBQSxXQUFXLEVBQUU7QUFDWGUsTUFBQUEsS0FBSyxFQUFFO0FBQUVDLFFBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUU7QUFBeEIsT0FESTtBQUVYQyxNQUFBQSxRQUFRLEVBQUU7QUFBRUYsUUFBQUEsS0FBSyxFQUFFLFVBQVQ7QUFBcUJDLFFBQUFBLElBQUksRUFBRTtBQUEzQjtBQUZDO0FBZEssR0FBRCxDQURWLENBSlc7QUF5QnRCRSxFQUFBQSxNQUFNLEVBQUVmLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZSxVQXpCRTtBQTBCdEJDLEVBQUFBLFNBQVMsRUFBRTtBQUNUQyxJQUFBQSxHQUFHLEVBQUUsT0FBTztBQUFFQyxNQUFBQSxLQUFGO0FBQVNYLE1BQUFBLElBQVQ7QUFBZVksTUFBQUE7QUFBZixLQUFQLEtBQW9DO0FBQ3ZDLFVBQUlaLElBQUosRUFBVTtBQUNSVyxRQUFBQSxLQUFLLEdBQUc7QUFBRUUsVUFBQUEsV0FBVyxFQUFFYixJQUFJLENBQUNXO0FBQXBCLFNBQVI7QUFDQUEsUUFBQUEsS0FBSyxDQUFDWCxJQUFOLEdBQWFBLElBQWI7QUFDRDs7QUFFRCxhQUFPVyxLQUFQO0FBQ0QsS0FSUTtBQVNURyxJQUFBQSxPQUFPLEVBQUUsT0FBTztBQUFFQSxNQUFBQSxPQUFGO0FBQVdILE1BQUFBO0FBQVgsS0FBUCxLQUE4QjtBQUNyQ0csTUFBQUEsT0FBTyxDQUFDZCxJQUFSLEdBQWVXLEtBQUssQ0FBQ1gsSUFBckI7QUFDQWMsTUFBQUEsT0FBTyxDQUFDRCxXQUFSLEdBQXNCRixLQUFLLENBQUNFLFdBQTVCO0FBQ0EsYUFBT0MsT0FBUDtBQUNEO0FBYlE7QUExQlcsQ0FBRCxDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz8yZThiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IE5leHRBdXRoLCB7IFVzZXIgfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgLy8gQ29uZmlndXJlIG9uZSBvciBtb3JlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyc1xyXG5cclxuICAvL0B0cy1pZ25vcmVcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMsIHJlcSkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52LkJBQ0tFTkRfVVJMfS9hcGkvdXNlcnMvbG9naW5gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbHMpLFxyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCByZXMuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAocmVzLm9rICYmIHVzZXIpIHtcclxuICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJlbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBqd3Q6IGFzeW5jICh7IHRva2VuLCB1c2VyLCBhY2NvdW50IH0pID0+IHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbiA9IHsgYWNjZXNzVG9rZW46IHVzZXIudG9rZW4gfTtcclxuICAgICAgICB0b2tlbi51c2VyID0gdXNlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIHNlc3Npb246IGFzeW5jICh7IHNlc3Npb24sIHRva2VuIH0pID0+IHtcclxuICAgICAgc2Vzc2lvbi51c2VyID0gdG9rZW4udXNlciBhcyBVc2VyO1xyXG4gICAgICBzZXNzaW9uLmFjY2Vzc1Rva2VuID0gdG9rZW4uYWNjZXNzVG9rZW47XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInByb3ZpZGVycyIsImF1dGhvcml6ZSIsImNyZWRlbnRpYWxzIiwicmVxIiwicmVzIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiQkFDS0VORF9VUkwiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ1c2VyIiwianNvbiIsIm9rIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsInNlY3JldCIsIkpXVF9TRUNSRVQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImFjY291bnQiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();