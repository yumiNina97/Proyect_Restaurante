const routes = {
    '/': 'gallery-component',
    '/menu': 'menu-component',
    '/about': 'about-component',
    '/reservation': 'reservation-component',
    '/blog': 'blog-component',
    '/contact': 'contact-component',
    '/cart': 'cart-component',
    '/registration': 'registration-component',
    '/login': 'login-component'
};

export default {
    init() {
        window.addEventListener('DOMContentLoaded', () => this.render());
        window.addEventListener('hashchange', () => this.render());
    },

    nav(path) {
        const normalized = path.startsWith('/') ? `#${path}` : `#/${path}`;
        window.location.hash = normalized;
    },

    render() {
        const raw = window.location.hash.replace(/^#/, '') || '/';
        const mainContent = document.getElementById('main-content');

        let tag;
        if (raw.startsWith('/blog/') && raw.split('/').length === 3) {
            tag = 'blog-detail-component';
        } else {
            tag = routes[raw];
        }

        if (!tag) {
            console.error(`Ruta desconocida: ${raw}`);
            return;
        }

        // Limpiar el contenido anterior
        mainContent.innerHTML = '';

        // Crear y añadir el nuevo componente
        const element = document.createElement(tag);
        mainContent.appendChild(element);
    }
};
