const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('Seed init');

   
    await prisma.likesblog.deleteMany();
    await prisma.publicacionesblog.deleteMany();
    await prisma.productos.deleteMany();
    await prisma.categorias.deleteMany();

    
    const categorias = [
        { nombre: 'Entradas', descripcion: 'Platos para comenzar' },
        { nombre: 'Platos Principales', descripcion: 'Platos principales de la casa' },
        { nombre: 'Postres', descripcion: 'Dulces y postres' }
    ];

    for (const categoria of categorias) {
        const existente = await prisma.categorias.findUnique({
            where: { nombre: categoria.nombre }
        });

        if (!existente) {
            await prisma.categorias.create({ data: categoria });
        }
    }

    
    const entradas = await prisma.categorias.findUnique({ where: { nombre: 'Entradas' } });
    const principales = await prisma.categorias.findUnique({ where: { nombre: 'Platos Principales' } });
    const postres = await prisma.categorias.findUnique({ where: { nombre: 'Postres' } });

   
    const productos = [
        {
            nombre: 'Ensalada César',
            descripcion_detallada: 'Lechuga romana fresca con aderezo César, crutones y queso parmesano',
            precio: 12.99,
            imagen_url: '../assets/images/menu.png',
            categoria_id: entradas.id
        },
        {
            nombre: 'Filete Mignon',
            descripcion_detallada: 'Filete de res premium con salsa de vino tinto',
            precio: 29.99,
            imagen_url: '../assets/images/menu.png',
            categoria_id: principales.id
        },
        {
            nombre: 'Tiramisú',
            descripcion_detallada: 'Postre italiano clásico con café y mascarpone',
            precio: 8.99,
            imagen_url: '../assets/images/menu.png',
            categoria_id: postres.id
        }
    ];

    for (const producto of productos) {
        await prisma.productos.create({ data: producto });
    }

    
    const blogDataPath = path.join(__dirname, '../data/blog.json');
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

    const autorIdExistente = 1; 

    for (const post of blogData) {
        await prisma.publicacionesblog.create({
            data: {
                titulo: post.titulo,
                contenido: post.contenido_completo,
                imagen_url: post.imagen_url || null, 
                autor_id: autorIdExistente
            }
        });
        console.log(`✔ Publicación insertada: ${post.titulo}`);
    }

    console.log('✅ Seed finalizado correctamente');
}

main()
    .catch((e) => {
        console.error('❌ Error al ejecutar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
