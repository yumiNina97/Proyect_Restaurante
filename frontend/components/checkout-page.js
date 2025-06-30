import { servicioAuth } from '../services/auth-service.js';
import { servicioCarrito } from '../services/carrito-observer-single.js';

const checkoutPageTemplate = document.createElement('template');
checkoutPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/checkout-form/checkout-form.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/Main-reservation.png');
        }
        .layout-split__sidebar {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">CHECKOUT</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="checkout-container">
                <section class="order-summary">
                    <h2 class="order-summary__title">ORDER SUMMARY</h2>
                    <div id="summary-items-container">
                        </div>
                    <div class="order-summary__line order-summary__total">
                        <span>Total</span>
                        <span id="summary-total-price">$0.00</span>
                    </div>
                </section>
                
                <form class="checkout-form">
                    <label for="name" class="checkout-form__label">Full Name</label>
                    <input type="text" id="name" name="name" class="checkout-form__input" required>
                    
                    <label for="phone" class="checkout-form__label">Phone Number</label>
                    <input type="tel" id="phone" name="phone" class="checkout-form__input" required>

                    <label for="address" class="checkout-form__label">Address</label>
                    <input type="text" id="address" name="address" class="checkout-form__input" required>

                    <label for="city" class="checkout-form__label">City</label>
                    <input type="text" id="city" name="city" class="checkout-form__input" required>

                    <button type="submit" class="checkout-form__submit-btn">PLACE ORDER</button>
                </form>
            </div>
        </aside>
    </div>
`;


class CheckoutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(checkoutPageTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        if (!servicioAuth.estaLogueado()) {
            window.location.hash = '#/login';
            return;
        }

        this.formulario = this.shadowRoot.querySelector('.checkout-form');
        this.contenedorResumen = this.shadowRoot.querySelector('#summary-items-container');
        this.precioTotalResumen = this.shadowRoot.querySelector('#summary-total-price');

        this.mostrarResumenPedido();

        this.formulario.addEventListener('submit', evento => {
            this.manejarEnvioPedido(evento);
        });
    }

    mostrarResumenPedido() {
        const productos = servicioCarrito.obtenerProductos();
        const total = servicioCarrito.calcularTotal();

        this.contenedorResumen.innerHTML = '';

        if (productos.length === 0) {
            this.contenedorResumen.innerHTML = `<div class="order-summary__line"><span>Your cart is empty.</span></div>`;
        } else {
            productos.forEach(item => {
                const itemHTML = `
                    <div class="order-summary__line">
                        <span>${item.cantidad} x ${item.nombre}</span>
                        <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>`;
                this.contenedorResumen.innerHTML += itemHTML;
            });
        }
        
        this.precioTotalResumen.textContent = `$${total.toFixed(2)}`;
    }

    async manejarEnvioPedido(evento) {
        evento.preventDefault();
        
        const token = servicioAuth.obtenerToken();
        const productos = servicioCarrito.obtenerProductos();
        const total = servicioCarrito.calcularTotal();

        if (productos.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        const respuesta = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productos: productos,
                total: total
            })
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(resultado.mensaje);
            servicioCarrito.limpiarCarrito();
            window.location.hash = '#/';
        } else {
            alert(`Error al realizar el pedido: ${resultado.mensaje}`);
        }
    }
}

customElements.define('checkout-page', CheckoutPage);