import { servicioAuth } from '../services/auth-service.js';

const accountPageTemplate = document.createElement('template');
accountPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/account-info/account-info.css">

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
            <h1 class="layout-split__title">MY ACCOUNT</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="account-info">
                <h2 class="account-info__title">ACCOUNT INFORMATION</h2>

                <div class="account-info__item">
                    <span class="account-info__label">Name</span>
                    <span class="account-info__value" id="account-name"></span>
                </div>
                <div class="account-info__item">
                    <span class="account-info__label">Email</span>
                    <span class="account-info__value" id="account-email"></span>
                </div>
                <div class="account-info__item">
                    <span class="account-info__label">Role</span>
                    <span class="account-info__value" id="account-role"></span>
                </div>
                
                <button class="account-info__logout-btn" id="logout-button">LOGOUT</button>
            </div>
        </aside>
    </div>
`;


class AccountPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(accountPageTemplate.content.cloneNode(true));

        this.nombreElemento = this.shadowRoot.querySelector('#account-name');
        this.emailElemento = this.shadowRoot.querySelector('#account-email');
        this.rolElemento = this.shadowRoot.querySelector('#account-role');
        this.botonLogout = this.shadowRoot.querySelector('#logout-button');
    }

    connectedCallback() {
        this.mostrarDatosUsuario();
        this.botonLogout.addEventListener('click', () => this.manejarLogout());
    }

    mostrarDatosUsuario() {
        const usuario = servicioAuth.obtenerDatosUsuario();

        if (!usuario) {
            window.location.hash = '#/login';
            return;
        }

        this.nombreElemento.textContent = usuario.nombre;
        this.emailElemento.textContent = usuario.email;
        this.rolElemento.textContent = usuario.rol;
    }

    manejarLogout() {
        servicioAuth.cerrarSesion();
        window.location.hash = '#/';
    }
}

customElements.define('account-page', AccountPage);