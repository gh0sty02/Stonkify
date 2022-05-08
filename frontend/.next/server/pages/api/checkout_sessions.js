"use strict";
(() => {
var exports = {};
exports.id = 118;
exports.ids = [118];
exports.modules = {

/***/ 4421:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: ./config/index.ts
const CURRENCY = "inr";
const MIN_AMOUNT = 20000;
const MAX_AMOUNT = 700000;
const AMOUNT_STEP = 5.0;
;// CONCATENATED MODULE: external "stripe"
const external_stripe_namespaceObject = require("stripe");
var external_stripe_default = /*#__PURE__*/__webpack_require__.n(external_stripe_namespaceObject);
;// CONCATENATED MODULE: ./utils/stripe-utils.ts
function formatAmountForDisplay(amount, currency) {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol"
  });
  return numberFormat.format(amount);
}
function formatAmountForStripe(amount, currency) {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol"
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;

  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
const stripe_utils_CURRENCY = "usd";
;// CONCATENATED MODULE: ./pages/api/checkout_sessions/index.ts



const stripe = new (external_stripe_default())("sk_test_51KD67rSEMve4LTTEWCbJcYXD53oSvbMtvNGfIA7OENVE8HqxGNGJircOUbh54xsxM4u9zKJny5yZTanDKYoFeDNj00wgf9TXV4", {
  apiVersion: "2020-08-27"
});
async function handler(req, res) {
  if (req.method === "POST") {
    const order = req.body.order;
    const lineItems = order.orderItems;

    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: lineItems.map(item => ({
          name: item.name,
          amount: formatAmountForStripe(item.price, CURRENCY) * 76,
          currency: CURRENCY,
          quantity: item.qty
        })),
        success_url: `${req.headers.origin}/orders/${order._id}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/orders/${order._id}`
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({
        statusCode: 500,
        message: errorMessage
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4421));
module.exports = __webpack_exports__;

})();