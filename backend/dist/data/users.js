"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const users = [
    {
        name: "Admin User",
        email: "admin@stonkify.com",
        password: bcrypt.hashSync("test@123", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@stonkify.com",
        password: bcrypt.hashSync("test@123", 10),
    },
    {
        name: "Jane Doe",
        email: "jane@stonkify.com",
        password: bcrypt.hashSync("test@123", 10),
    },
];
exports.users = users;
//# sourceMappingURL=users.js.map