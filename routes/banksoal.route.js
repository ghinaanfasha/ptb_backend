const express = require('express');
const router = express.Router();
const controller = require('../controller/banksoal.controller');
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

const upload = multer({ storage: storage });

router.post('/banksoal', authentication, upload.single('file'), controller.createBankSoal);
router.get('/banksoal', authentication, controller.getBankSoal);
router.get('/banksoal/:id', authentication, controller.getBankSoalById);
router.put('/banksoal/:id', authentication, upload.single('file'), controller.updateBankSoal);
router.delete('/banksoal/:id', authentication, controller.deleteBankSoal);

module.exports = router;
