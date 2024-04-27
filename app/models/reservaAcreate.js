const mongoose = require('mongoose');

const reservaASchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  nombrerestaurante: { type: String, required: true },
  numeromesa: { type: String, required: true }
});
//indice unico para reserva
reservaASchema.index({ fecha: 1, hora: 1 }, { unique: true });

module.exports = mongoose.model('ReservaA', reservaASchema);

