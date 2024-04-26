const bcrypt = require('bcryptjs');
const User = require('../models/loginadmin');

const registerUserController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si ya existe un usuario con ese nombre
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('<p>Usuario ya registrado.</p>'); // Conflicto
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Crear nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Confirmar el registro
    res.status(201).send('<p>Usuario registrado con éxito.</p>');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('<p>Error en el servidor durante el registro.</p>');
  }
};

module.exports = { registerUserController };