//aca se hace el llamado al modelo para verificar parametros en la base de datos
const especialcreate = require('../models/especialcreate');
//se maneja el momento en el que se agrega una bebida nueva especialcreate
exports.addEspecial = async (req, res) => {
  try {
    const newEspecial = new especialcreate(req.body);
    const mensaje = 'Especial agregado correctamente';
    await newEspecial.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdeespecial.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar un nuevo Especial o no trate de insertar un Especial ya existente'); window.location.href = '/Datosdeespecial.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getEspecial = async (req, res) => {
    try {
        const especial = await especialcreate.find();
        res.json(especial);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Especial: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarEspecial = async (req, res) => {
    try {
        const codigoespecial = req.params.codigoespecial; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const especialactualizado = await especialcreate.findOneAndUpdate(
            { codigoespecial: codigoespecial }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!especialactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Especial no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(especialactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar el especial, debe seleccionar un especial antes:', error);
        res.status(500).json({ message: 'Error al actualizar el especial' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarEspecial = async (req, res) => {
    try {
        const { codigoespecial } = req.params;
        await especialcreate.findOneAndDelete({ codigoespecial });
        res.status(200).json('¡Especial eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};