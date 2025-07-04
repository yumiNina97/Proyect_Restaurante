const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('Seed init');

    // Limpiar datos existentes
    await prisma.likesblog.deleteMany();
    await prisma.publicacionesblog.deleteMany();
    await prisma.productos.deleteMany();
    await prisma.categorias.deleteMany();
    await prisma.usuarios.deleteMany();

    // Crear usuario de prueba
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash('123456', salt);

    const usuarioPrueba = await prisma.usuarios.create({
        data: {
            nombre: 'Usuario Prueba',
            email: 'test@example.com',
            contrasena_hash: contrasenaHash,
            rol: 'usuario'
        }
    });

    console.log('✔ Usuario de prueba creado:', usuarioPrueba.email);

    
    const categorias = [
        { nombre: 'MAKI', descripcion: 'Rollos tradicionales de sushi' },
        { nombre: 'URAMAKI', descripcion: 'Rollos invertidos de sushi' },
        { nombre: 'SPECIAL ROLLS', descripcion: 'Rollos especiales de la casa' }
    ];

    for (const categoria of categorias) {
        const existente = await prisma.categorias.findUnique({
            where: { nombre: categoria.nombre }
        });

        if (!existente) {
            await prisma.categorias.create({ data: categoria });
        }
    }

    
    const makiCat = await prisma.categorias.findUnique({ where: { nombre: 'MAKI' } });
    const uramakiCat = await prisma.categorias.findUnique({ where: { nombre: 'URAMAKI' } });
    const specialCat = await prisma.categorias.findUnique({ where: { nombre: 'SPECIAL ROLLS' } });

    const productos = [
        {
            nombre: 'SPICY TUNA MAKI',
            descripcion_detallada: 'A tantalizing blend of spicy tuna, cucumber, and avocado, harmoniously rolled in nori and seasoned rice.',
            precio: 9.00,
            imagen_url: 'assets/images/menu/menu-spicy-tuna.png',
            categoria_id: makiCat.id
        },
        {
            nombre: 'VOLCANO DELIGHT',
            descripcion_detallada: 'Creamy crab salad, avocado, and cucumber rolled inside, topped with spicy tuna and drizzled with fiery sriracha sauce.',
            precio: 12.00,
            imagen_url: 'assets/images/menu/menu-volcano-delight.png',
            categoria_id: uramakiCat.id
        },
        {
            nombre: 'SUNRISE BLISS',
            descripcion_detallada: 'A delicate combination of fresh salmon, cream cheese, and asparagus, rolled in orange-hued tobiko for a burst of sunrise-inspired flavors.',
            precio: 16.00,
            imagen_url: 'assets/images/menu/menu-sunrise-bliss.png',
            categoria_id: specialCat.id
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
