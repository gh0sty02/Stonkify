"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.route("/").post(user_controller_1.registerUser).get(auth_middleware_1.protect, auth_middleware_1.isAdmin, user_controller_1.getUsers);
router.post("/login", user_controller_1.authUser);
router
    .route("/profile")
    .get(auth_middleware_1.protect, user_controller_1.getUserProfile)
    .put(auth_middleware_1.protect, user_controller_1.updateUserProfile);
router.post("/tokenlogin", user_controller_1.tokenLogin);
router
    .use(auth_middleware_1.protect, auth_middleware_1.isAdmin)
    .route("/:id")
    .delete(user_controller_1.deleteUser)
    .put(user_controller_1.updateUser)
    .get(user_controller_1.getUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map