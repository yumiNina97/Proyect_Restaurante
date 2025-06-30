const express = require('express');
const router = express.Router();
const { crearPedido } = require('../controllers/pedidoController');
const { protegerRuta } = require('../middleware/authMiddleware');

router.post('/', protegerRuta, crearPedido);

module.exports = router;