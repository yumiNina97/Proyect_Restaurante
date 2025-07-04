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
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (!response.ok) {
                return { exito: false, mensaje: data.error || 'Error al iniciar sesión' };
            }

            if (data.token) {
                this.token = data.token;
                localStorage.setItem('token', data.token);
                this.notificar();
                return { exito: true };
            } else {
                return { exito: false, mensaje: 'No se recibió el token de autenticación' };
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return { exito: false, mensaje: 'Error de conexión con el servidor' };
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
            const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(datos)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.mensaje || 'Error al actualizar usuario');
            }

            const usuarioActualizado = await response.json();
            
            const nuevoToken = btoa(JSON.stringify({
                id: usuarioActualizado.id,
                nombre: usuarioActualizado.nombre,
                email: usuarioActualizado.email,
                rol: usuarioActualizado.rol,
                exp: Date.now() + 3600000 // 1 hora
            }));
            
            this.token = nuevoToken;
            localStorage.setItem('token', nuevoToken);
            this.notificar();
            
            return usuarioActualizado;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error(error.message || 'Error al actualizar usuario');
        }
    }
}
//Singleton
export const servicioAuth = new ServicioAuth();