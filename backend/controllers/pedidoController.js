const prisma = require('../db');

const crearPedido = async (req, res) => {
    const usuarioId = req.usuario.id; 
    const { productos, total } = req.body;

    const resultado = await prisma.$transaction(async (tx) => {
        const pedido = await tx.pedidos.create({
            data: {
                usuario_id: usuarioId,
                total: total,
                estado: 'colocado',
            }
        });

        const datosDetallesPedido = productos.map(producto => {
            return {
                pedido_id: pedido.id,
                producto_id: producto.id,
                cantidad: producto.cantidad,
                precio_unitario: producto.precio
            };
        });

        await tx.detallespedido.createMany({
            data: datosDetallesPedido
        });

        return pedido;
    });

    res.status(201).json({
        mensaje: "Pedido creado :)",
        pedido: resultado
    });
};

module.exports = {
    crearPedido,
};