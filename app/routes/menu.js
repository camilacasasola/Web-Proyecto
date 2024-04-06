const express = require('express');
const path = require('path');
const routes = express.Router();

// Ruta para mostrar el archivo HTML 'Menu.html'.
routes.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'Diseno web 1', 'Menu.html'));
    });

module.exports = routes;
