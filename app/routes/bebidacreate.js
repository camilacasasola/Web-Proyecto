const express = require('express');
const router = express.Router();
const bebidaController = require('../controllers/bebidacreate');

router.post('/', bebidaController.addBebida);
router.get('/', bebidaController.getBebidas);

module.exports = router;
