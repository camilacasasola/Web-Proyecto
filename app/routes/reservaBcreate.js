const express = require('express');
const router = express.Router();
const reservaAController = require('../controllers/reservaBcreate');

router.post('/', reservaAController.createReservaB);
router.get('/', reservaAController.getReservas);
module.exports = router;
