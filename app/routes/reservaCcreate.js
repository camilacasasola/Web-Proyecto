const express = require('express');
const router = express.Router();
const reservaCController = require('../controllers/reservaCcreate');

router.post('/', reservaCController.createReservaC);
router.get('/', reservaCController.getReservas);
module.exports = router;
