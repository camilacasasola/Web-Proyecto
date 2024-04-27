const bcrypt = require('bcryptjs');
const User = require('../models/loginadmin');

const registerUserController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si ya existe un usuario con ese nombre
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.send(`<script>alert('Usario ya registrado, inserte un nombre de usuario diferente!!!'); window.location.href = '/UsuarioAdmin.html';</script>`);
      return;
    }

    // Crear un nuevo usuario
    const newUser = new User({ username, password }); // Asignamos la contraseña tal cual

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Confirmar el registro
    res.send(`<script>alert('Usuario registrado exitosamente!!!'); window.location.href = '/UsuarioAdmin.html';</script>`);
      return;
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


