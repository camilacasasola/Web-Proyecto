//se hace llamado a mongoose para poder crear la coleccion en la base de datos 
//tener en cuenta que todo se maneja por schema.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//encriptar
const saltRounds = 10; //se puede aumentar el número de saltRounds para una seguridad mayor

//se crea una constante que es la que determina cuales son los parametros que se van a guardar en la base de datos
const registroClienteSchema = new mongoose.Schema({
    //cada uno de los inputs del html se utilizan aca y llevan el mismo atributo 'name' para que concuerde con el html
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true //Esto asegura que el email sea único en la coleccinn.
  },
  password: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true,
    unique: true //Esto asegura que la cedula sea único en la coleccion.
  },
  telefono: {
    type: String,
    required: true
  }
});

//Pre-save action para encriptar la contrasena
registroClienteSchema.pre('save', function(next) {
    // `this` apunta al documento actual.
    const user = this;
  
    //Procede sin encriptar si la contrasena no ha cambiado.
    if (!user.isModified('password')) return next();
  
    //Genera un salt y lo usa para encriptar la contrasena.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        //Se sustituye la contrasena ingresada por el usuario con la versión encriptada.
        user.password = hash;
        next();
      });
    });
  });
  
  //Opcionalmente, se puede añadir un método para verificar la contrasena
  registroClienteSchema.methods.checkPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };
  //con esto se crea la coleccion en mongo y se establece el nombre con el que se quiere crear
  const RegistroCliente = mongoose.model('RegistroCliente', registroClienteSchema);
  //se exporta para ser utilizado en diferentes archivos
  module.exports = RegistroCliente;
