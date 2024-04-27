const User = require('../models/loginadmin');

const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      console.log('Usuario no encontrado en la base de datos.');
      return res.status(401).send('<p>Usuario no encontrado</p>');
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    if (user.password !== password) {
      console.log('Contraseña incorrecta.');
      return res.status(401).send('<p>Contraseña Incorrecta</p>');
    }

    //Si el inicio de sesión es exitoso, redirige a Menu.html
    res.redirect('/Menu.html');
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).send('<p>Error en el servidor</p>');
  }
};

module.exports = { loginUserController };
