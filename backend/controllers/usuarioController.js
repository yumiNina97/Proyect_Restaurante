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
        mensaje: 'Usuario registrado correctamente :)',
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
        return res.status(404).json({ mensaje: "Usuario no existente" });
    }

    const contrasenaValida = await bcrypt.compare(password, usuario.contrasena_hash);

    if (!contrasenaValida) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas." });
    }

    const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });

    res.json({
        mensaje: 'Login Exitoso, continua :)',
        token: token
    });
};

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, currentPassword, newPassword } = req.body;

    try {
        const usuario = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) }
        });

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

       
        if (newPassword) {
            const contrasenaValida = await bcrypt.compare(currentPassword, usuario.contrasena_hash);
            if (!contrasenaValida) {
                return res.status(401).json({ mensaje: "Contraseña actual incorrecta" });
            }
        }

        
        const datosActualizacion = {
            nombre,
            email
        };

        
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            datosActualizacion.contrasena_hash = await bcrypt.hash(newPassword, salt);
        }

        const usuarioActualizado = await prisma.usuarios.update({
            where: { id: parseInt(id) },
            data: datosActualizacion
        });

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: {
                id: usuarioActualizado.id,
                nombre: usuarioActualizado.nombre,
                email: usuarioActualizado.email,
                rol: usuarioActualizado.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar usuario", error: error.message });
    }
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
    actualizarUsuario
};