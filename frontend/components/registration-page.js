const registrationPageTemplate = document.createElement('template');
registrationPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/registration-form/registration-form.css">
    <style>
        .layout-split__main { background-image: url('./assets/images/Main-reservation.png'); }
        .layout-split__sidebar { display: flex; justify-content: center; align-items: center; padding: 40px; }
    </style>
    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">REGISTRATION</h1>
        </main>
        <aside class="layout-split__sidebar">
            <form class="registration-form">
                <h2 class="registration-form__title">REGISTRATION</h2>
                <input type="text" name="nombre" placeholder="Name" class="registration-form__input" required>
                <input type="tel" name="telefono" placeholder="Phone Number" class="registration-form__input">
                <input type="email" name="email" placeholder="Email" class="registration-form__input" required>
                <input type="password" name="password" placeholder="Password" class="registration-form__input" required>
                <input type="password" name="confirm_password" placeholder="Confirm Password" class="registration-form__input" required>
                <input type="text" name="direccion" placeholder="Address" class="registration-form__input">
                <button type="submit" class="registration-form__submit-btn">REGISTER</button>
                <a href="#/login" class="registration-form__alt-link" data-link>Go to login instead</a>
            </form>
        </aside>
    </div>
`;

class RegistrationPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(registrationPageTemplate.content.cloneNode(true));
        
        this.formularioDeRegistro = this.shadowRoot.querySelector('.registration-form');
    }

    connectedCallback() {
        this.formularioDeRegistro.addEventListener('submit', evento => {
            this.manejarRegistro(evento);
        });
    }

    async manejarRegistro(evento) {
        evento.preventDefault();
        const formData = new FormData(this.formularioDeRegistro);
        const datos = Object.fromEntries(formData.entries());

        if (datos.password !== datos.confirm_password) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const respuesta = await fetch('/api/usuarios/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: datos.nombre,
                email: datos.email,
                password: datos.password
            })
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(resultado.mensaje);
        } else {
            alert(`Error: ${resultado.mensaje}`);
        }
    }
}

customElements.define('registration-page', RegistrationPage);