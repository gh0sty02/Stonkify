"use strict";
exports.id = 350;
exports.ids = [350];
exports.modules = {

/***/ 8475:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dj": () => (/* binding */ setCredentials),
/* harmony export */   "Fb": () => (/* binding */ userInit),
/* harmony export */   "Gb": () => (/* binding */ authSlice)
/* harmony export */ });
/* unused harmony export logout */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  user: null,
  token: null
};
const authSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, {
      payload: {
        user,
        token
      }
    }) => {
      state.user = user;
      state.token = token;
    },
    userInit: (state, {
      payload
    }) => {
      state.user = payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    }
  } // extraReducers : (builder) => ({
  //   userApi.endpoints
  // })

});
const {
  setCredentials,
  logout,
  userInit
} = authSlice.actions;

/***/ }),

/***/ 2350:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AW": () => (/* binding */ getAllUsers),
/* harmony export */   "BG": () => (/* binding */ userApi),
/* harmony export */   "Bm": () => (/* binding */ tokenLogin),
/* harmony export */   "GA": () => (/* binding */ getUserById),
/* harmony export */   "I1": () => (/* binding */ useDeleteUserMutation),
/* harmony export */   "LF": () => (/* binding */ useUpdateUserProfileMutation),
/* harmony export */   "TZ": () => (/* binding */ useTokenLoginMutation),
/* harmony export */   "kD": () => (/* binding */ useUpdateUserMutation),
/* harmony export */   "l4": () => (/* binding */ useRegisterMutation),
/* harmony export */   "wv": () => (/* binding */ useGetAllUsersQuery)
/* harmony export */ });
/* unused harmony exports useLoginMutation, useGetUserByIdQuery, useGetCurrentUserQuery, getRunningOperationPromises */
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4335);
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reducers_authSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8475);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4161);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_2__);



const userApi = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
  reducerPath: "user",
  tagTypes: ["user"],
  baseQuery: (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
    baseUrl: `${"http://localhost:5000"}/api/users`,
    prepareHeaders: (headers, {
      getState
    }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  extractRehydrationInfo(action, {
    reducerPath
  }) {
    if (action.type === redux_persist__WEBPACK_IMPORTED_MODULE_2__.REHYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: builder => ({
    login: builder.mutation({
      query: ({
        email,
        password
      }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }
      }),

      async onCacheEntryAdded(arg, {
        dispatch,
        getState,
        extra,
        requestId,
        cacheEntryRemoved,
        cacheDataLoaded,
        getCacheEntry
      }) {
        dispatch(reducers_authSlice__WEBPACK_IMPORTED_MODULE_1__/* .authSlice.actions.setCredentials */ .Gb.actions.setCredentials({
          token: (await cacheDataLoaded).data.token,
          user: (await cacheDataLoaded).data
        }));
      }

    }),
    register: builder.mutation({
      query: ({
        email,
        password,
        name
      }) => ({
        url: "/",
        method: "POST",
        body: {
          name,
          email,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    getCurrentUser: builder.query({
      query: ({
        token
      }) => ({
        url: "/profile",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    }),
    getUserById: builder.query({
      query: ({
        id,
        token
      }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      })
    }),
    updateUserProfile: builder.mutation({
      query: _ref => {
        let body = Object.assign({}, _ref);
        return {
          url: "/profile",
          method: "PUT",
          body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${body.token}`
          }
        };
      },
      invalidatesTags: ["user"]
    }),
    updateUser: builder.mutation({
      query: ({
        id,
        body,
        token
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ["user"]
    }),
    deleteUser: builder.mutation({
      query: ({
        id,
        token
      }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    tokenLogin: builder.mutation({
      query: token => {
        return {
          url: "tokenlogin",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
      }
    }),
    getAllUsers: builder.query({
      query: token => ({
        url: `/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }),
      providesTags: ["user"]
    })
  })
});
const {
  useGetAllUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useTokenLoginMutation,
  util: {
    getRunningOperationPromises
  }
} = userApi;
const {
  tokenLogin,
  getAllUsers,
  getUserById
} = userApi.endpoints;

/***/ })

};
;