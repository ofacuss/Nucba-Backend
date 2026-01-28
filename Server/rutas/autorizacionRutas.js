const { Router } = require('express');
const enrutador = Router();
const { registrarUsuario, loginUsuario } = require('../controladores/authcontrol');

// Ruta para crear cuenta nueva
enrutador.post('/register', registrarUsuario);

// Ruta para entrar a la cuenta
enrutador.post('/login', loginUsuario);

module.exports = enrutador;
