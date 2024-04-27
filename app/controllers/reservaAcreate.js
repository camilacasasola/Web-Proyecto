const ReservaA = require('../models/reservaAcreate');

exports.createReservaA = async (req, res) => {
  try {
    const nuevaReserva = new ReservaA({
      fecha: req.body.fecha,
      hora: req.body.hora,
      nombrerestaurante: req.body.nombrerestaurante,
      numeromesa: req.body.numeromesa
    });
    await nuevaReserva.save();
    res.status(201).send({ message: "Reserva creada exitosamente.", reserva: nuevaReserva });
  } catch (error) {
    res.status(500).send({ message: "Error al crear la reserva", error: error.message });
  }
};
