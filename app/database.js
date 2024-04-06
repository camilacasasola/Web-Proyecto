//Es un obejto de libreria que se utiliza para Mongo y node 
//para gestinar relaciones entre los datos
//traduce un objeto en codigo y la representacion de esos objetos en mongodb
const mongoose = require('mongoose');
//es un modelo que carga variable de .env a process.env
//para gestionar mas facil configuraciones separadas
require('dotenv').config();

//es la constante de la conexion y el 
//CONEX_DB es la variable creada en .env para que gestionar la conexion para mejor seguridad y orden
const DB_CONNECTION = process.env.CONEX_DB

//metodo para que trate de establecer la conexion sino que tire un error
async function connect() {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log('Conexion a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos de MongoDB:', error);
  }
}

function getDatabase() {
  return mongoose.connection;
}
//permite que las funciones se importen y se usen en otros archivos del proyecto
module.exports = { connect, getDatabase };