const express = require('express');
const router = express.Router();
const controller = require('../controller/category.controller');
const authentication = require('../middleware/authentication');

router.post('/categories', authentication, controller.createCategory);
router.get('/categories', controller.getCategories);
router.get('/categories/:id', authentication, controller.getCategoryById);
router.put('/categories/:id', authentication, controller.updateCategory);
router.delete('/categories/:id', authentication, controller.deleteCategory);

module.exports = router; 