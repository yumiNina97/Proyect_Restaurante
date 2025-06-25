class ServicioAuth {
    constructor() {
        this.token = localStorage.getItem('token') || null;
        this.observadores = [];
    }

    suscribir(observador) {
        this.observadores.push(observador);
    }

    desuscribir(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    notificar() {
        this.observadores.forEach(observador => observador.update(this));
    }

    async iniciarSesion(email, password) {
        const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const resultado = await respuesta.json();
        if (respuesta.ok) {
            this.token = resultado.token;
            localStorage.setItem('token', this.token);
            this.notificar();
            return { exito: true };
        } else {
            return { exito: false, mensaje: resultado.mensaje };
        }
    }

    cerrarSesion() {
        this.token = null;
        localStorage.removeItem('token');
        this.notificar();
    }

    estaLogueado() {
        return this.obtenerDatosUsuario() !== null;
    }

    obtenerToken() {
        return this.token;
    }

    obtenerDatosUsuario() {
        const token = this.obtenerToken();
        if (!token) {
            return null;
        }
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload.exp * 1000 < Date.now()) {
                console.log("Token expirado, cerrando sesión.");
                this.cerrarSesion();
                return null;
            }

            return payload;
        } catch (error) {
            console.error("Token inválido o malformado:", error);
            this.cerrarSesion();
            return null;
        }
    }
}
//Singleton
export const servicioAuth = new ServicioAuth();