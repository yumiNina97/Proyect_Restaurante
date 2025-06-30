import BaseHTMLElement from '../base/BaseHTMLElement.js';

class GalleryComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadHTMLContent(`
            <style>
                :host {
                    display: block;
                    padding-top: 60px;
                }
                
                .gallery {
                    padding: 2rem;
                    text-align: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .gallery__hero {
                    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1200x400');
                    background-size: cover;
                    background-position: center;
                    color: white;
                    padding: 4rem 2rem;
                    margin: -2rem -2rem 2rem -2rem;
                }

                .gallery__title {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .gallery__subtitle {
                    font-size: 1.2rem;
                    margin-bottom: 2rem;
                }

                .gallery__button {
                    display: inline-block;
                    padding: 1rem 2rem;
                    background: #e74c3c;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background 0.3s;
                }

                .gallery__button:hover {
                    background: #c0392b;
                }

                .gallery__grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .gallery__item {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.3s;
                }

                .gallery__item:hover {
                    transform: translateY(-5px);
                }

                .gallery__item-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .gallery__item-content {
                    padding: 1rem;
                }

                .gallery__item-title {
                    font-size: 1.25rem;
                    color: #333;
                    margin-bottom: 0.5rem;
                }

                .gallery__item-description {
                    color: #666;
                }
            </style>

            <div class="gallery">
                <div class="gallery__hero">
                    <h1 class="gallery__title">Bienvenidos a Sushi App</h1>
                    <p class="gallery__subtitle">Descubre nuestra deliciosa selección de sushi</p>
                    <a href="/menu" class="gallery__button" data-link>Ver Menú</a>
                </div>

                <div class="gallery__grid">
                    <div class="gallery__item">
                        <img src="https://via.placeholder.com/300x200" alt="Sushi Rolls" class="gallery__item-image">
                        <div class="gallery__item-content">
                            <h3 class="gallery__item-title">Sushi Rolls</h3>
                            <p class="gallery__item-description">Deliciosos rolls preparados con ingredientes frescos</p>
                        </div>
                    </div>

                    <div class="gallery__item">
                        <img src="https://via.placeholder.com/300x200" alt="Nigiri" class="gallery__item-image">
                        <div class="gallery__item-content">
                            <h3 class="gallery__item-title">Nigiri</h3>
                            <p class="gallery__item-description">Sushi tradicional japonés con pescado fresco</p>
                        </div>
                    </div>

                    <div class="gallery__item">
                        <img src="https://via.placeholder.com/300x200" alt="Tempura" class="gallery__item-image">
                        <div class="gallery__item-content">
                            <h3 class="gallery__item-title">Tempura</h3>
                            <p class="gallery__item-description">Crujientes tempuras de mariscos y verduras</p>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // Agregar event listener para el botón del menú
        this.shadowRoot.querySelector('a[data-link]').addEventListener('click', (e) => {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            window.location.hash = href;
        });
    }
}

customElements.define('gallery-component', GalleryComponent);
