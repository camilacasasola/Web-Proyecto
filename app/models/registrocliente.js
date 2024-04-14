const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10; // Puedes aumentar el número de saltRounds para una seguridad mayor

const registroClienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Esto asegura que el email sea único en la colección.
  },
  password: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true,
    unique: true // Esto asegura que la cedula sea único en la colección.
  },
  telefono: {
    type: String,
    required: true
  }
});

// Pre-save action para encriptar la contraseña.
registroClienteSchema.pre('save', function(next) {
    // `this` apunta al documento actual.
    const user = this;
  
    // Procede sin encriptar si la contraseña no ha cambiado.
    if (!user.isModified('password')) return next();
  
    // Genera un salt y lo usa para encriptar la contraseña.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // Sustituye la contraseña ingresada por el usuario con la versión encriptada.
        user.password = hash;
        next();
      });
    });
  });
  
  // Opcionalmente, podrías añadir un método para verificar la contraseña:
  registroClienteSchema.methods.checkPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };
  
  const RegistroCliente = mongoose.model('RegistroCliente', registroClienteSchema);
  
  module.exports = RegistroCliente;
