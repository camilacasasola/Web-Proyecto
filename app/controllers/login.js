const User = require('../models/login');
const bcrypt = require('bcryptjs');

const loginUserController = async (req, res) => {
  try {
    // Extraer el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;

    // Imprimir el cuerpo de la solicitud para verificar los datos recibidos
    console.log('Datos del formulario controller:', { username, password });
    
    // Buscar el usuario en la base de datos por su nombre de usuario
    const user = await User.findOne({ username });

    // Si no se encuentra ningún usuario con el nombre de usuario proporcionado
    if (!user) {
      console.log('Usuario no encontrado en la base de datos.');
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    
    const storedPassword = user.password;
    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, storedPassword);
    //validacion
    console.log('Contrasena en la db',storedPassword);
    console.log('Contrasena ingresada',password);
    // Si las contraseñas no coinciden
    if (!isMatch) {
      console.log('Contraseña incorrecta.');
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Enviar una respuesta si el inicio de sesión es exitoso
    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de inicio de sesión
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

module.exports = { loginUserController };
//come