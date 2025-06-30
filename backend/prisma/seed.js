//Este archivo es un script de prisma para extraer datos de un json e insertarlos en una DB
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('Seed init');
    
    const blogDataPath = path.join(__dirname, '../data/blog.json');
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

    const autorIdExistente = 1; 

    for (const post of blogData) {
        await prisma.publicacionesblog.create({
            data: {
                titulo: post.titulo,
                contenido: post.contenido_completo,
                imagen_url: post.imagen_url,
                autor_id: autorIdExistente, 
            },
        });
        console.log(`${post.titulo}`);
    }
    
    console.log('Hecho');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });