//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const equipoController = require('../controllers/equipocreate');//comunicacion con el controller
//rutas
router.post('/', equipoController.addEquipo);//para agregar Comestible
router.get('/', equipoController.getEquipo);//para obtener las Comestible
router.put('/:codigoequipo', equipoController.actualizarEquipo);//para editarlas
router.delete('/:codigoequipo', equipoController.eliminarEquipo);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;