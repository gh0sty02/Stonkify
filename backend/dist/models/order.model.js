"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        },
    ],
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    taxPrice: {
        type: Number,
        default: 0.0,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0.0,
        required: true,
    },
    itemsPrice: {
        type: Number,
    },
    isPaid: {
        type: Boolean,
        required: false,
    },
    paidAt: {
        type: Number,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Number,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map