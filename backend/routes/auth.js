const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta-temporal';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrecta' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.contrasena_hash);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Error al leer el archivo JSON:', err);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
