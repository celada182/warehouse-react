const express = require('express'); //import express
const router  = express.Router();
const controller = require('../controllers/product');
router.post('/', controller.importProducts);
router.get('/', controller.getProducts);
router.put('/', controller.sellProduct);
module.exports = router;
