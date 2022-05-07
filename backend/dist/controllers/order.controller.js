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
exports.getOrders = exports.deleteAllOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getMyOrders = exports.getOrderById = exports.addOrderItems = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addOrderItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
        if (!orderItems) {
            res.status(400);
            throw new Error("No order Items");
        }
        else {
            const session = yield mongoose_1.default.startSession({
                defaultTransactionOptions: {
                    writeConcern: { w: "majority" },
                    readConcern: { level: "majority" },
                },
            });
            session.startTransaction();
            try {
                const order = yield new order_model_1.default({
                    orderItems,
                    user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                }, session);
                const createdOrder = yield order.save({ session });
                const user = yield user_model_1.default.findById(order.user).session(session);
                yield (user === null || user === void 0 ? void 0 : user.orders.push(createdOrder._id));
                yield (user === null || user === void 0 ? void 0 : user.save({ session }));
                yield order.populate("user", "name email");
                yield session.commitTransaction();
                res.status(201).json(order);
            }
            catch (error) {
                session.abortTransaction();
                throw error;
            }
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
            console.log(order);
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
const deleteAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const session = yield mongoose_1.default.startSession({
            defaultTransactionOptions: {
                writeConcern: { w: "majority" },
                readConcern: { level: "majority" },
            },
        });
        session.startTransaction();
        try {
            const user = yield user_model_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id).session(session);
            yield (user === null || user === void 0 ? void 0 : user.orders.splice(0, user === null || user === void 0 ? void 0 : user.orders.length));
            yield order_model_1.default.deleteMany({ user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }, { session });
            yield (user === null || user === void 0 ? void 0 : user.save({ session }));
            yield session.commitTransaction();
            res.status(201).json(user);
        }
        catch (error) {
            session.abortTransaction();
            throw new Error(error.message);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAllOrders = deleteAllOrders;
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