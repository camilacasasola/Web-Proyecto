//se hace llamado al modelo 
const RegistroCliente = require('../models/registrocliente');

//se crean los parametros que va a recibir para poder crear un usuario
const registrarCliente = async (req, res) => {
  try {
    const { nombre, email, password, cedula, telefono } = req.body;

    const nuevoCliente = new RegistroCliente({
      nombre,
      email,
      password,
      cedula,
      telefono
    });

    await nuevoCliente.save();
    //enviar un mensaje de alerta que el cliente se registro exitosamente
    const mensaje = 'Cliente registrado exitosamente';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/home cliente.html';</script>`);
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    //Enviar un mensaje de que hubo un error al registrar al usuario
    res.send(`<script>alert('Error al registrar el usuario: ${error.message}'); window.location.href = '/registro.html';</script>`);
  }
};

module.exports = { registrarCliente };
