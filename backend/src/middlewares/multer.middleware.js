// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // This storage needs public/images folder in the root directory
//     // Else it will throw an error saying cannot find path public/images
//     cb(null, `./public/images`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Middleware responsible to read form data and upload the File object to the mentioned path
// export const upload = multer({
//   storage,
//   // limits: {
//   //   fileSize: 1 * 1000 * 1000,
//   // },
//   limits: {
//   fileSize: 10 * 1024 * 1024, // 10 MB
// },

// });


// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename(req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

// export const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },
//   fileFilter(req, file, cb) {
//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "application/zip",
//       "application/vnd.rar",
//       "application/x-7z-compressed",
//     ];

//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Unsupported file type"), false);
//     }

//     cb(null, true);
//   },
// });


import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/x-rar-compressed",
  ];

  console.log("📎 Uploaded file type:", file.mimetype);

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});
