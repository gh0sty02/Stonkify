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
exports.tokenLogin = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const userToken = (0, generateToken_1.default)(user === null || user === void 0 ? void 0 : user._id);
        const isPasswordCorrect = yield user.matchPassword(password);
        if (user && isPasswordCorrect) {
            return res.status(200).setHeader("X-auth-token", userToken).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: userToken,
            });
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        const error = new Error("Invalid Email or password");
        next(error);
    }
});
exports.authUser = authUser;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, } = req.body;
    try {
        const userExists = yield user_model_1.default.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
        });
        const userToken = (0, generateToken_1.default)(user._id);
        if (user) {
            return res.status(201).setHeader("X-auth-token", userToken).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: userToken,
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid User Data");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (user) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        else {
            res.status(404);
            throw new Error("User not found");
        }
    }
    catch (err) {
        const error = new Error("Invalid Email or password");
        next(error);
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const user = yield user_model_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = yield user.save();
            const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
            return res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token,
            });
        }
        else {
            res.status(404);
            throw new Error("User Not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserProfile = updateUserProfile;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        return res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id).select("-password");
        if (user) {
            return res.status(200).json(user);
        }
        else {
            res.status(404);
            throw new Error("User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (user) {
            yield user.remove();
            res.status(200).json({ message: "User Deleted" });
        }
        else {
            res.json(404);
            throw new Error("No User Found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ _id: req.params.id }, Object.assign({}, req.body));
        if (user) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        else {
            res.status(404);
            throw new Error("User Not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
const tokenLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1];
        if (!token) {
            throw new Error("No token provided");
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = (yield user_model_1.default.findById(decode.id)
            .select("_id email name isAdmin")
            .select("-password "));
        if (user) {
            return res.json(user);
        }
        else {
            throw new Error("User Not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.tokenLogin = tokenLogin;
//# sourceMappingURL=user.controller.js.map