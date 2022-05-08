"use strict";
exports.id = 307;
exports.ids = [307];
exports.modules = {

/***/ 2307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dg": () => (/* binding */ getAllProducts),
/* harmony export */   "Jt": () => (/* binding */ useGetTopRatedProductsQuery),
/* harmony export */   "Jy": () => (/* binding */ useGetAllProductsQuery),
/* harmony export */   "bH": () => (/* binding */ getRunningOperationPromises),
/* harmony export */   "fi": () => (/* binding */ productsApi),
/* harmony export */   "lZ": () => (/* binding */ useGetProductQuery),
/* harmony export */   "wE": () => (/* binding */ useUpdateProductMutation),
/* harmony export */   "wv": () => (/* binding */ getProduct),
/* harmony export */   "xq": () => (/* binding */ useDeleteProductMutation)
/* harmony export */ });
/* unused harmony export getTopRatedProducts */
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4335);
/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4161);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_1__);


const productsApi = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
  reducerPath: "products",
  tagTypes: ["product"],

  extractRehydrationInfo(action, {
    reducerPath
  }) {
    if (action.type === redux_persist__WEBPACK_IMPORTED_MODULE_1__.REHYDRATE) {
      return action.payload[reducerPath];
    }
  },

  //   keepUnusedDataFor: 60,
  baseQuery: (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
    baseUrl: `${"http://localhost:5000"}/api/products`
  }),
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: ({
        keyword,
        pageNumber
      }) => `?keyword=${keyword}&pageNumber=${pageNumber}`
    }),
    getProduct: builder.query({
      query: id => `/${id}`
    }),
    getTopRatedProducts: builder.query({
      query: () => `/top`
    }),
    updateProduct: builder.mutation({
      query: data => ({
        url: `${data.productId}`,
        method: "PUT",
        body: data.product,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`
        }
      })
    }),
    deleteProduct: builder.mutation({
      query: data => ({
        url: `${data.productId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`
        }
      })
    })
  })
});
const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetTopRatedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  util: {
    getRunningOperationPromises
  }
} = productsApi;
const {
  getAllProducts,
  getProduct,
  getTopRatedProducts
} = productsApi.endpoints;

/***/ })

};
;