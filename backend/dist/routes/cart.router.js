"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_controller_1 = require("../controllers/cart.controller");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(auth_middleware_1.protect, cart_controller_1.getAllCartItems)
    .post(auth_middleware_1.protect, cart_controller_1.addItemToCart)
    .delete(auth_middleware_1.protect, cart_controller_1.emptyCart);
router
    .route("/:id")
    .put(auth_middleware_1.protect, cart_controller_1.changeQty)
    .delete(auth_middleware_1.protect, cart_controller_1.removeItemFromCart);
exports.default = router;
//# sourceMappingURL=cart.router.js.map