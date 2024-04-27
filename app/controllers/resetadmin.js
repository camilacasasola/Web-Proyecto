// registroadmin.js
const User = require('../models/loginadmin');

exports.actualizarContrasena = async (req, res) => {
    try {
      const { username } = req.params;
      const { password, newpassword } = req.body;
  
      // Verificar si el usuario existe en la base de datos
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Verificar si la contraseña actual coincide con la almacenada en la base de datos
      if (password !== user.password) {
        return res.status(401).send('La contraseña actual es incorrecta');
      }
  
      // Actualizar la contraseña del usuario
      user.password = newpassword;
      await user.save();
  
      // Verificar si se guardaron los cambios correctamente
      const updatedUser = await User.findOne({ username });
      if (updatedUser.password !== newpassword) {
        throw new Error('Error al actualizar la contraseña en la base de datos');
      }
  
      // Respuesta exitosa
      res.status(200).send('Contraseña actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      res.status(500).send('Error al actualizar la contraseña en el servidor');
    }
  };