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
const products_1 = require("./data/products");
const product_model_1 = __importDefault(require("./models/product.model"));
const db_1 = require("./config/db");
dotenv_1.default.config();
(0, db_1.connectDB)();
const constData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.default.deleteMany();
        const adminUser = "61e66dc73fa663d53330c01b";
        const sampleProducts = products_1.products.map((p) => {
            return Object.assign(Object.assign({}, p), { user: adminUser });
        });
        sampleProducts.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield product_model_1.default.collection.insertOne(product);
        }));
        console.log("done");
    }
    catch (error) {
        console.log(error.message);
    }
});
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("data deleted");
    }
    catch (error) {
        console.log(error.message);
    }
});
if (process.argv[2] === "-d") {
    deleteData();
}
else {
    console.log("executing");
    constData();
}
//# sourceMappingURL=seeder.js.map