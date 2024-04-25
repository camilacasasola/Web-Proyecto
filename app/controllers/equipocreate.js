//aca se hace el llamado al modelo para verificar parametros en la base de datos
const EquipoCreate = require('../models/equipocreate');
//se maneja el momento en el que se agrega una bebida nueva 
exports.addEquipo = async (req, res) => {
  try {
    const newEquipo = new EquipoCreate(req.body);
    const mensaje = 'Equipo agregado correctamente';
    await newEquipo.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdeequipo.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar un nuevo Equipo o no trate de insertar Equipo ya existentes'); window.location.href = '/Datosdeequipo.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getEquipo = async (req, res) => {
    try {
        const equipo = await EquipoCreate.find();
        res.json(equipo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las equipo: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarEquipo = async (req, res) => {
    try {
        const codigoequipo = req.params.codigoequipo; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const equipoactualizado = await EquipoCreate.findOneAndUpdate(
            { codigoequipo: codigoequipo }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!equipoactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Equipo no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(equipoactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar el Equipo, debe seleccionar un Equipo antes:', error);
        res.status(500).json({ message: 'Error al actualizar el Equipo' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarEquipo = async (req, res) => {
    try {
        const { codigoequipo } = req.params;
        await EquipoCreate.findOneAndDelete({ codigoequipo });
        res.status(200).json('¡Equipo eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};