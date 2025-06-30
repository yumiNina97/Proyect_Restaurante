const loginPageTemplate = document.createElement('template');
loginPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/login-form/login-form.css">
    <style>
        .layout-split__main { background-image: url('./assets/images/Main-reservation.png'); }
        .layout-split__sidebar { 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        padding: 40px; }
    </style>
    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">LOGIN</h1>
        </main>
        <aside class="layout-split__sidebar">
            <form class="login-form">
                <h2 class="login-form__title">LOGIN</h2>
                <input type="email" name="email" placeholder="Email" class="login-form__input" required>
                <input type="password" name="password" placeholder="Password" class="login-form__input" required>
                <button type="submit" class="login-form__submit-btn">LOGIN</button>
                <a href="#/register" class="login-form__alt-link" data-link>Go to registration instead</a>
            </form>
        </aside>    
    </div>
`;

class LoginPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(loginPageTemplate.content.cloneNode(true));
        
        this.formularioLogin = this.shadowRoot.querySelector('.login-form');
    }

    connectedCallback() {
        this.formularioLogin.addEventListener('submit', evento => {
            this.manejarLogin(evento);
        });
    }

    async manejarLogin(evento) {
        evento.preventDefault();
        const formData = new FormData(this.formularioLogin);
        const datos = Object.fromEntries(formData.entries());

        const respuesta = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(resultado.mensaje);
            localStorage.setItem('token', resultado.token);
            window.location.hash = '#/';
        } else {
            alert(`Error: ${resultado.mensaje}`);
        }
    }
}

customElements.define('login-page', LoginPage);