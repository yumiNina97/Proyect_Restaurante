import { servicioAuth } from '../services/auth-service.js';

const createPostPageTemplate = document.createElement('template');
createPostPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/create-post-form/create-post-form.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/Main-blog.png');
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
            <h1 class="layout-split__title">CREATE POST</h1>
        </main>

        <aside class="layout-split__sidebar">
            <form class="create-post-form">
                <h2 class="create-post-form__title">NEW BLOG POST</h2>
                <div class="create-post-form__group">
                    <label for="titulo" class="create-post-form__label">Title</label>
                    <input type="text" id="titulo" name="titulo" class="create-post-form__input" required>
                </div>
                <div class="create-post-form__group">
                    <label for="imagenUrl" class="create-post-form__label">Image URL</label>
                    <input type="url" id="imagenUrl" name="imagenUrl" class="create-post-form__input" required>
                </div>
                <div class="create-post-form__group">
                    <label for="contenido" class="create-post-form__label">Content</label>
                    <textarea id="contenido" name="contenido" class="create-post-form__textarea" required></textarea>
                </div>
                <button type="submit" class="create-post-form__submit-btn">PUBLISH POST</button>
            </form>
        </aside>
    </div>
`;


class CreatePostPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(createPostPageTemplate.content.cloneNode(true));
        
        this.formulario = this.shadowRoot.querySelector('.create-post-form');
    }

    connectedCallback() {
        if (!servicioAuth.estaLogueado()) {
            window.location.hash = '#/login';
            return;
        }
        
        this.formulario.addEventListener('submit', evento => {
            this.manejarEnvio(evento);
        });
    }

    async manejarEnvio(evento) {
        evento.preventDefault();

        const formData = new FormData(this.formulario);
        const datosPost = {
            titulo: formData.get('titulo'),
            contenido: formData.get('contenido'),
            imagenUrl: formData.get('imagenUrl'),
        };

        const token = servicioAuth.obtenerToken();

        const respuesta = await fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosPost)
        });

        if (respuesta.ok) {
            alert('¡Publicación creada con éxito!');
            window.location.hash = '#/blog';
        } else {
            const error = await respuesta.json();
            alert(`Error al crear la publicación: ${error.mensaje}`);
        }
    }
}

if (!customElements.get('create-post-page')) {
    customElements.define('create-post-page', CreatePostPage);
}