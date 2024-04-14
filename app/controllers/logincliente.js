const RegistroCliente = require('../models/registrocliente'); // Asegúrate de que la ruta al modelo es correcta
const bcrypt = require('bcryptjs');

// Controlador para manejar el inicio de sesión
exports.loginCliente = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cliente = await RegistroCliente.findOne({ email });
        if (!cliente) {
            // Usuario no encontrado, enviar alerta y redirigir
            res.send(`<script>alert('Usuario no encontrado'); window.location.href = '/home cliente.html';</script>`);
            return;
        }

        const isMatch = await bcrypt.compare(password, cliente.password);
        if (isMatch) {
            // Iniciar sesión exitoso, redireccionar al menú del cliente
            res.redirect('/menu Cliente.html'); // Ajusta la redirección según tu lógica de negocio
        } else {
            // Contraseña incorrecta, enviar alerta y redirigir
            res.send(`<script>alert('Contraseña incorrecta'); window.location.href = '/home cliente.html';</script>`);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error en el servidor');
    }
};
