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
exports.isAdmin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    let error;
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = (yield user_model_1.default.findById(decode.id).select("-password"));
        }
        else {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    catch (err) {
        next(err);
    }
    next();
});
exports.protect = protect;
const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        }
        else {
            res.status(401);
            throw new Error("Not Authorized as Admin");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.middleware.js.map