const cors = require('cors');
const path = require('path');
//const restaurant = require('./routes/restaurante.js');
//const bebida = require('./routes/bebida.js');
const express = require('express');
require ('dotenv').config();
//conexion a la base de datos 
const { connect } = require('./database.js');
const bodyParser = require('body-parser'); // Importa body-parser



//puerto en el que se ejecuta 
const PORT = process.env.PORT || 8000
//creacion de la instancia para una app express
//para facilitar solicitudes y cualquier recurso de un servicio web
const app = express()

// Configura body-parser
//es crucial para que el username y password del login no entren como indefinidos sino no se reconocen
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para registrar los datos de la solicitud en la consola
const logRequestData = (req, res, next) => {
    console.log('Datos del formulario server:', req.body);
    next(); // Llama a next() para continuar con el flujo de la solicitud
  };
  
  // Usa el middleware en la aplicación Express
  app.use(logRequestData);

//Middleware para parsear las peticiones en formato json
//osea convertir de cadena de texto a una estructura mas util
app.use(express.json())
//Middleware(objetos req y res) para cors
app.use(cors())

// Rutas para el manejo de login
const authRoutes = require('./routes/login');
app.use('/api/auth', authRoutes);
//ejecuta la conexion
//connect()
//app.use(restaurant)
//app.use(bebida)

//Sirve los archivos estaticos desde la carpeta y asegura que la ruta sea correcta
app.use(express.static(path.join(__dirname, '..', 'Diseno web 1')));//aca va '..'

// Importa las rutas
const menuRoutes = require('./routes/menu'); // No necesitas '.js'
// Usa el router 'menu'
app.use('/menu', menuRoutes);


// Define la ruta para la página de inicio, que servirá 'Menu.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'Diseno web 1', 'Menu.html'));//aca va '..'
  });

//se levanta el servicio
connect().then(() => {
app.listen(PORT,() => {
  console.log(`Server arrancado en: http://localhost:${PORT}`)

});
});
