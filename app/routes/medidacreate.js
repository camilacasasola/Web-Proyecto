//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const medidaController = require('../controllers/medidacreate');//comunicacion con el controller
//rutas
router.post('/', medidaController.addMedida);//para agregar bebida
router.get('/', medidaController.getMedida);//para obtener las bebidas
router.put('/:codigomedida', medidaController.actualizarMedida);//para editarlas
router.delete('/:codigomedida', medidaController.eliminarMedida);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;
