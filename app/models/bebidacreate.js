//se hace llamado a mongoose para poder crear la coleccion en la base de datos 
//tener en cuenta que todo se maneja por schema.
const mongoose = require('mongoose');
//se crea una constante que es la que determina cuales son los parametros que se van a guardar en la base de datos
const bebidaSchema = new mongoose.Schema({
  //cada uno de los inputs del html se utilizan aca y llevan el mismo atributo 'name' para que concuerde con el html
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  marca: { type: String, required: true },
  precio: { type: Number, required: true },
  codigorestaurante: { type: String, required: true },
  pais: { type: String, required: true },
  codigomedida: { type: String, required: true },
  ano: { type: Number, required: true }
});
//con esto se crea la coleccion en mongo y se establece el nombre con el que se quiere crear
//y se exporta directamente para que el modulo pueda ser utilizado en otros archivos
module.exports = mongoose.model('BebidaCreate', bebidaSchema);
