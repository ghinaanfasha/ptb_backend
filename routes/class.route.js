const express = require('express');
const router = express.Router();
const controller = require('../controller/class.controller');
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

const khsFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file PDF yang diizinkan untuk KHS'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: khsFilter
});

router.post('/classes', authentication, upload.single('khs'), controller.createClass);
router.get('/classes', authentication, controller.getClasses);
router.get('/classes/:id', authentication, controller.getClassById);
router.put('/classes/:id', authentication, upload.single('khs'), controller.updateClass);
router.delete('/classes/:id', authentication, controller.deleteClass);
router.get('/classes-user', authentication, controller.getClassesByUser);


module.exports = router;

