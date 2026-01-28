
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { conectarBaseDeDatos } = require('./basedatos/config');

const servidor = express();

// Conecta a la base datos en Mongo
conectarBaseDeDatos();

// Middleware
servidor.use(cors());
servidor.use(express.json());

// Rutas
servidor.use('/api/auth', require('./rutas/autorizacionRutas'));
servidor.use('/api/products', require('./rutas/rutaProducto'));
servidor.use('/api/orders', require('./rutas/ordenRuta'));

// Inicio de servidor
const PUERTO = process.env.PORT || 5000;
servidor.listen(PUERTO, () => {
    console.log(`==========================================`);
    console.log(`  Servidor Raíces activo en puerto ${PUERTO}`);
    console.log(`  Estado: 2026 Operativo 🚀`);
    console.log(`==========================================`);
});
