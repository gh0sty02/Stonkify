"use strict";
(() => {
var exports = {};
exports.id = 360;
exports.ids = [360];
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

/***/ 5735:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _id_),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./components/Rating.tsx
var Rating = __webpack_require__(4105);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./components/Loader.tsx
var Loader = __webpack_require__(6121);
// EXTERNAL MODULE: ./components/Message.tsx
var Message = __webpack_require__(5348);
// EXTERNAL MODULE: ./services/productsApi.ts
var productsApi = __webpack_require__(2307);
// EXTERNAL MODULE: ./reducers/cartSlice.ts
var cartSlice = __webpack_require__(4749);
// EXTERNAL MODULE: ./services/reviewApi.ts
var reviewApi = __webpack_require__(5996);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./screens/ProductScreen.tsx








 // import { addToCart } from "reducers/asyncActions/cartActions";









const ProductScreen = ({
  id,
  currentProduct
}) => {
  var _session$data, _product$reviews;

  const product = currentProduct;
  const {
    0: qty,
    1: setQty
  } = (0,external_react_.useState)(1);
  const {
    0: rating,
    1: setRating
  } = (0,external_react_.useState)(0);
  const {
    0: comment,
    1: setComment
  } = (0,external_react_.useState)(" ");
  const {
    0: reveiwStatus,
    1: setReviewStatus
  } = (0,external_react_.useState)(false);
  const [createReview, {
    isError: isCreateReviewError,
    error: createReviewError
  }] = (0,reviewApi/* useAddReviewMutation */.MS)();
  const {
    isLoading,
    isError,
    error,
    data: fetchedProduct,
    refetch
  } = (0,productsApi/* useGetProductQuery */.lZ)(product._id);
  const router = (0,router_.useRouter)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const state = (0,external_react_redux_.useSelector)(state => state);
  const session = (0,react_.useSession)();
  const token = (_session$data = session.data) === null || _session$data === void 0 ? void 0 : _session$data.accessToken; // const { error: reviewError, success: reviewSuccess } = state.productReview;
  // useEffect(() => {
  //   if (reviewSuccess) {
  //     setReviewStatus(true);
  //   }
  // }, [reviewSuccess]);

  const addToCartHandler = async () => {
    if (!token) {
      router.push("/login");
    } else {
      dispatch((0,cartSlice/* addToCart */.Xq)({
        image: product.image,
        name: product.name,
        price: product.price,
        qty,
        productId: product._id
      }));
    }
  };

  const addReviewHandler = async e => {
    e.preventDefault();

    if (token && product !== null && product !== void 0 && product._id) {
      const reviewData = await createReview({
        review: {
          rating,
          comment,
          token,
          productId: product._id
        },
        productId: product._id,
        token
      });

      if ("data" in reviewData) {
        refetch();
      }
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: product && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
        children: /*#__PURE__*/jsx_runtime_.jsx("title", {
          children: product.name
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
        children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn btn-light my-3",
            children: "Go Back"
          })
        }), isLoading ? /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}) : isError ? /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
          varient: "danger",
          children: error.data.message
        }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_.Fragment, {
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
            children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
              md: 6,
              children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Image, {
                fluid: true,
                src: `${"http://localhost:5000"}${product.image}`,
                alt: product.name
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
              md: 3,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup, {
                variant: "flush",
                children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/jsx_runtime_.jsx("h3", {
                    children: product.name
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                  children: /*#__PURE__*/jsx_runtime_.jsx(Rating/* default */.Z, {
                    value: product.rating,
                    text: `${product.numReviews} ratings`
                  })
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
                  children: ["Price : $", product.price]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
                  children: ["Description : ", product.description]
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
              md: 3,
              children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Card, {
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup, {
                  variant: "flush",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        children: "Price:"
                      }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        children: /*#__PURE__*/jsx_runtime_.jsx("strong", {
                          children: product.price
                        })
                      })]
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        children: "Status : "
                      }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        children: product.countInStock && product.countInStock > 0 ? "In Stock" : "Out of Stock"
                      })]
                    })
                  }), product.countInStock && product.countInStock > 0 && /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        children: "Qty"
                      }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
                          as: "select",
                          value: qty,
                          onChange: e => setQty(parseInt(e.target.value)),
                          children: [...Array(product.countInStock).keys()].map(x => /*#__PURE__*/jsx_runtime_.jsx("option", {
                            value: x + 1,
                            children: x + 1
                          }, x + 1))
                        })
                      })]
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.ListGroup.Item, {
                    children: /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                      onClick: () => {
                        addToCartHandler();
                      },
                      className: "btn-block",
                      style: {
                        width: "100%"
                      },
                      type: "button",
                      disabled: product.countInStock === 0,
                      children: "Add to Cart"
                    })
                  })]
                })
              })
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Row, {
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
              md: 6,
              children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                children: "Reviews"
              }), ((_product$reviews = product.reviews) === null || _product$reviews === void 0 ? void 0 : _product$reviews.length) === 0 && /*#__PURE__*/jsx_runtime_.jsx(Message/* default */.Z, {
                children: "No Reviews"
              }), isCreateReviewError && /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Alert, {
                variant: "danger",
                children: createReviewError.data.message
              }), product.reviews && /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup, {
                variant: "flush",
                children: [product.reviews.map(review => {
                  var _review$createdAt;

                  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
                    children: [/*#__PURE__*/jsx_runtime_.jsx("strong", {
                      children: review.name
                    }), /*#__PURE__*/jsx_runtime_.jsx(Rating/* default */.Z, {
                      value: review.rating
                    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                      children: (_review$createdAt = review.createdAt) === null || _review$createdAt === void 0 ? void 0 : _review$createdAt.substring(0, 10)
                    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                      children: review.comment
                    })]
                  }, review._id);
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.ListGroup.Item, {
                  children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                    children: "Write a Customer Review"
                  }), token ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                    onSubmit: addReviewHandler,
                    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                      controlId: "rating",
                      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                        children: "Rating"
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Control, {
                        as: "select",
                        value: rating,
                        onChange: e => setRating(Number(e.target.value)),
                        children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "",
                          children: "Select..."
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "1",
                          children: "1 - Poor"
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "2",
                          children: "2 - Fair"
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "3",
                          children: "3 - Good"
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "4",
                          children: "4 - Very Good"
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "5",
                          children: "5 - Excellent"
                        })]
                      })]
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                      controlId: "comment",
                      children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                        children: "Comment"
                      }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
                        as: "textarea",
                        rows: 3,
                        value: comment,
                        onChange: e => setComment(e.target.value)
                      })]
                    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                      type: "submit",
                      variant: "primart",
                      children: "Submit"
                    })]
                  }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(Message/* default */.Z, {
                    children: ["Pleae ", /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
                      href: "/login",
                      children: "Login"
                    }), " to write a reveiw"]
                  })]
                })]
              })]
            })
          })]
        })]
      }), " "]
    })
  });
};

/* harmony default export */ const screens_ProductScreen = (ProductScreen);
// EXTERNAL MODULE: ./store.ts
var store = __webpack_require__(6594);
;// CONCATENATED MODULE: ./pages/product/[id].tsx











const ProductDetails = ({
  id,
  product
}) => {
  var _session$data;

  const session = (0,react_.useSession)();
  const router = (0,router_.useRouter)();
  const token = (_session$data = session.data) === null || _session$data === void 0 ? void 0 : _session$data.accessToken;
  const {
    isLoading,
    isError,
    data
  } = (0,productsApi/* useGetProductQuery */.lZ)(id);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [isLoading && /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}), router.isFallback && /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}), data && /*#__PURE__*/jsx_runtime_.jsx(screens_ProductScreen, {
      id: id,
      currentProduct: data
    })]
  });
};

const getStaticPaths = async context => {
  const {
    data
  } = await external_axios_default().get(`${"http://localhost:5000"}/api/products`);
  const paths = data.products.map(product => ({
    params: {
      id: product._id
    }
  }));
  return {
    paths,
    fallback: false
  };
};
const getStaticProps = store/* wrapper.getStaticProps */.YS.getStaticProps(store => async context => {
  var _context$params;

  const id = (_context$params = context.params) === null || _context$params === void 0 ? void 0 : _context$params.id;

  if (id) {
    // const data = (await store.dispatch(getProduct.initiate(id)))
    //   .data as IProduct;
    const data = await store.dispatch(productsApi/* getProduct.initiate */.wv.initiate(id));
    await Promise.all((0,productsApi/* getRunningOperationPromises */.bH)());

    if ("data" in data) {
      return {
        props: {
          id,
          product: data.data,
          revalidate: 600
        }
      };
    }
  }
});
/* harmony default export */ const _id_ = (ProductDetails);

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,664,350,749,307,594,592], () => (__webpack_exec__(5735)));
module.exports = __webpack_exports__;

})();