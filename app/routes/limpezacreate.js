//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const limpiezaController = require('../controllers/limpiezacreate');//comunicacion con el controller
//rutas
router.post('/', limpiezaController.addLimpieza);//para agregar Comestible
router.get('/', limpiezaController.getLimpieza);//para obtener las Comestible
router.put('/:codigolimpieza', limpiezaController.actualizarLimpieza);//para editarlas
router.delete('/:codigolimpieza', limpiezaController.eliminarLimpieza);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;