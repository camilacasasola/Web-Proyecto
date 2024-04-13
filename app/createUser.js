const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Login = require('./models/loginadmin'); // Asegúrate de reemplazar esto con la ruta correcta a tu modelo

mongoose.connect('mongodb://localhost:27017/DB_PFinalWEB1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.error('Error al conectar con MongoDB', err));

const username = 'admin';
const password = 'admin'; // Reemplaza esto con la contraseña que desees

const newUser = new Login({
  username,
  password,
});

newUser.save()
  .then(() => {
    console.log('Usuario creado exitosamente');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error al crear el usuario', err);
    mongoose.disconnect();
  });
