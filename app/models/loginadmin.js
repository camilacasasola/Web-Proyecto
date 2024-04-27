const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Eliminar la función de hashing de la contrasena


const Login = mongoose.model('LoginAdmin', loginSchema);

module.exports = Login;
