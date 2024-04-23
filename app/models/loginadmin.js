//se hace llamado a mongoose para poder crear la coleccion en la base de datos 
//tener en cuenta que todo se maneja por schema.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//encriptar

//se crea una constante que es la que determina cuales son los parametros que se van a guardar en la base de datos
const loginSchema = new mongoose.Schema({
   //cada uno de los inputs del html se utilizan aca y llevan el mismo atributo 'name' para que concuerde con el html
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
    //Imprimir los valores de username y password antes de guardarlos
    console.log('Valores antes de guardar:', {
      username: this.username,
      password: this.password
    });

    //Hash de la contraseña antes de guardarla
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  } catch (error) {
    next(error);
  }
});
 //con esto se crea la coleccion en mongo y se establece el nombre con el que se quiere crear
const Login = mongoose.model('LoginAdmin', loginSchema);
//se exporta para ser utilizado en otros archivos
module.exports = Login;
