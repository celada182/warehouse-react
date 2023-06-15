const express = require('express'); //import express
const router  = express.Router();
const controller = require('../controllers/inventory');
router.post('/', controller.importInventory);
module.exports = router;
