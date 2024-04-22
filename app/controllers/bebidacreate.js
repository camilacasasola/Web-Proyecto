//aca se hace el llamado al modelo para verificar parametros en la base de datos
const BebidaCreate = require('../models/bebidacreate');
//se maneja el momento en el que se agrega una bebida nueva
exports.addBebida = async (req, res) => {
  try {
    const newBebida = new BebidaCreate(req.body);
    const mensaje = 'Bebida agregada correctamente';
    await newBebida.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdebebida.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una bebida nueva'); window.location.href = '/Datosdebebida.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras las bebidad agregadas a mongo
exports.getBebidas = async (req, res) => {
    try {
        const bebidas = await BebidaCreate.find();
        res.json(bebidas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las bebidas: " + error.message });
    }
};

//editar una bebida existente
exports.actualizarBebida = async (req, res) => {
    try {
        const codigo = req.params.codigo; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const bebidaActualizada = await BebidaCreate.findOneAndUpdate(
            { codigo: codigo }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!bebidaActualizada) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Bebida no encontrada' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(bebidaActualizada);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar la bebida, debe seleccionar una bebida antes:', error);
        res.status(500).json({ message: 'Error al actualizar la bebida' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarBebida = async (req, res) => {
    try {
        const { codigo } = req.params;
        await BebidaCreate.findOneAndDelete({ codigo });
        res.status(200).json('¡Bebida eliminada correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
