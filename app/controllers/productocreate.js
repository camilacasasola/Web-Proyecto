//aca se hace el llamado al modelo para verificar parametros en la base de datos
const productocreate = require('../models/productocreate');
//se maneja el momento en el que se agrega una bebida nueva marcacreate
exports.addProducto = async (req, res) => {
  try {
    const newProducto = new productocreate(req.body);
    const mensaje = 'Producto agregado correctamente';
    await newProducto.save();
    res.send(`<script>alert('${mensaje}'); window.location.href = '/Datosdeproducto.html';</script>`);
    //res.status(201).json(newBebida);
  } catch (error) {
    res.send(`<script>alert('Debe completar todos los campos para agregar un nuevo Producto o no trate de insertar un Prducto ya existente'); window.location.href = '/Datosdeproducto.html';</script>`)
    //res.status(400).json({ message: error.message });
  }
};
//mostras loa comestibles agregadas a mongo aca quede solo hice el post
exports.getProducto = async (req, res) => {
    try {
        const prudcucto = await productocreate.find();
        res.json(prudcucto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Prducto: " + error.message });
    }
};

//editar un comestible existente
exports.actualizarProducto = async (req, res) => {
    try {
        const codigoproducto = req.params.codigoproducto; //Obtener el código de la bebida de los parámetros de la solicitud
        const datosActualizados = req.body; //Obtener los datos editados de la solicitud

        //Buscar la bebida por su código y editarla en la base de datos
        const productoctualizado = await productocreate.findOneAndUpdate(
            { codigoproducto: codigoproducto }, //Filtro para encontrar la marca por su código
            datosActualizados, //Nuevos datos para actualizar
            { new: true } //Opcion para devolver la versinn actualizada de la bebida
        );

        if (!productoctualizado) { //manejo de errores al no existir la bebida 
            return res.status(404).json({ message: 'Prducto no encontrado' });
            //return res.send(`<script>alert('bebida no encontrada'); window.location.href = '/Datosdebebida.html';</script>`)
        }

        //Enviar la respuesta con la bebida actualizada
        res.json(productoctualizado);
    } catch (error) {
        //Manejar cualquier error que ocurra durante la actualizacion
        console.error('Error al actualizar el Prducto, debe seleccionar un Prducto antes:', error);
        res.status(500).json({ message: 'Error al actualizar el Prducto' });
        //res.send(`<script>alert('Error al actualizar la bebida'); window.location.href = '/Datosdebebida.html';</script>`)
    }
};
//manejo para eliminar bebidas de la base de datos
exports.eliminarProducto = async (req, res) => {
    try {
        const { codigoproducto } = req.params;
        await productocreate.findOneAndDelete({ codigoproducto });
        res.status(200).json('Prducto eliminado correctamente!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};