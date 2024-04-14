const express = require('express');
const router = express.Router();
const { registrarCliente } = require('../controllers/registrocliente');

// Ruta para manejar la solicitud POST del formulario de registro
router.post('/', registrarCliente);

module.exports = router;
