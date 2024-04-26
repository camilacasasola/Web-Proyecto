const express = require('express');//servidor express
const router = express.Router();//utilizar rutas express
const { registerUserController } = require('../controllers/registroadmin');//ruta para comunucarse con el controller

//Ruta para manejar la solicitud POST del formulario de registro del html
router.post('/', registerUserController);
//exportar para ser utilizado en otros archivos
module.exports = router;