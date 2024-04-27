const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  nombreCompleto: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

const Consulta = mongoose.model('Consultacliente', consultaSchema);

module.exports = Consulta;
