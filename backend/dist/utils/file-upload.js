"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        const filePath = path_1.default.join("backend/images");
        cb(null, filePath);
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${new Date()
            .toISOString()
            .replace(/:/g, "-")}${path_1.default.extname(file.originalname)}`);
    },
});
function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path_1.default.extname(file.originalname));
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error("Images Only !"));
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
exports.default = upload;
//# sourceMappingURL=file-upload.js.map