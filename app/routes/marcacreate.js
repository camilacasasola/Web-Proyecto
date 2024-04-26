//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const marcaController = require('../controllers/marcacreate');//comunicacion con el controller
//rutas
router.post('/', marcaController.addMarca);//para agregar Comestible
router.get('/', marcaController.getMarca);//para obtener las Comestible
router.put('/:codigomarca', marcaController.actualizarMarca);//para editarlas
router.delete('/:codigomarca', marcaController.eliminarMarca);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;