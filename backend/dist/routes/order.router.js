"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("../controllers/order.controller");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.route("/").get(auth_middleware_1.protect, auth_middleware_1.isAdmin, order_controller_1.getOrders).post(auth_middleware_1.protect, order_controller_1.addOrderItems);
router.route("/myorders").get(auth_middleware_1.protect, order_controller_1.getMyOrders);
router.route("/:id").get(auth_middleware_1.protect, order_controller_1.getOrderById);
router.route("/:id/pay").put(auth_middleware_1.protect, order_controller_1.updateOrderToPaid);
router.route("/:id/deliver").put(auth_middleware_1.protect, auth_middleware_1.isAdmin, order_controller_1.updateOrderToDelivered);
exports.default = router;
//# sourceMappingURL=order.router.js.map