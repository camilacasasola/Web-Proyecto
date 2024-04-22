//se llama al modelo para poder validar la informacion en la base de datos
const User = require('../models/loginadmin');
//encriptar la contrasena
const bcrypt = require('bcryptjs');

const loginUserController = async (req, res) => {
  try {
    //Extraer el nombre de usuario y la contrasena del cuerpo de la solicitud
    const { username, password } = req.body;

    //Imprimir el cuerpo de la solicitud para verificar los datos recibidos
    //console.log('Datos del formulario controller:', { username, password });
    
    //Buscar el usuario en la base de datos por su nombre de usuario
    const user = await User.findOne({ username });

    //manejo de errores por si no se encuentra el usuario en la base de datos
    if (!user) {
      console.log('Usuario no encontrado en la base de datos.');
      return res.status(401).send('<p>Usuario no encontrado</p>');
    }
    
    const storedPassword = user.password;
    // omparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, storedPassword);
    //validacion
    //console.log('Contrasena en la db',storedPassword);
    //console.log('Contrasena ingresada',password);
    // Si las contraseñas no coinciden
    //por si se proporciona un a contrana incorrecta
    if (!isMatch) {
      console.log('Contraseña incorrecta.');
      return res.status(401).send('<p>Contraseña Incorrecta</p>');
    }

    //Si el inicio de sesión es exitoso, redirige a Menu.html
    res.redirect('/Menu.html');
  } catch (error) {
    //Manejar cualquier error que ocurra durante el proceso de inicio de sesión
    console.error('Error en el servidor:', error);
    res.status(500).send('<p>Error en el servidor</p>');
  }
};

module.exports = { loginUserController };
