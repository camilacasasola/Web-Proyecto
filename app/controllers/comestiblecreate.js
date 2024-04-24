//aca se hace el llamado al modelo para verificar parametros en la base de datos
const ComestibleCreate = require('../models/comestiblecreate');
//se maneja el momento en el que se agrega una bebida nueva 
exports.addComestible = async (req, res) => {
  try {
    const newComestible = new ComestibleCreate(req.body);
    const mensaje = 'Comestible agregado correctamente';
    await newComestible.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdecomestible.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar un nuevo comestible o no trate de insertar comestible ya existentes'); window.location.href = '/Datosdecomestible.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getComestible = async (req, res) => {
    try {
        const comestible = await ComestibleCreate.find();
        res.json(comestible);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las comestible: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarComestible = async (req, res) => {
    try {
        const codigocomestible = req.params.codigocomestible; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const comestibleactualizado = await ComestibleCreate.findOneAndUpdate(
            { codigocomestible: codigocomestible }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!comestibleactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Comestible no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(comestibleactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar el comestible, debe seleccionar un comestible antes:', error);
        res.status(500).json({ message: 'Error al actualizar el comestible' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarComestible = async (req, res) => {
    try {
        const { codigocomestible } = req.params;
        await ComestibleCreate.findOneAndDelete({ codigocomestible });
        res.status(200).json('¡Comestible eliminada correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};