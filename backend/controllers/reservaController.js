const prisma = require('../db');

const crearReserva = async (req, res) => {
    const { name, phone, email, guests, date, time } = req.body;
    const usuarioId = req.usuario ? req.usuario.id : null;
    const fechaReserva = new Date(`${date}T${time}:00`);

    const nuevaReserva = await prisma.reservas.create({
        data: {
            usuario_id: usuarioId,
            nombre_cliente: name,
            contacto_cliente: `${email} / ${phone}`,
            fecha: fechaReserva,
            hora: fechaReserva,
            numero_comensales: parseInt(guests),
            estado: 'solicitada',
        }
    });
    
    res.status(201).json({
        mensaje: 'Solicitud enviada, le enviaremos un email con su confirmacion.',
        reserva: nuevaReserva
    });
};

module.exports = {
    crearReserva,
};