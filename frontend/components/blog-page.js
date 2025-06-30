import { servicioAuth } from '../services/auth-service.js';

const blogPageTemplate = document.createElement('template');
blogPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/blog-listing/blog-listing.css">
    <link rel="stylesheet" href="blocks/blog-post-summary/blog-post-summary.css">
    <link rel="stylesheet" href="blocks/favorite-button/favorite-button.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/Main-blog.png');
        }
        .layout-split__sidebar {
            padding: 60px 40px;
            overflow-y: auto;
        }
        .blog-listing__create-btn {
            display: inline-block;
            background-color: #EFE7D2;
            color: black;
            padding: 8px 16px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: bold;
            margin-top: 15px;
        }
        .post-actions {
            margin-top: 15px;
            display: flex;
            gap: 10px;
        }
        .post-actions button {
            background-color: #333;
            color: white;
            border: 1px solid #555;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .edit-title-input, .edit-excerpt-textarea {
            width: 100%;
            background-color: #1c1c1c;
            border: 1px dashed #555;
            color: white;
            padding: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
            font-family: inherit;
        }
        .edit-excerpt-textarea {
            min-height: 80px;
            resize: vertical;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">BLOG</h1>
        </main>
        <aside class="layout-split__sidebar">
            <div class="blog-listing">
                <header class="blog-listing__header">
                    <h2 class="blog-listing__title">BEHIND THE SCENES<br>& LATEST NEWS</h2>
                    <a href="#/blog/nuevo" class="blog-listing__create-btn" id="create-post-btn" data-link style="display: none;">CREATE POST</a>
                </header>
                <div class="blog-listing__filters">
                    <button class="blog-listing__filter blog-listing__filter--active" data-filter="ALL">ALL NEWS</button>
                    <button class="blog-listing__filter" id="favorites-filter" data-filter="FAVORITES" style="display: none;">FAVORITES</button>
                    <button class="blog-listing__filter" id="my-articles-filter" data-filter="MY_ARTICLES" style="display: none;">MY ARTICLES</button>
                </div>
                <div class="blog-listing__posts" id="posts-container"></div>
            </div>
        </aside>
    </div>
`;


class BlogPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(blogPageTemplate.content.cloneNode(true));
        
        this.postsContainer = this.shadowRoot.querySelector('#posts-container');
        this.filtersContainer = this.shadowRoot.querySelector('.blog-listing__filters');
        this.favoritesFilter = this.shadowRoot.querySelector('#favorites-filter');
        this.myArticlesFilter = this.shadowRoot.querySelector('#my-articles-filter');
        this.createPostBtn = this.shadowRoot.querySelector('#create-post-btn');
        
        this.activeFilter = 'ALL';
    }

    connectedCallback() {
        this.actualizarVisibilidadElementos();
        this.cargarArticulos();
        this.postsContainer.addEventListener('click', (evento) => this.manejarClicEnPost(evento));
        this.filtersContainer.addEventListener('click', (evento) => this.manejarClicEnFiltro(evento));
    }

    actualizarVisibilidadElementos() {
        if (servicioAuth.estaLogueado()) {
            this.favoritesFilter.style.display = 'inline-block';
            this.myArticlesFilter.style.display = 'inline-block';
            this.createPostBtn.style.display = 'inline-block';
        } else {
            this.favoritesFilter.style.display = 'none';
            this.myArticlesFilter.style.display = 'none';
            this.createPostBtn.style.display = 'none';
        }
    }

    manejarClicEnFiltro(evento) {
        const botonFiltro = evento.target.closest('.blog-listing__filter');
        if (!botonFiltro) return;

        this.actualizarBotonFiltroActivo(botonFiltro);
        this.activeFilter = botonFiltro.dataset.filter;

        if (this.activeFilter === 'ALL') {
            this.cargarArticulos();
        } else if (this.activeFilter === 'FAVORITES') {
            this.cargarArticulosFavoritos();
        } else if (this.activeFilter === 'MY_ARTICLES') {
            this.cargarMisArticulos();
        }
    }

    manejarClicEnPost(evento) {
        const postElemento = evento.target.closest('.blog-post-summary');
        if (!postElemento) return;

        const accion = evento.target.dataset.action;
        const id = postElemento.dataset.id;
        
        if (accion) {
            evento.preventDefault();
            evento.stopPropagation();
        }

        if (accion === 'delete') {
            this.eliminarPost(id);
        } else if (accion === 'edit') {
            this.habilitarModoEdicion(postElemento);
        } else if (accion === 'save') {
            this.guardarCambios(postElemento);
        } else if (accion === 'cancel') {
            this.cancelarEdicion(postElemento);
        } else if (evento.target.closest('.favorite-button')) {
            evento.preventDefault();
            this.enviarLike(id, evento.target.closest('.favorite-button'));
        }
    }

    async eliminarPost(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
            return;
        }
        
        const token = servicioAuth.obtenerToken();
        const respuesta = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (respuesta.ok) {
            this.cargarMisArticulos();
        } else {
            const error = await respuesta.json();
            alert(`Error: ${error.mensaje}`);
        }
    }

    habilitarModoEdicion(postElemento) {
        const contenido = postElemento.querySelector('.blog-post-summary__content');
        const tituloActual = contenido.querySelector('h3').textContent;
        const resumenActual = contenido.querySelector('p.blog-post-summary__excerpt').textContent;

        contenido.dataset.originalHtml = contenido.innerHTML;

        contenido.innerHTML = `
            <input type="text" class="edit-title-input" value="${tituloActual}">
            <textarea class="edit-excerpt-textarea">${resumenActual}</textarea>
            <div class="post-actions">
                <button data-action="save">Guardar</button>
                <button data-action="cancel">Cancelar</button>
            </div>
        `;
    }

    async guardarCambios(postElemento) {
        const id = postElemento.dataset.id;
        const contenidoDiv = postElemento.querySelector('.blog-post-summary__content');
        const nuevoTitulo = contenidoDiv.querySelector('.edit-title-input').value;
        const nuevoResumen = contenidoDiv.querySelector('.edit-excerpt-textarea').value;

        const datosActualizados = {
            titulo: nuevoTitulo,
            contenido: nuevoResumen
        };
        
        const token = servicioAuth.obtenerToken();
        const respuesta = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(datosActualizados)
        });

        if (respuesta.ok) {
            this.cargarMisArticulos();
        } else {
            const error = await respuesta.json();
            alert(`Error al actualizar: ${error.mensaje}`);
        }
    }

    cancelarEdicion(postElemento) {
        const contenido = postElemento.querySelector('.blog-post-summary__content');
        contenido.innerHTML = contenido.dataset.originalHtml;
    }

    async fetchConToken(url) {
        const token = servicioAuth.obtenerToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const respuesta = await fetch(url, { headers });
        return await respuesta.json();
    }
    
    async cargarArticulos() {
        const respuesta = await fetch('/api/blog');
        const articulos = await respuesta.json();
        this.renderizarArticulos(articulos);
    }

    async cargarMisArticulos() {
        const articulos = await this.fetchConToken('/api/blog/mis-articulos');
        this.renderizarArticulos(articulos);
    }
    
    async cargarArticulosFavoritos() {
        const articulos = await this.fetchConToken('/api/blog/favoritos');
        this.renderizarArticulos(articulos);
    }

    async enviarLike(postId, boton) {
        const token = servicioAuth.obtenerToken();
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        await fetch(`/api/blog/${postId}/like`, {
            method: 'POST',
            headers: headers,
        });
    }
    
    renderizarArticulos(articulos) {
        this.postsContainer.innerHTML = '';
        articulos.forEach(post => {
            this.postsContainer.innerHTML += this.crearHtmlParaPost(post, this.activeFilter);
        });
    }

    actualizarBotonFiltroActivo(botonClickeado) {
        this.shadowRoot.querySelectorAll('.blog-listing__filter').forEach(button => {
            button.classList.remove('blog-listing__filter--active');
        });
        botonClickeado.classList.add('blog-listing__filter--active');
    }

    crearHtmlParaPost(post, filtroActual) {
        const fecha = new Date(post.fecha_creacion);
        const opcionesFecha = { year: 'numeric', month: 'short', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('en-US', opcionesFecha).toUpperCase().replace(',', "'");
        
        const resumen = post.contenido ? `${post.contenido.substring(0, 100)}...` : 'No hay resumen disponible.';
        const nombreAutor = post.usuarios ? post.usuarios.nombre : 'Autor Desconocido';
        
        let botonesDeAccion = '';
        if (filtroActual === 'MY_ARTICLES') {
            botonesDeAccion = `
                <div class="post-actions">
                    <button data-action="edit">Editar</button>
                    <button data-action="delete">Eliminar</button>
                </div>
            `;
        }
        
        const tag = (filtroActual === 'MY_ARTICLES') ? 'div' : 'a';
        const linkAttributes = (filtroActual !== 'MY_ARTICLES') 
            ? `href="#/blog/${post.id}" data-link` 
            : '';

        return `
            <${tag} class="blog-post-summary" data-id="${post.id}" ${linkAttributes}>
                <div class="blog-post-summary__image-wrapper">
                    <img src="${post.imagen_url}" alt="${post.titulo}" class="blog-post-summary__image">
                    <button class="favorite-button" aria-label="Añadir a favoritos">
                        <img src="./assets/icons/star.svg" class="favorite-button__icon">
                    </button>
                </div>
                <div class="blog-post-summary__content">
                    <p class="blog-post-summary__date">${fechaFormateada}</p>
                    <h3 class="blog-post-summary__title">${post.titulo}</h3>
                    <p class="blog-post-summary__excerpt">${resumen}</p>
                    <p class="blog-post-summary__author">${nombreAutor}</p>
                    ${botonesDeAccion}
                </div>
            </${tag}>
        `;
    }
}
customElements.define('blog-page', BlogPage);
