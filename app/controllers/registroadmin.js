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

    // Crear un nuevo usuario
    const newUser = new User({ username, password }); // Asignamos la contraseña tal cual

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Confirmar el registro
    res.status(201).send('<p>Usuario registrado con éxito.</p>');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('<p>Error en el servidor durante el registro.</p>');
  }
};

//mostras loa comestibles agregadas a mongo aca quede solo hice el post
const getAdmin = async (req, res) => {
  try {
      const admin = await User.find();
      res.json(admin);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener los administradores: " + error.message });
  }
};

module.exports = { 
  registerUserController,
  getAdmin
};


