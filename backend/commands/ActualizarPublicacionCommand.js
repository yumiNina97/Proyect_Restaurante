const prisma = require('../db');

class ActualizarPublicacionCommand {
    constructor(idPublicacion, idUsuario, datosActualizados) {
        this.idPublicacion = idPublicacion;
        this.idUsuario = idUsuario;
        this.datosActualizados = datosActualizados;
    }

    async ejecutar() {
        const publicacion = await prisma.publicacionesblog.findUnique({
            where: { id: this.idPublicacion }
        });

        if (!publicacion) {
            throw new Error('PublicacionNoEncontrada');
        }

        if (publicacion.autor_id !== this.idUsuario) {
            throw new Error('NoAutorizado');
        }

        const publicacionActualizada = await prisma.publicacionesblog.update({
            where: { id: this.idPublicacion },
            data: this.datosActualizados,
        });

        return publicacionActualizada;
    }
}

module.exports = ActualizarPublicacionCommand;