//aca se hace el llamado al modelo para verificar parametros en la base de datos
const consultaCreate = require('../models/consultacreate');
//se maneja el momento en el que se agrega una bebida nueva 
exports.addConsulta= async (req, res) => {
  try {
    const newconsulta = new consultaCreate(req.body);
    const mensaje = 'Consulta agregada correctamente';
    await newconsulta.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Informacion.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una nueva Consulta'); window.location.href = '/Informacion.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getConsulta = async (req, res) => {
  try {
    let query = {};
    
    // Filtrar por fecha si se proporciona como query param 'fecha'
    if (req.query.fecha) {
        const startDate = new Date(req.query.fecha);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(req.query.fecha);
        endDate.setUTCHours(23, 59, 59, 999);

        query.fecha = {
            $gte: startDate, // Mayor o igual que el inicio del día
            $lt: endDate    // Menor que el final del día
        };
    }

    const consultas = await consultaCreate.find(query).sort({ fecha: 1 });
    res.json(consultas);
} catch (error) {
    res.status(500).json({ message: "Error al obtener las consultas: " + error.message });
}
};
    //try {
        //const consulta = await consultaCreate.find();
        //res.json(consulta);
    //} catch (error) {
        //res.status(500).json({ message: "Error al obtener las consultas: " + error.message });
   // }
//};