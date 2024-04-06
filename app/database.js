const mongoose = require('mongoose');
require('dotenv').config();


const DB_CONNECTION = process.env.CONEX_DB

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

module.exports = { connect, getDatabase };