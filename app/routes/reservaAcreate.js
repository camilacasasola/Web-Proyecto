const express = require('express');
const router = express.Router();
const reservaAController = require('../controllers/reservaAcreate');

router.post('/', reservaAController.createReservaA);
router.get('/', reservaAController.getReservas);
module.exports = router;
