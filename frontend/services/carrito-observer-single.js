class Carrito {
    constructor() {
        this.productos = [];
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

    agregarProducto(producto) {
        const indiceProducto = this.productos.findIndex(p => p.nombre === producto.nombre);

        if (indiceProducto > -1) {
            this.productos[indiceProducto].cantidad++;
        } else {
            this.productos.push({ ...producto, cantidad: 1 });
        }
        this.notificar();
    }

    obtenerProductos() {
        return this.productos;
    }

    calcularTotal() {
        return this.productos.reduce((total, p) => total + (p.precio * p.cantidad), 0);
    }
    
    limpiarCarrito() {
        this.productos = [];
        this.notificar();
    }
};
    
//Solo se exporta una instancia del carrito (Singleton)
export const servicioCarrito = new Carrito();