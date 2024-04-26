//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const tecnologiaController = require('../controllers/tecnologiacreate');//comunicacion con el controller
//rutas
router.post('/', tecnologiaController.addTecnologia);//para agregar Comestible
router.get('/', tecnologiaController.getTecnologia);//para obtener las Comestible
router.put('/:codigotecnologia', tecnologiaController.actualizarTecnologia);//para editarlas
router.delete('/:codigotecnologia', tecnologiaController.eliminarTecnologia);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;