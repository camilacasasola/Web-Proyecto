const RegistroCliente = require('../models/registrocliente');

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
    // Enviar un script de alerta como respuesta
    const mensaje = 'Cliente registrado exitosamente';
    res.send(`<script>alert('${mensaje}'); window.location.href = '/';</script>`);
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    // Enviar un script de alerta con el mensaje de error como respuesta
    res.send(`<script>alert('Error al registrar el usuario: ${error.message}'); window.location.href = '/';</script>`);
  }
};

module.exports = { registrarCliente };
