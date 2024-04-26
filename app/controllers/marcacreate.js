//aca se hace el llamado al modelo para verificar parametros en la base de datos
const marcacreate = require('../models/marcacreate');
//se maneja el momento en el que se agrega una bebida nueva marcacreate
exports.addMarca = async (req, res) => {
  try {
    const newMarca = new marcacreate(req.body);
    const mensaje = 'Marca agregado correctamente';
    await newMarca.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdemarca.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar una nueva Marca o no trate de insertar una Marca ya existente'); window.location.href = '/Datosdemarca.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getMarca = async (req, res) => {
    try {
        const marca = await marcacreate.find();
        res.json(marca);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la marca: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarMarca = async (req, res) => {
    try {
        const codigomarca = req.params.codigomarca; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const marcaactualizado = await marcacreate.findOneAndUpdate(
            { codigomarca: codigomarca }, //Filtro para encontrar la marca por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!marcaactualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Marca no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(marcaactualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar la marca, debe seleccionar una marca antes:', error);
        res.status(500).json({ message: 'Error al actualizar la marca' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarMarca = async (req, res) => {
    try {
        const { codigomarca } = req.params;
        await marcacreate.findOneAndDelete({ codigomarca });
        res.status(200).json('Marca eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};