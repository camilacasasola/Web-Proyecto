const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

loginSchema.pre('save', async function(next) {
  try {
    // Imprimir los valores de username y password antes de guardarlos
    console.log('Valores antes de guardar:', {
      username: this.username,
      password: this.password
    });

    // Hash de la contraseña antes de guardarla
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Login = mongoose.model('LoginAdmin', loginSchema);

module.exports = Login;
