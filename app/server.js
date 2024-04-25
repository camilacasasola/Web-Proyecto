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
//es para servir archivos estaticos y mostrar los gets de las colecciones de la base de datos
app.use('/app', express.static('app'));

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

// Rutas para el manejo de loginadmin
const authRoutes = require('./routes/loginadmin.js');
app.use('/api/auth', authRoutes);
//ejecuta la conexion
//connect()
//app.use(restaurant)
//app.use(bebida)

// Importar rutas
// Define la ruta para la página de inicio, que servirá 'Menu.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'Diseno web 1', 'home 1.html'));//aca va '..'
});
const loginClienteRoutes = require('./routes/logincliente');
// Usar rutas
app.use('/', loginClienteRoutes);

//Sirve los archivos estaticos desde la carpeta y asegura que la ruta sea correcta
app.use(express.static(path.join(__dirname, '..', 'Diseno web 1')));//aca va '..'

//rutas de home1 primer vista que se inicia
const home1Routes = require('./routes/home1'); // No necesitas '.js'
// Usa el router 'menu'
app.use('/home1', home1Routes);

//ruta registroclientes
const registroClienteRoutes = require('./routes/registrocliente');
// Middleware para las rutas del registro de clientes
app.use('/api/registrocliente', registroClienteRoutes);

//ruta createbebidas
const bebidaRoutes = require('./routes/bebidacreate');
// Usar rutas de bebidas
app.use('/api/bebidacreate', bebidaRoutes); // Aquí es donde se usa el router de bebidas

//ruta create comestible
const comestibleRoutes = require('./routes/comestiblecreate.js');
//usar la ruta
app.use('/api/createcomestible', comestibleRoutes);

//ruta especia create
const especialRoutes = require('./routes/especialcreate.js');
//usar la ruta
app.use('/api/createespecial', especialRoutes);

//ruta equipocreate
const equipoRoutes = require('./routes/equipocreate.js');
//usar la ruta
app.use('/api/createequipo', equipoRoutes);

//ruta limpieza
const limpiezaRoutes = require('./routes/limpezacreate.js');
//usar la ruta
app.use('/api/createlimpieza', limpiezaRoutes);


//ruta para get de bebidas
//const getBebidas = require('./routes/bebidacreateget.js');
//usar las rutes get
//app.use('/api/bebidacreateget', getBebidas);

//se levanta el servicio
connect().then(() => {
app.listen(PORT,() => {
  console.log(`Server arrancado en: http://localhost:${PORT}`)

});
});
