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
        try {
            const response = await fetch('/frontend/data/users.json');
            const data = await response.json();
            const usuario = data.users.find(u => u.email === email);
            
            if (!usuario) {
                return { exito: false, mensaje: 'Usuario no encontrado' };
            }

            
            if (password === '447@k^rK_[:7') {
                const token = btoa(JSON.stringify({
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol,
                    exp: Date.now() + 3600000 
                }));
                
                this.token = token;
                localStorage.setItem('token', token);
                this.notificar();
                return { exito: true };
            } else {
                return { exito: false, mensaje: 'Contraseña incorrecta' };
            }
        } catch (error) {
            console.error('Error al leer el archivo JSON:', error);
            return { exito: false, mensaje: 'Error al iniciar sesión' };
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
            console.error('Error al decodificar el token:', error);
            return null;
        }
    }

    async actualizarUsuario(id, datos) {
        const token = this.obtenerToken();
        if (!token) {
            throw new Error('No hay sesión activa');
        }

        try {
            const response = await fetch('/frontend/data/users.json');
            const data = await response.json();
            const usuario = data.users.find(u => u.id === id);
            
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            
            Object.assign(usuario, {
                nombre: datos.nombre || usuario.nombre,
                email: datos.email || usuario.email
            });

            
            const nuevoToken = btoa(JSON.stringify({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                exp: Date.now() + 3600000 
            }));
            
            this.token = nuevoToken;
            localStorage.setItem('token', nuevoToken);
            this.notificar();
            
            return usuario;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error('Error al actualizar usuario');
        }
    }
}
//Singleton
export const servicioAuth = new ServicioAuth();