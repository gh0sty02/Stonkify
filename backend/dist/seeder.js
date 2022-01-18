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
const dotenv_1 = __importDefault(require("dotenv"));
const colors = require("colors");
const users_1 = require("./data/users");
const products_1 = require("./data/products");
const user_model_1 = __importDefault(require("./models/user.model"));
const product_model_1 = __importDefault(require("./models/product.model"));
const order_model_1 = __importDefault(require("./models/order.model"));
const db_1 = require("./config/db");
dotenv_1.default.config();
(0, db_1.connectDB)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.default.deleteMany();
        yield product_model_1.default.deleteMany();
        yield user_model_1.default.deleteMany();
        const createdUsers = yield user_model_1.default.insertMany(users_1.users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products_1.products.map((p) => {
            return Object.assign(Object.assign({}, p), { user: adminUser });
        });
        yield product_model_1.default.insertMany(sampleProducts);
        console.log("data imported".green.inverse);
    }
    catch (error) {
        console.log(error.message);
    }
});
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.default.deleteMany();
        yield product_model_1.default.deleteMany();
        yield user_model_1.default.deleteMany();
        console.log("data deleted".red.inverse);
    }
    catch (error) {
        console.log(error.message);
    }
});
if (process.argv[2] === "-d") {
    deleteData();
}
else {
    importData();
}
//# sourceMappingURL=seeder.js.map