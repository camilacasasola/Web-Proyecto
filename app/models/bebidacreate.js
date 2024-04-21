const mongoose = require('mongoose');

const bebidaSchema = new mongoose.Schema({
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

module.exports = mongoose.model('BebidaCreate', bebidaSchema);
