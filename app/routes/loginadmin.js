//servidor express
const express = require('express');
const router = express.Router();//utilizar rutas express para el servidor
const { loginUserController } = require('../controllers/loginadmin');//ruta para cominicarse con el controlador

//coincidir con la ruta del login del admin con el html
router.post('/', loginUserController);
//se exporta para ser utilizado en otros archivos
module.exports = router;


