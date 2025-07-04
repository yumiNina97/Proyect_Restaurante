//restaurantesushi*
const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion, actualizarUsuario } = require('../controllers/usuarioController');
const { identificarUsuario } = require('../middleware/identificarUsuarioMiddleware');

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);
router.put('/:id', identificarUsuario, actualizarUsuario);

module.exports = router;