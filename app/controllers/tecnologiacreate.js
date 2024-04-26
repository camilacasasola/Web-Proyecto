//aca se hace el llamado al modelo para verificar parametros en la base de datos
const TecnologiaCreate = require('../models/tecnologiacreate');
//se maneja el momento en el que se agrega una bebida nueva 
exports.addTecnologia = async (req, res) => {
  try {
    const newTecnologia = new TecnologiaCreate(req.body);
    const mensaje = 'Tecnologia agregada correctamente';
    await newTecnologia.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdetecnologia.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una nueva tecnologia o no trate de insertar una tecnologia ya existente'); window.location.href = '/Datosdetecnologia.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getTecnologia = async (req, res) => {
    try {
        const tecnologia = await TecnologiaCreate.find();
        res.json(tecnologia);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tecnologias: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarTecnologia = async (req, res) => {
    try {
        const codigotecnologia = req.params.codigotecnologia; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const tecnologiaactualizado = await TecnologiaCreate.findOneAndUpdate(
            { codigotecnologia: codigotecnologia }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!tecnologiaactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Tecnologia no encontrada' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(tecnologiaactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar la tecnologia, debe seleccionar una tecnologia antes:', error);
        res.status(500).json({ message: 'Error al actualizar la tecnologia' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarTecnologia = async (req, res) => {
    try {
        const { codigotecnologia } = req.params;
        await TecnologiaCreate.findOneAndDelete({ codigotecnologia });
        res.status(200).json('Tecnologia eliminada correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};