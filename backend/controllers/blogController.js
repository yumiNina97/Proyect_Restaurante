const prisma = require('../db');
const CrearPublicacionCommand = require('../commands/CrearPublicacionCommand');
const ActualizarPublicacionCommand = require('../commands/ActualizarPublicacionCommand');
const EliminarPublicacionCommand = require('../commands/EliminarPublicacionCommand');

const obtenerTodosLosPosts = async (req, res) => {
    const posts = await prisma.publicacionesblog.findMany({
        orderBy: { fecha_creacion: 'desc' },
        include: {
            usuarios: { select: { nombre: true } }
        }
    });
    res.json(posts);
};

const obtenerPostPorId = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.publicacionesblog.findUnique({
        where: { id: parseInt(id) },
        include: {
            usuarios: { select: { nombre: true } }
        }
    });

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ mensaje: 'No se encontro' });
    }
};

const crearPost = async (req, res) => {
    const { titulo, contenido, imagenUrl } = req.body;
    const autorId = req.usuario.id;

    const datosComando = { titulo, contenido, imagenUrl, autorId };
    const comando = new CrearPublicacionCommand(datosComando);
    const nuevaPublicacion = await comando.ejecutar();

    res.status(201).json({
        mensaje: "Publicacion creada :)",
        publicacion: nuevaPublicacion
    });
};

const manejarLike = async (req, res) => {
    const { id } = req.params;
    const publicacionId = parseInt(id);
    const usuarioId = req.usuario ? req.usuario.id : null;

    if (usuarioId) {
        const likeExistente = await prisma.likesblog.findUnique({
            where: {
                publicacion_id_usuario_id: {
                    publicacion_id: publicacionId,
                    usuario_id: usuarioId,
                },
            },
        });

        if (likeExistente) {
            await prisma.likesblog.delete({ where: { publicacion_id_usuario_id: { publicacion_id: publicacionId, usuario_id: usuarioId } } });
            res.json({ mensaje: 'Like eliminado de la db' });
        } else {
            await prisma.likesblog.create({ data: { publicacion_id: publicacionId, usuario_id: usuarioId } });
            res.json({ mensaje: 'Like adicionado a la db' });
        }

    } else {
        await prisma.publicacionesblog.update({
            where: { id: publicacionId },
            data: {
                contador_likes: {
                    increment: 1,
                },
            },
        });
        res.json({ mensaje: 'Like exitoso an' });
    }
};

const obtenerMisPosts = async (req, res) => {
    const autorId = req.usuario.id;

    const posts = await prisma.publicacionesblog.findMany({
        where: { autor_id: autorId },
        orderBy: { fecha_creacion: 'desc' },
        include: {
            usuarios: { select: { nombre: true } }
        }
    });

    res.json(posts);
};

const obtenerPostsFavoritos = async (req, res) => {
    const usuarioId = req.usuario.id;

    const postsLikeados = await prisma.publicacionesblog.findMany({
        where: {
            likesblog: {
                some: {
                    usuario_id: usuarioId,
                },
            },
        },
        orderBy: { fecha_creacion: 'desc' },
        include: {
            usuarios: { select: { nombre: true } }
        }
    });

    res.json(postsLikeados);
};
const actualizarPost = async (req, res) => {
    const idPublicacion = parseInt(req.params.id);
    const idUsuario = req.usuario.id;
    const datosActualizados = req.body;

    const comando = new ActualizarPublicacionCommand(idPublicacion, idUsuario, datosActualizados);
    
    try {
        const publicacionActualizada = await comando.ejecutar();
        res.json(publicacionActualizada);
    } catch (error) {
        if (error.message === 'NoAutorizado') {
            res.status(403).json({ mensaje: 'No eres el propietario del post' });
        } else if (error.message === 'PublicacionNoEncontrada') {
            res.status(404).json({ mensaje: 'No se encontro' });
        } else {
            res.status(500).json({ mensaje: 'Error' });
        }
    }
};

const eliminarPost = async (req, res) => {
    const idPublicacion = parseInt(req.params.id);
    const idUsuario = req.usuario.id;

    const comando = new EliminarPublicacionCommand(idPublicacion, idUsuario);
    
    try {
        const resultado = await comando.ejecutar();
        res.json(resultado);
    } catch (error) {
        if (error.message === 'NoAutorizado') {
            res.status(403).json({ mensaje: 'No puedes eliminar el post' });
        } else if (error.message === 'PublicacionNoEncontrada') {
            res.status(404).json({ mensaje: 'No existe el post' });
        } else {
            res.status(500).json({ mensaje: 'Error' });
        }
    }
};

module.exports = {
    obtenerTodosLosPosts,
    obtenerPostPorId,
    crearPost,
    manejarLike,
    obtenerMisPosts,
    obtenerPostsFavoritos,
    actualizarPost,
    eliminarPost,
};