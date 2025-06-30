import { servicioCarrito } from '../services/carrito-observer-single.js';

const cartPageTemplate = document.createElement('template');
cartPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/shopping-cart/shopping-cart.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/Menu.png');
        }
        .layout-split__sidebar {
            padding: 40px;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">CART</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="shopping-cart">
                <h2 class="shopping-cart__title">MY CART</h2>
                
                <div class="shopping-cart__items-list" id="cart-items-container">
                    <p class="shopping-cart__empty-message">Your cart is currently empty.</p>
                </div>
                
                <div class="shopping-cart__summary">
                    <span class="shopping-cart__total-label">TOTAL</span>
                    <span class="shopping-cart__total-price" id="cart-total-price">$0</span>
                </div>

                <a href="#/checkout" class="shopping-cart__order-btn" data-link>PLACE ORDER</a>
            </div>
        </aside>
    </div>
`;

class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(cartPageTemplate.content.cloneNode(true));
        
        this.itemsContainer = this.shadowRoot.querySelector('#cart-items-container');
        this.totalPriceElement = this.shadowRoot.querySelector('#cart-total-price');
    }

    connectedCallback() {
        servicioCarrito.suscribir(this);
        this.update(servicioCarrito);
    }
    
    disconnectedCallback() {
        servicioCarrito.desuscribir(this);
    }

    update(carrito) {
        const productos = carrito.obtenerProductos();
        const total = carrito.calcularTotal();

        this.itemsContainer.innerHTML = '';

        if (productos.length === 0) {
            this.itemsContainer.innerHTML = `<p class="shopping-cart__empty-message">Your cart is currently empty.</p>`;
        } else {
            productos.forEach(item => {
                const itemHTML = this.createCartItemHTML(item);
                this.itemsContainer.innerHTML += itemHTML;
            });
        }
        
        this.totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
    
    createCartItemHTML(item) {
        const subtotal = item.precio * item.cantidad;
        let descriptionHTML = '';

        if (item.descripcion_detallada) {
            descriptionHTML = `<p class="cart-item__description">${item.descripcion_detallada}</p>`;
        }

        return `
            <div class="cart-item">
                <img src="${item.imagen_url}" alt="${item.nombre}" class="cart-item__image">
                <div class="cart-item__details">
                    <h3 class="cart-item__name">${item.nombre}</h3>
                    ${descriptionHTML}
                </div>
                <div class="cart-item__pricing">
                    $${parseFloat(item.precio).toFixed(2)} &times; ${item.cantidad} = $${subtotal.toFixed(2)}
                </div>
            </div>
        `;
    }
}

customElements.define('cart-page', CartPage);