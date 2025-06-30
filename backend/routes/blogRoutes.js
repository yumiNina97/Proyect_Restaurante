const express = require('express');
const router = express.Router();
const { 
    obtenerTodosLosPosts, 
    obtenerPostPorId, 
    crearPost, 
    manejarLike,
    obtenerMisPosts,
    obtenerPostsFavoritos,
    actualizarPost,
    eliminarPost
} = require('../controllers/blogController');
const { protegerRuta } = require('../middleware/authMiddleware');
const { identificarUsuario } = require('../middleware/identificarUsuarioMiddleware');

router.get('/', obtenerTodosLosPosts);
router.get('/mis-articulos', protegerRuta, obtenerMisPosts);
router.get('/favoritos', protegerRuta, obtenerPostsFavoritos);
router.get('/:id', obtenerPostPorId);
router.post('/', protegerRuta, crearPost);
router.put('/:id', protegerRuta, actualizarPost);
router.delete('/:id', protegerRuta, eliminarPost);
router.post('/:id/like', identificarUsuario, manejarLike);

module.exports = router;