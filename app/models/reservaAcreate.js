const mongoose = require('mongoose');

const reservaASchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  nombrerestaurante: { type: Number, required: true },
  numeromesa: { type: Number, required: true }
});
//indice unico para reserva
reservaASchema.index({ fecha: 1, hora: 1, numeromesa: 1 }, { unique: true });

module.exports = mongoose.model('RestauranteA', reservaASchema);

