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

app.use(cors());
app.use(express.json());

// SOLUCIÓN: Simplificamos las rutas. Ahora el backend no se preocupa por el prefijo /api.
app.use('/usuarios', usuarioRoutes);
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/blog', blogRoutes);
app.use('/reservas', reservaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
