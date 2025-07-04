require('dotenv').config();


const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const blogRoutes = require('./routes/blogRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/blog', blogRoutes); 
app.use('/api/reservas', reservaRoutes);
app.use('/api', require('./routes/auth'))

const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta-temporal';

router.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    
    const filePath = path.join(__dirname, '../../frontend/data/users.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    
    const usuario = data.users.find(
      (u) => u.email === email && u.contrasena_hash === contrasena
    );

    if (!usuario) {
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});