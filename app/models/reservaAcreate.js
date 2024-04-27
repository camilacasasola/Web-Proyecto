const mongoose = require('mongoose');

const reservaASchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  nombrerestaurante: { type: String, required: true },
  numeromesa: { type: String, required: true }
});

module.exports = mongoose.model('reservaA', reservaASchema);
