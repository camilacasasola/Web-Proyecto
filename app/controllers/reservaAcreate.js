const ReservaA = require('../models/reservaAcreate');

exports.createReservaA = async (req, res) => {
    try {
      const nuevaReserva = new ReservaA({
        fecha: req.body.fecha,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        hora: req.body.hora,
        nombrerestaurante: req.body.nombrerestaurante,
        numeromesa: req.body.numeromesa
      });
      await nuevaReserva.save();
      const mensaje = 'La reservación se creó exitosamente.';
      res.send(`<script>alert('${mensaje}'); window.location.href = '/ReservaA.html';</script>`);
    } catch (error) {
      let mensajeError = 'Ocurrió un error al procesar su reservacion, Intente nuevamente.';
      // Verificar si el error es debido a una violación del índice único
      if (error.code === 11000) {
        mensajeError = 'Ya existe una reservacion con esa fecha y hora para el numero de mesa indicado. Por favor, elija un horario diferente o cambie de mesa.';
      }
      res.send(`<script>alert('${mensajeError}'); window.location.href = '/ReservaA.html';</script>`);
    }
  };
  //get de las reservas 
  exports.getReservas = async (req, res) => {
    try {
      let query = {};
      if (req.query.fecha) {
        // Convertir la fecha a un objeto Date de JavaScript asumiendo que la fecha es UTC
        const startDate = new Date(req.query.fecha);
        startDate.setUTCHours(0, 0, 0, 0); // Configurar al inicio del día UTC
  
        const endDate = new Date(req.query.fecha);
        endDate.setUTCHours(23, 59, 59, 999); // Configurar al final del día UTC
  
        query.fecha = {
          $gte: startDate, // Mayor o igual que el inicio del día
          $lte: endDate   // Menor o igual que el final del día
        };
      }
      
      const reservas = await ReservaA.find(query).sort({ fecha: 1, hora: 1 }); // Ordena las reservas por fecha y hora
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las reservas", error: error });
    }
  };

//por si no sirve esto si funciona
        //query.fecha = new Date(req.query.fecha);
     // }
      //const reservas = await ReservaA.find(query);
      //res.status(200).json(reservas);
    //} catch (error) {
      //res.status(500).json({ message: "Error al obtener las reservas", error: error });
    //}
 // };
