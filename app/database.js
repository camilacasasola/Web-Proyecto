import mongoose from 'mongoose';
import 'dotenv/config'

const DB_CONNECTION = process.env.CONEX_DB

async function connect() {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexinn a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos de MongoDB:', error);
  }
}

function getDatabase() {
  return mongoose.connection;
}

export { connect, getDatabase };