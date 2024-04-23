const express = require('express');//servidor express se hace el llamado
const path = require('path');//para trabajar con rutas y directorios
const routes = express.Router();

//Ruta para mostrar el archivo HTML 'Menu.html'.
routes.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'Diseno web 1', 'home 1'));
    });
//esxportar para ser utilizado en otros archivos
module.exports = routes;
