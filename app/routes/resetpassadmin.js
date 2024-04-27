const express = require('express');
const router = express.Router();
const actualizarController  = require('../controllers/resetadmin'); 


router.put('/:username', actualizarController.actualizarContrasena);

module.exports = router;