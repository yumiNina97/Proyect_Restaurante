const prisma = require('../db');

class CrearPublicacionCommand {
    constructor(datosPublicacion) {
        this.datosPublicacion = datosPublicacion;
    }

    async ejecutar() {
        const { titulo, contenido, imagenUrl, autorId } = this.datosPublicacion;

        const nuevaPublicacion = await prisma.publicacionesblog.create({
            data: {
                titulo: titulo,
                contenido: contenido,
                imagen_url: imagenUrl,
                autor_id: autorId,
            }
        });

        return nuevaPublicacion;
    }
}

module.exports = CrearPublicacionCommand;