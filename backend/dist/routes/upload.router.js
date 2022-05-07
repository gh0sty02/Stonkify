"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_upload_1 = __importDefault(require("../utils/file-upload"));
const router = express_1.default.Router();
router.post("/", file_upload_1.default.single("image"), (req, res) => {
    var _a, _b;
    const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.indexOf("\\images");
    if (path) {
        const filePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path.substring(path);
        res.send(filePath);
    }
});
exports.default = router;
//# sourceMappingURL=upload.router.js.map