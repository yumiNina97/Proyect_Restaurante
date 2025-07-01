const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion} = require('../controllers/usuarioController');
const { identificarUsuario } = require('../middleware/identificarUsuarioMiddleware');

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);
router.put('/:id', identificarUsuario);

module.exports = router;