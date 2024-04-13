// routes/login.js
const express = require('express');
const router = express.Router();
const { loginUserController } = require('../controllers/loginadmin');

// Ruta actualizada para coincidir con el formulario HTML
router.post('/login', loginUserController);

module.exports = router;


