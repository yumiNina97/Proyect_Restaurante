const prisma = require('../db');

const obtenerProductos = async (req, res) => {
    const productos = await prisma.productos.findMany({
        include: {
            categorias: true,
        },
        orderBy: {
            id: 'asc'
        }
    });

    const productosAgrupados = productos.reduce((acc, producto) => {

        const categoriaNombre = producto.categorias.nombre;
        if (!acc[categoriaNombre]) {
            acc[categoriaNombre] = {
                nombre: categoriaNombre,
                items: [],
            };
        }
        acc[categoriaNombre].items.push(producto);
        return acc;
    }, {});

    const resultadoFinal = Object.values(productosAgrupados);

    res.json(resultadoFinal);
};

module.exports = {
    obtenerProductos,
};