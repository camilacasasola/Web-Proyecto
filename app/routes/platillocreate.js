//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const platilloController = require('../controllers/platillocreate');//comunicacion con el controller
//rutas
router.post('/', platilloController.addPlatillo);//para agregar Comestible
router.get('/', platilloController.getPlatillo);//para obtener las Comestible
router.put('/:codigoplatillo', platilloController.actualizarPlatillo);//para editarlas
router.delete('/:codigoplatillo', platilloController.eliminarPlatillo);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;