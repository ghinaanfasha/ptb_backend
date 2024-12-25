const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller.js');
const authentication = require('../middleware/authentication.js');
const multer = require('multer');
const { format } = require('date-fns');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const timestamp = format(now, 'yyyy-MM-dd-HHmmss');
    const uniqueSuffix = `${timestamp}-${file.originalname}`;
    cb(null, uniqueSuffix);
  }
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
});

router.get('/users', authentication, controller.getUsers);
router.get('/users/self', authentication, controller.getUserSelf);
router.put('/users', authentication, upload.single('image'), controller.updateUser);

module.exports = router;
