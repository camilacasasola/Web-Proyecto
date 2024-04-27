//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const consultaController = require('../controllers/consultacreate');//comunicacion con el controller
//rutas
router.post('/', consultaController.addConsulta);//para agregar Comestible
router.get('/', consultaController.getConsulta);//para obtener las Comestibles
//se exporta para poder ser utilizado en otros archivos
module.exports = router;