import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // @todo check for file path resolving issues if any after compiling to js

    const filePath = path.join("backend/images");
    cb(null, filePath);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${new Date()
        .toISOString()
        .replace(/:/g, "-")}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname));
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images Only !"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
