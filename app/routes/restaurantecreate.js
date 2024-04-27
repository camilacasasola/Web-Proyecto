//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const resController = require('../controllers/restaurantecreate');//comunicacion con el controller
//rutas
router.post('/', resController.addRestaurante);//para agregar bebida
router.get('/', resController.getRestaurante);//para obtener las bebidas
router.put('/:codigorestaurante', resController.actualizarRestaurante);//para editarlas
router.delete('/:codigorestaurante', resController.eliminarRestaurante);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;
