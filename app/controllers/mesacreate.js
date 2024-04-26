//aca se hace el llamado al modelo para verificar parametros en la base de datos
const MesaCreate = require('../models/mesacreate');
//se maneja el momento en el que se agrega una bebida nueva 
exports.addMesa = async (req, res) => {
  try {
    const newMesa = new MesaCreate(req.body);
    const mensaje = 'Mesa agregada correctamente';
    await newMesa.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdemesa.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una nueva Mesa o no trate de insertar una Mesa ya existente'); window.location.href = '/Datosdemesa.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getMesa = async (req, res) => {
    try {
        const mesa = await MesaCreate.find();
        res.json(mesa);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las mesa: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarMesa = async (req, res) => {
    try {
        const codigomesa = req.params.codigomesa; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const mesaactualizado = await MesaCreate.findOneAndUpdate(
            { codigomesa: codigomesa }, //Filtro para encontrar la bebida por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!mesaactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Mesa no encontrada' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(mesaactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar la Mesa, debe seleccionar una Mesa antes:', error);
        res.status(500).json({ message: 'Error al actualizar la Mesa' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarMesa = async (req, res) => {
    try {
        const { codigomesa } = req.params;
        await MesaCreate.findOneAndDelete({ codigomesa });
        res.status(200).json('¡Mesa eliminada correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};