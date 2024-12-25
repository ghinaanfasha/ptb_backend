const express = require('express');
const router = express.Router();
const controller = require('../controller/item.controller');
const authentication = require('../middleware/authentication');
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file JPG, JPEG, atau PNG yang diizinkan'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post('/items', authentication, upload.single('image'), controller.createItem);
router.get('/items', authentication, controller.getItems);
router.get('/items/:id', authentication, controller.getItemById);
router.put('/items/:id', authentication, upload.single('image'), controller.updateItem);
router.delete('/items/:id', authentication, controller.deleteItem);

module.exports = router; 