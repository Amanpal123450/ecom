const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save files in 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = /jpeg|jpg|png/;
//     const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedFileTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only images (JPEG, PNG) are allowed!'));
//     }
// };

const upload = multer({ storage,

    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
 });

module.exports = upload;
