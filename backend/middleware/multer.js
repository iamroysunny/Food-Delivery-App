import multer from "multer";
import fs from "fs";

const uploadDir = "uploads";

/* ✅ ensure uploads folder exists */
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname); // ✅ avoid overwrite
  }
});

/* ✅ image-only safety (important) */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
