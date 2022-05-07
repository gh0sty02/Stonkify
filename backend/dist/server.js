"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const order_router_1 = __importDefault(require("./routes/order.router"));
const product_router_1 = __importDefault(require("./routes/product.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const upload_router_1 = __importDefault(require("./routes/upload.router"));
const cart_router_1 = __importDefault(require("./routes/cart.router"));
const error_middleware_1 = require("./middleware/error.middleware");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use((0, cors_1.default)());
app.use("/api/products", product_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
app.use("/api/upload", upload_router_1.default);
app.use("/api/cart", cart_router_1.default);
app.use("/images/", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
(0, db_1.connectDB)().then(() => {
    app.listen(Number(process.env.PORT) || 5000, () => {
        console.log(`Server running successfully`.yellow.bold);
    });
});
//# sourceMappingURL=server.js.map