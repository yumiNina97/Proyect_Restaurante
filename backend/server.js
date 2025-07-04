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


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});