//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const comestibleController = require('../controllers/comestiblecreate');//comunicacion con el controller
//rutas
router.post('/', comestibleController.addComestible);//para agregar bebida
router.get('/', comestibleController.getComestible);//para obtener las bebidas
//router.put('/:codigo', bebidaController.actualizarBebida);//para editarlas
//router.delete('/:codigo', bebidaController.eliminarBebida);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;