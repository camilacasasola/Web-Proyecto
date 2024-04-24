//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const especialController = require('../controllers/especialcreate');//comunicacion con el controller
//rutas
router.post('/', especialController.addEspecial);//para agregar Comestible
router.get('/', especialController.getEspecial);//para obtener las Comestible
router.put('/:codigoespecial', especialController.actualizarEspecial);//para editarlas
router.delete('/:codigoespecial', especialController.eliminarEspecial);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;