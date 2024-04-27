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


//ejecuta la conexion
//connect()
//app.use(restaurant)
//app.use(bebida)

// Importar rutas
// Define la ruta para la página de inicio, que servirá 'Menu.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'Diseno web 1', 'home 1.html'));//aca va '..'
});

//ruta registroclientes
const registroClienteRoutes = require('./routes/registrocliente');
// Middleware para las rutas del registro de clientes
app.use('/api/registrocliente', registroClienteRoutes);

const loginClienteRoutes = require('./routes/logincliente');
// Usar rutas
app.use('/', loginClienteRoutes);

//ruta para registro admin
const adminRoutes = require('./routes/registroadmin.js');
//usar la ruta
app.use('/api/admin/registro', adminRoutes);

//ruta reset password
const resetAdminRoutes = require('./routes/resetpassadmin.js');
//usar la ruta
app.use('/api/get/registro', resetAdminRoutes);

// Rutas para el manejo de loginadmin
const authRoutes = require('./routes/loginadmin.js');
app.use('/api/auth/login', authRoutes);

//Sirve los archivos estaticos desde la carpeta y asegura que la ruta sea correcta
app.use(express.static(path.join(__dirname, '..', 'Diseno web 1')));//aca va '..'

//rutas de home1 primer vista que se inicia
const home1Routes = require('./routes/home1'); // No necesitas '.js'
// Usa el router 'menu'
app.use('/home1', home1Routes);

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

//ruta marca
const marcaRoutes = require('./routes/marcacreate.js');
//usar la ruta
app.use('/api/createmarca', marcaRoutes);

//ruta medida 
const medidaRoutes = require('./routes/medidacreate.js');
//usar ruta
app.use('/api/createmedida', medidaRoutes);

//ruta mesa
const mesaRoutes = require('./routes/mesacreate.js');
//usar la ruta
app.use('/api/createmesa', mesaRoutes);

//ruta platillo
const platilloRoutes = require('./routes/platillocreate.js');
//usar ruta
app.use('/api/createplatillo', platilloRoutes);

//ruta tecnologia 
const tecnologiaRoute = require('./routes/tecnologiacreate.js');
//usar la ruta
app.use('/api/createtecnologia', tecnologiaRoute);

//ruta para la reserva A
const reservaARoute = require('./routes/reservaAcreate.js');
//usar la ruta
app.use('/api/reservaA', reservaARoute)

//ruta para reserva B 
const reservaBRoute = require('./routes/reservaBcreate.js');
//usar la ruta
app.use('/api/reservaB', reservaBRoute);

//ruta para reserva C
const reservaCRoutes = require('./routes/reservaCcreate.js');
//usar la ruta
app.use('/api/reservaC', reservaCRoutes);

//ruta de productos
const productoRoutes = require('./routes/productocreate.js');
//usar la ruta
app.use('/api/createproducto', productoRoutes);

//ruta restaurantes
const resRoutes = require('./routes/restaurantecreate.js');
//usar la ruta
app.use('/api/createres', resRoutes);

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
