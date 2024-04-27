//se hace el llamado al modelo para la validacion de los datos 
const RegistroCliente = require('../models/registrocliente');
//para encriptar 
const bcrypt = require('bcryptjs');

//Controlador para manejar el inicio de sesión
exports.loginCliente = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cliente = await RegistroCliente.findOne({ email });
        if (!cliente) {
            // Usuario no encontrado, enviar alerta y redirigir
            res.send(`<script>alert('Usuario no encontrado'); window.location.href = '/home cliente.html';</script>`);
            return;
        }

        //comparar contrasena almacenada y la proporcionada
        const isMatch = await bcrypt.compare(password, cliente.password);
        if (isMatch) {
            //Iniciar sesinn exitoso, redireccionar al menu del cliente
            res.redirect('/menu Cliente.html'); // Ajusta la redirección según tu lógica de negocio
        } else {
            //Contraseña incorrecta, enviar alerta y redirigir
            res.send(`<script>alert('Contraseña incorrecta'); window.location.href = '/home cliente.html';</script>`);
            return;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
};
