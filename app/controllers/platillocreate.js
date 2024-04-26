//aca se hace el llamado al modelo para verificar parametros en la base de datos
const PlatilloCreate = require('../models/platillocreate');
//se maneja el momento en el que se agrega una bebida nueva 
exports.addPlatillo = async (req, res) => {
  try {
    const newPlatillo = new PlatilloCreate(req.body);
    const mensaje = 'Platillo agregado correctamente';
    await newPlatillo.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdeplatillo.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar un nuevo Platillo o no trate de insertar un Platillo ya existente'); window.location.href = '/Datosdeplatillo.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getPlatillo = async (req, res) => {
    try {
        const platillo = await PlatilloCreate.find();
        res.json(platillo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los platillos: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarPlatillo = async (req, res) => {
    try {
        const codigoplatillo = req.params.codigoplatillo; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const platilloactualizado = await PlatilloCreate.findOneAndUpdate(
            { codigoplatillo: codigoplatillo }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!platilloactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Platillo no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(platilloactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar el platillo, debe seleccionar un platillo antes:', error);
        res.status(500).json({ message: 'Error al actualizar el platillo' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarPlatillo = async (req, res) => {
    try {
        const { codigoplatillo } = req.params;
        await PlatilloCreate.findOneAndDelete({ codigoplatillo });
        res.status(200).json('¡Platillo eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};