//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const bebidaController = require('../controllers/bebidacreate');//comunicacion con el controller
//rutas
router.post('/', bebidaController.addBebida);//para agregar bebida
router.get('/', bebidaController.getBebidas);//para obtener las bebidas
router.put('/:codigo', bebidaController.actualizarBebida);//para editarlas
router.delete('/:codigo', bebidaController.eliminarBebida);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;
