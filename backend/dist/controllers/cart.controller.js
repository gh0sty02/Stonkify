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
exports.changeQty = exports.getAllCartItems = exports.emptyCart = exports.removeItemFromCart = exports.addItemToCart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartItem_model_1 = __importDefault(require("../models/cartItem.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addItemToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { price, qty, productId, image, name } = req.body;
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const cartItem = yield cartItem_model_1.default.find({ productId });
            if (cartItem.length > 0) {
                yield cartItem_model_1.default.updateOne({ productId }, { $inc: { qty: qty } });
                yield session.commitTransaction();
                return res.status(200).json(cartItem);
            }
            else {
                const newCartItem = new cartItem_model_1.default({
                    productId,
                    price,
                    qty,
                    image,
                    name,
                }, { session });
                yield newCartItem.save({ session });
                const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).session(session);
                yield (user === null || user === void 0 ? void 0 : user.cartItems.push(newCartItem._id));
                yield (user === null || user === void 0 ? void 0 : user.save({ session }));
                const cartItems = yield cartItem_model_1.default.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
                session.commitTransaction();
                return res.status(200).json(cartItems);
            }
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
exports.addItemToCart = addItemToCart;
const removeItemFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { id } = req.params;
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const cartItem = yield cartItem_model_1.default.findById(id).session(session);
            const user = yield user_model_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id).session(session);
            yield (cartItem === null || cartItem === void 0 ? void 0 : cartItem.remove({ session }));
            const index = user === null || user === void 0 ? void 0 : user.cartItems.indexOf(cartItem === null || cartItem === void 0 ? void 0 : cartItem._id);
            if (index && index > -1) {
                user === null || user === void 0 ? void 0 : user.cartItems.splice(index, 1);
            }
            yield (user === null || user === void 0 ? void 0 : user.save({ session }));
            const cartItems = yield cartItem_model_1.default.find({ user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id });
            session.commitTransaction();
            res.status(200).json(cartItems);
        }
        catch (error) {
            session.abortTransaction();
            throw new Error(error.message);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.removeItemFromCart = removeItemFromCart;
const emptyCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const user = yield user_model_1.default.findById((_e = req.user) === null || _e === void 0 ? void 0 : _e._id).session(session);
            yield cartItem_model_1.default.deleteMany({ user: user === null || user === void 0 ? void 0 : user._id }, { session });
            user === null || user === void 0 ? void 0 : user.cartItems.splice(0, user === null || user === void 0 ? void 0 : user.cartItems.length);
            yield (user === null || user === void 0 ? void 0 : user.save({ session }));
            session.commitTransaction();
            res.status(200).json({ message: "Cart emptied" });
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
exports.emptyCart = emptyCart;
const getAllCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const cartItems = yield cartItem_model_1.default.find({ user: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id });
        res.status(200).json(cartItems);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCartItems = getAllCartItems;
const changeQty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const { id } = req.params;
        const { qty } = req.body;
        const cartItem = yield cartItem_model_1.default.findById(id);
        if (cartItem) {
            cartItem.qty = qty;
            yield cartItem.save();
            const cartItems = yield cartItem_model_1.default.find({ user: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id });
            res.status(200).json(cartItems);
        }
        else {
            throw new Error("Cart item not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.changeQty = changeQty;
//# sourceMappingURL=cart.controller.js.map