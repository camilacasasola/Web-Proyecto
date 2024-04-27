const express = require('express');
const router = express.Router();
const reservaBController = require('../controllers/reservaBcreate');

router.post('/', reservaBController.createReservaB);
router.get('/', reservaBController.getReservas);
module.exports = router;
