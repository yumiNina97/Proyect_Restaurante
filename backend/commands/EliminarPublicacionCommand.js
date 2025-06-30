const prisma = require('../db');

class EliminarPublicacionCommand {
    constructor(idPublicacion, idUsuario) {
        this.idPublicacion = idPublicacion;
        this.idUsuario = idUsuario;
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

        await prisma.publicacionesblog.delete({
            where: { id: this.idPublicacion },
        });

        return { mensaje: 'Publicación eliminada con éxito' };
    }
}

module.exports = EliminarPublicacionCommand;