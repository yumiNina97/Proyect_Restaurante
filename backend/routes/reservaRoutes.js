const express = require('express');
const router = express.Router();
const { crearReserva } = require('../controllers/reservaController');
const { identificarUsuario } = require('../middleware/identificarUsuarioMiddleware');

router.post('/', identificarUsuario, crearReserva);

module.exports = router;