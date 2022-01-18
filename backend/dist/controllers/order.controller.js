"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getMyOrders = exports.getOrderById = exports.addOrderItems = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const addOrderItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
        if (!orderItems) {
            res.status(400);
            throw new Error("No order Items");
        }
        else {
            const order = new order_model_1.default({
                orderItems,
                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });
            order.populate("user", "name email");
            const createdOrder = yield order.save();
            res.status(201).json(createdOrder);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.addOrderItems = addOrderItems;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(req.params.id).populate("user", "name email");
        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404);
            throw new Error("Order not found ");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getOrderById = getOrderById;
const getMyOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const orders = yield order_model_1.default.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
        if (orders) {
            res.status(200).json(orders);
        }
        else {
            res.status(404);
            throw new Error("Orders not found ");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getMyOrders = getMyOrders;
const updateOrderToPaid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(req.params.id).populate("user", "name email");
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            const updatedOrder = yield order.save();
            return res.status(200).json(updatedOrder);
        }
        else {
            res.status(404);
            throw new Error("Order not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const updateOrderToDelivered = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(req.params.id).populate("user", "name email");
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = yield order.save();
            return res.status(200).json(updatedOrder);
        }
        else {
            res.status(404);
            throw new Error("Order not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderToDelivered = updateOrderToDelivered;
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find().populate("user", "name email");
        if (orders) {
            res.status(200).json(orders);
        }
        else {
            res.status(404);
            throw new Error("No Orders found ");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getOrders = getOrders;
//# sourceMappingURL=order.controller.js.map