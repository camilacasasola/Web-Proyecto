//se utiliza express
const express = require('express');
const router = express.Router();//rutas expres para la comunicacion con el server
const productoController = require('../controllers/productocreate');//comunicacion con el controller
//rutas
router.post('/', productoController.addProducto);//para agregar bebida
router.get('/', productoController.getProducto);//para obtener las bebidas
router.put('/:codigoproducto', productoController.actualizarProducto);//para editarlas
router.delete('/:codigoproducto', productoController.eliminarProducto);//para eliminarlas
//se exporta para poder ser utilizado en otros archivos
module.exports = router;
