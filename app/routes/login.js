// routes/login.js
const express = require('express');
const router = express.Router();
const { loginUserController } = require('../controllers/login');

// Ruta actualizada para coincidir con el formulario HTML
router.post('/login', loginUserController);

module.exports = router;


