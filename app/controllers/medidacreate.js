//aca se hace el llamado al modelo para verificar parametros en la base de datos
const medidacreate = require('../models/medidacreate');
//se maneja el momento en el que se agrega una bebida nueva marcacreate
exports.addMedida = async (req, res) => {
  try {
    const newMedida = new medidacreate(req.body);
    const mensaje = 'Medida agregado correctamente';
    await newMedida.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdemedida.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una nueva Medida o no trate de insertar una Medida ya existente'); window.location.href = '/Datosdemedida.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getMedida = async (req, res) => {
    try {
        const medida = await medidacreate.find();
        res.json(medida);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la Medida: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarMedida = async (req, res) => {
    try {
        const codigomedida = req.params.codigomedida; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const medidaactualizado = await medidacreate.findOneAndUpdate(
            { codigomedida: codigomedida }, //Filtro para encontrar la marca por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!medidaactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Medida no encontrada' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(medidaactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar la Medida, debe seleccionar una Medida antes:', error);
        res.status(500).json({ message: 'Error al actualizar la Medida' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarMedida = async (req, res) => {
    try {
        const { codigomedida } = req.params;
        await medidacreate.findOneAndDelete({ codigomedida });
        res.status(200).json('Medida eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};