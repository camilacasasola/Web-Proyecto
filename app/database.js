import mongoose from 'mongoose';
import 'dotenv/config'

const DB_CONNECTION = process.env.CLOUD_DB

async function connect() {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

function getDatabase() {
  return mongoose.connection;
}

export { connect, getDatabase };