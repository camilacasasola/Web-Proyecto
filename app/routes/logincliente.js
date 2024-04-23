const express = require('express');//servidor express
const router = express.Router();//para utilizar rutas express
const { loginCliente } = require('../controllers/logincliente'); //ruta para comunicarse con el controller

router.post('/logincliente', loginCliente);//coincidir con la ruta en el html

module.exports = router;//se exporta para ser utilizado en otros archivos
