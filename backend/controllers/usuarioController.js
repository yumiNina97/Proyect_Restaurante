const prisma = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.usuarios.create({
        data: {
            nombre: nombre,
            email: email,
            contrasena_hash: contrasenaHash,
        }
    });

    res.status(201).json({
        mensaje: 'Usuario registrado con éxito',
        usuario: {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol
        }
    });
};

const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    
    const usuario = await prisma.usuarios.findUnique({
        where: { email: email }
    });

    if (!usuario) {
        return res.status(404).json({ mensaje: "Ese usuario no existe" });
    }

    const contrasenaValida = await bcrypt.compare(password, usuario.contrasena_hash);

    if (!contrasenaValida) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas, intentelo de nuevo" });
    }

    const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.json({
        mensaje: 'Ahora estas logueado!',
        token: token
    });
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
};