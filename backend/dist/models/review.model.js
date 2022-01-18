"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.reviewSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
}, { timestamps: true });
const Review = mongoose_1.default.model("Review", exports.reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.model.js.map