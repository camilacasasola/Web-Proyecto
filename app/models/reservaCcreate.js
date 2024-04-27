const mongoose = require('mongoose');

const reservaCSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  nombrerestaurante: { type: String, required: true },
  numeromesa: { type: Number, required: true }
});
//indice unico para reserva
reservaCSchema.index({ fecha: 1, hora: 1 }, { unique: true });

module.exports = mongoose.model('ReservaC', reservaCSchema);

