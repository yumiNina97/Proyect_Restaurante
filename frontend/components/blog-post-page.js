const blogPostPageTemplate = document.createElement('template');
blogPostPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/article-content/article-content.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-blogpage.png');
        }
        .layout-split__sidebar {
            padding: 60px 40px;
            overflow-y: auto;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main" id="main-hero-image">
            <site-header></site-header>
            </main>
        <aside class="layout-split__sidebar">
            <div id="article-container">
                <p>Cargando artículo...</p>
            </div>
        </aside>
    </div>
`;


class BlogPostPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(blogPostPageTemplate.content.cloneNode(true));
        this.articleContainer = this.shadowRoot.querySelector('#article-container');
        this.mainHeroImageContainer = this.shadowRoot.querySelector('#main-hero-image');
    }

    connectedCallback() {
        const postId = this.getAttribute('id');
        if (postId) {
            this.cargarArticulo(postId);
        }
    }

    async cargarArticulo(id) {
        const respuesta = await fetch(`/api/blog/${id}`);
        if (!respuesta.ok) {
            this.articleContainer.innerHTML = '<h1>Artículo no encontrado</h1>';
            return;
        }
        const post = await respuesta.json();
        this.renderizarArticulo(post);
    }

    renderizarArticulo(post) {

        const fecha = new Date(post.fecha_creacion);
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

        this.articleContainer.innerHTML = `
            <article class="article-content">
                <p class="article-content__date">${fechaFormateada}</p>
                <h1 class="article-content__main-title">${post.titulo}</h1>
                <div class="article-content__body">
                    ${post.contenido.split('\n').map(p => `<p class="article-content__paragraph">${p}</p>`).join('')}
                </div>
                <p class="article-content__author">Autor: ${post.usuarios.nombre}</p>
            </article>
        `;
    }
}

customElements.define('blog-post-page', BlogPostPage);