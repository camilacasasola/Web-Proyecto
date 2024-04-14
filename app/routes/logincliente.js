const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/logincliente'); // Asegúrate de que la ruta es correcta

router.post('/logincliente', loginCliente);

module.exports = router;
