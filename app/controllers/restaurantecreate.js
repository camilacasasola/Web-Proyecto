//aca se hace el llamado al modelo para verificar parametros en la base de datos
const rescreate = require('../models/restaurantecreate');
//se maneja el momento en el que se agrega una bebida nueva marcacreate
exports.addRestaurante = async (req, res) => {
  try {
    const newRestaurante = new rescreate(req.body);
    const mensaje = 'Restaurante agregado correctamente';
    await newRestaurante.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosderestaurante.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar un nuevo Restaurante o no trate de insertar un Restaurante ya existente'); window.location.href = '/Datosderestaurante.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getRestaurante = async (req, res) => {
    try {
        const Restaurante = await rescreate.find();
        res.json(Restaurante);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Restaurante: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarRestaurante = async (req, res) => {
    try {
        const codigorestaurante = req.params.codigorestaurante; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const productoctualizado = await rescreate.findOneAndUpdate(
            { codigorestaurante: codigorestaurante }, //Filtro para encontrar la marca por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!productoctualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Restaurante no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(productoctualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar el Restaurante, debe seleccionar un Restaurante antes:', error);
        res.status(500).json({ message: 'Error al actualizar el Restaurante' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarRestaurante = async (req, res) => {
    try {
        const { codigorestaurante } = req.params;
        await rescreate.findOneAndDelete({ codigorestaurante });
        res.status(200).json('Restaurante eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};