const prisma = require('../db');

const crearReserva = async (req, res) => {
    const { name, phone, email, guests, date, time } = req.body;
    
    const usuarioId = req.usuario ? req.usuario.id : null;

    const fechaParaDb = new Date(date);
    const horaParaDb = new Date(`1970-01-01T${time}:00`);

    const nuevaReserva = await prisma.reservas.create({
        data: {
            usuario_id: usuarioId,
            nombre_cliente: name,
            contacto_cliente: `${email} / ${phone}`,
            fecha: fechaParaDb,
            hora: horaParaDb,

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