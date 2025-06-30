import BaseHTMLElement from '../base/BaseHTMLElement.js';
import router from '../../services/router.js';
import { register, login } from '../../api.js';

class Registration extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.loadHTML('blocks/registration/registration.template.html');
        this.setupEventListeners();
    }

    setupEventListeners() {
        const registerButton = this.shadowRoot.querySelector('.register__submit');
        if (registerButton) {
            registerButton.addEventListener('click', (event) => this.handleRegister(event));
        }

        const registerLink = this.shadowRoot.querySelector('.register a');
        if (registerLink) {
            registerLink.addEventListener('click', (event) => this.handleNavigation(event));
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        const errorEl = this.shadowRoot.querySelector('.register__error');
        if (errorEl) errorEl.textContent = '';

        const nameInput = this.shadowRoot.querySelector('input[name="name"]');
        const emailInput = this.shadowRoot.querySelector('input[name="email"]');
        const passInput = this.shadowRoot.querySelector('input[name="password"]');
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passInput ? passInput.value : '';

        try {
            await register({ name, email, password });

            const { token, user } = await login({ email, password });

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            this.showPopup('Usuario registrado con éxito', true);
            setTimeout(() => router.nav('/'), 1000);
        } catch (err) {
            console.error('Registration error:', err);
            this.showPopup(err.message || 'Error al registrar', false);
            if (errorEl) errorEl.textContent = err.message;
        }
    }

    handleNavigation(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        if (href) router.nav(href);
    }

    showPopup(message, success = true) {
        const popup = document.createElement('div');
        popup.textContent = message;
        Object.assign(popup.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: success ? '#4BB543' : '#FF6B6B',
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: '9999',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            opacity: '0',
            transition: 'opacity 0.3s'
        });
        this.shadowRoot.appendChild(popup);
        requestAnimationFrame(() => popup.style.opacity = '1');
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.addEventListener('transitionend', () => popup.remove(), { once: true });
        }, 3000);
    }
}

customElements.define('registration-component', Registration);
export default Registration;
