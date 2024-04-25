//aca se hace el llamado al modelo para verificar parametros en la base de datos
const LimpiezaCreate = require('../models/limpiezacreate');
//se maneja el momento en el que se agrega una bebida nueva LimpiezaCreate
exports.addLimpieza = async (req, res) => {
  try {
    const newLimpieza = new LimpiezaCreate(req.body);
    const mensaje = 'Limpieza agregado correctamente agregado correctamente';
    await newLimpieza.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdelimpieza.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una nueva limpieza o no trate de insertar uan limpieza ya existente'); window.location.href = '/Datosdelimpieza.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getLimpieza = async (req, res) => {
    try {
        const limpieza = await LimpiezaCreate.find();
        res.json(limpieza);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las limpieza: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarLimpieza = async (req, res) => {
    try {
        const codigolimpieza = req.params.codigolimpieza; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const limpiezactualizado = await LimpiezaCreate.findOneAndUpdate(
            { codigolimpieza: codigolimpieza }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!limpiezactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Limpieza no encontrada' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(limpiezactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar la limpieza, debe seleccionar un limpieza antes:', error);
        res.status(500).json({ message: 'Error al actualizar el limpieza' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarLimpieza = async (req, res) => {
    try {
        const { codigolimpieza } = req.params;
        await LimpiezaCreate.findOneAndDelete({ codigolimpieza });
        res.status(200).json('¡Limpieza eliminada correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};