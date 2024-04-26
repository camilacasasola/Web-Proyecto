//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const mesaController = require('../controllers/mesacreate');//comunicacion con el controller
//rutas
router.post('/', mesaController.addMesa);//para agregar Comestible
router.get('/', mesaController.getMesa);//para obtener las Comestible
router.put('/:codigomesa', mesaController.actualizarMesa);//para editarlas
router.delete('/:codigomesa', mesaController.eliminarMesa);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;