import { servicioAuth } from '../services/auth-service.js';

const accountPageTemplate = document.createElement('template');
accountPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/account-info/account-info.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-reservation.png');
        }
        .layout-split__sidebar {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
        }
        .account-info__form {
            display: none;
        }
        .account-info__form.active {
            display: block;
        }
        .account-info__display.hidden {
            display: none;
        }
        .account-info__edit-btn {
            background-color: #EFE7D2;
            color: black;
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            margin-top: 20px;
            cursor: pointer;
            width: 100%;
        }
        .account-info__edit-btn:hover {
            background-color: #864a4a;
            color: white;
        }
        .account-info__input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #333;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.9);
        }
        .account-info__buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .account-info__save-btn,
        .account-info__cancel-btn {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        .account-info__save-btn {
            background-color: #4a8686;
            color: white;
        }
        .account-info__cancel-btn {
            background-color: #864a4a;
            color: white;
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

                <div class="account-info__display">
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
                    
                    <button class="account-info__edit-btn" id="edit-button">EDIT INFORMATION</button>
                    <button class="account-info__logout-btn" id="logout-button">LOGOUT</button>
                </div>

                <form class="account-info__form">
                    <div class="account-info__item">
                        <span class="account-info__label">Name</span>
                        <input type="text" class="account-info__input" id="edit-name" required>
                    </div>
                    <div class="account-info__item">
                        <span class="account-info__label">Email</span>
                        <input type="email" class="account-info__input" id="edit-email" required>
                    </div>
                    <div class="account-info__item">
                        <span class="account-info__label">Current Password</span>
                        <input type="password" class="account-info__input" id="current-password">
                    </div>
                    <div class="account-info__item">
                        <span class="account-info__label">New Password</span>
                        <input type="password" class="account-info__input" id="new-password">
                    </div>
                    <div class="account-info__buttons">
                        <button type="submit" class="account-info__save-btn">Save Changes</button>
                        <button type="button" class="account-info__cancel-btn">Cancel</button>
                    </div>
                </form>
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
        
        
        this.formularioEdicion = this.shadowRoot.querySelector('.account-info__form');
        this.displayInfo = this.shadowRoot.querySelector('.account-info__display');
        this.botonEditar = this.shadowRoot.querySelector('#edit-button');
        this.botonCancelar = this.shadowRoot.querySelector('.account-info__cancel-btn');
        this.inputNombre = this.shadowRoot.querySelector('#edit-name');
        this.inputEmail = this.shadowRoot.querySelector('#edit-email');
        this.inputPasswordActual = this.shadowRoot.querySelector('#current-password');
        this.inputPasswordNueva = this.shadowRoot.querySelector('#new-password');
    }

    connectedCallback() {
        this.mostrarDatosUsuario();
        this.botonLogout.addEventListener('click', () => this.manejarLogout());
        this.botonEditar.addEventListener('click', () => this.mostrarFormularioEdicion());
        this.botonCancelar.addEventListener('click', () => this.ocultarFormularioEdicion());
        this.formularioEdicion.addEventListener('submit', (e) => this.manejarActualizacion(e));
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

        
        this.inputNombre.value = usuario.nombre;
        this.inputEmail.value = usuario.email;
    }

    mostrarFormularioEdicion() {
        this.formularioEdicion.classList.add('active');
        this.displayInfo.classList.add('hidden');
    }

    ocultarFormularioEdicion() {
        this.formularioEdicion.classList.remove('active');
        this.displayInfo.classList.remove('hidden');
        this.formularioEdicion.reset();
        this.mostrarDatosUsuario(); 
    }

    async manejarActualizacion(evento) {
        evento.preventDefault();
        const usuario = servicioAuth.obtenerDatosUsuario();

        try {
            const datos = {
                nombre: this.inputNombre.value,
                email: this.inputEmail.value
            };

            if (this.inputPasswordNueva.value) {
                datos.currentPassword = this.inputPasswordActual.value;
                datos.newPassword = this.inputPasswordNueva.value;
            }

            const resultado = await servicioAuth.actualizarUsuario(usuario.id, datos);
            alert(resultado.mensaje);
            this.ocultarFormularioEdicion();
            this.mostrarDatosUsuario();
        } catch (error) {
            alert(error.message);
        }
    }

    manejarLogout() {
        servicioAuth.cerrarSesion();
        window.location.hash = '#/';
    }
}

customElements.define('account-page', AccountPage);