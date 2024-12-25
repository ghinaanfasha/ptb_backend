const express = require('express');
const router = express.Router();
const controller = require('../controller/order.controller.js');
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.get('/orders', authentication, controller.getOrders);
router.get('/orders/:id', authentication, controller.getOrderById);
router.put('/orders/:id', authentication, upload.single('file'), controller.updateOrder);
router.post('/orders', authentication, controller.createOrder);

module.exports = router;