import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), "public", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      if (typeof cb === 'function') cb(null, tempDir);
      else throw new Error('Invalid callback in multer destination');
    } catch (err) {
      if (typeof cb === 'function') cb(err);
      else throw err;
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '';
    const base = String(Date.now());
    cb(null, `${base}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  // set a flag on the request instead of throwing an error to avoid crashing
  req.fileValidationError = 'Only image files are allowed';
  return cb(null, false);
}

// Allow configuring max file size via env var (bytes). Default: 10MB
const MAX_FILE_SIZE = parseInt(process.env.MULTER_MAX_FILE_SIZE, 10) || 10 * 1024 * 1024;

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export { upload };

