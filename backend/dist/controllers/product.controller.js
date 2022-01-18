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
exports.getTopProducts = exports.createProductReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../models/product.model"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            }
            : {};
        const count = yield product_model_1.default.countDocuments(Object.assign({}, keyword));
        const products = yield product_model_1.default.find(Object.assign({}, keyword))
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        return res
            .status(200)
            .json({ products, page, pages: Math.ceil(count / pageSize) });
    }
    catch (err) {
        next(err);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield product_model_1.default.findById(id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }
        return res.status(200).json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }
        yield product.remove();
        return res.status(200).json({ message: "Product Deleted" });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProduct = deleteProduct;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newProduct = new product_model_1.default({
            name: "Sample Name",
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            image: "/images/sample.jpg",
            brand: "Sample Brand",
            category: "Sample Category",
            description: "Sample Description",
            reviews: [],
            price: 0,
            countInStock: 0,
        });
        const createdProduct = yield newProduct.save();
        if (!createdProduct) {
            res.status(500);
            throw new Error("Something went wrong");
        }
        return res.status(201).json(createdProduct);
    }
    catch (err) {
        next(err);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { name, image, brand, category, description, price, countInStock } = req.body;
        const product = yield product_model_1.default.findById(req.params.id);
        if (product) {
            product.name = name;
            product.user = new mongoose_1.default.Types.ObjectId((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.description = description;
            product.price = price;
            product.countInStock = countInStock;
        }
        const createdProduct = yield (product === null || product === void 0 ? void 0 : product.save());
        if (!createdProduct) {
            res.status(500);
            throw new Error("Something went wrong");
        }
        return res.status(201).json(createdProduct);
    }
    catch (err) {
        next(err);
    }
});
exports.updateProduct = updateProduct;
const createProductReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, comment } = req.body;
        const product = yield product_model_1.default.findById(req.params.id);
        if (product) {
            const alreadyReviewed = product.reviews.find((r) => { var _a; return r.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Product already reviewed");
            }
        }
        if (req.user && product) {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: new mongoose_1.default.Types.ObjectId(req.user._id),
                product: new mongoose_1.default.Types.ObjectId(product._id),
            };
            const createdReview = new review_model_1.default(review);
            yield createdReview.save();
            product.reviews.push(createdReview);
            product.numReviews = product.reviews.length;
            product.rating =
                (product === null || product === void 0 ? void 0 : product.reviews.reduce((acc, item) => item.rating + acc, 0)) /
                    (product === null || product === void 0 ? void 0 : product.reviews.length);
            yield product.save();
            return res
                .status(201)
                .json({ message: "Review Added", review: createdReview });
        }
        else {
            throw new Error("Something went wrong, Please Check if User is Logged in ");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.createProductReview = createProductReview;
const getTopProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find().sort({ rating: -1 }).limit(3);
        return res.status(200).json(products);
    }
    catch (err) {
        next(err);
    }
});
exports.getTopProducts = getTopProducts;
//# sourceMappingURL=product.controller.js.map