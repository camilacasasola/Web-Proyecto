//se hace llamado a mongoose para poder crear la coleccion en la base de datos 
//tener en cuenta que todo se maneja por schema.
const mongoose = require('mongoose');
//se crea una constante que es la que determina cuales son los parametros que se van a guardar en la base de datos
const MesaSchema = new mongoose.Schema({
  //cada uno de los inputs del html se utilizan aca y llevan el mismo atributo 'name' para que concuerde con el html
  codigomesa: { type: String, required: true, unique: true },
  nombremesa: { type: String, required: true },
  numeromesa: { type: String, required: true },
  codigorestaurante: { type: String, required: true },
  cantidadsillas: { type: String, required: true },
});
//con esto se crea la coleccion en mongo y se establece el nombre con el que se quiere crear
//y se exporta directamente para que el modulo pueda ser utilizado en otros archivos
module.exports = mongoose.model('mesacreate', MesaSchema);