"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.route("/").get(product_controller_1.getProducts).post(auth_middleware_1.protect, auth_middleware_1.isAdmin, product_controller_1.createProduct);
router.route("/top").get(product_controller_1.getTopProducts);
router.route("/:id/reviews").post(auth_middleware_1.protect, product_controller_1.createProductReview);
router
    .route("/:id")
    .put(auth_middleware_1.protect, auth_middleware_1.isAdmin, product_controller_1.updateProduct)
    .get(product_controller_1.getProductById)
    .delete(auth_middleware_1.protect, auth_middleware_1.isAdmin, product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.router.js.map