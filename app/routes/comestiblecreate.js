//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const comestibleController = require('../controllers/comestiblecreate');//comunicacion con el controller
//rutas
router.post('/', comestibleController.addComestible);//para agregar Comestible
router.get('/', comestibleController.getComestible);//para obtener las Comestible
router.put('/:codigocomestible', comestibleController.actualizarComestible);//para editarlas
router.delete('/:codigocomestible', comestibleController.eliminarComestible);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;