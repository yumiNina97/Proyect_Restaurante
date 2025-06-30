import BaseHTMLElement from '../base/BaseHTMLElement.js';
import { getCategories, getMenuItems, addToCart } from '../../api.js';

export default class MenuComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.categories = [];
        this.menuItems = [];
        this.selectedCategory = null;
    }

    async connectedCallback() {
        this.loadHTMLContent(`
            <style>
                .menu {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .menu__title {
                    text-align: center;
                    margin-bottom: 2rem;
                    color: #333;
                }

                .menu__categories {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .menu__category-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    background: #f4f4f4;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: all 0.3s;
                }

                .menu__category-btn--active {
                    background: #e74c3c;
                    color: white;
                }

                .menu__grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 2rem;
                }

                .menu__item {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .menu__item-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .menu__item-content {
                    padding: 1rem;
                }

                .menu__item-title {
                    margin: 0;
                    color: #333;
                }

                .menu__item-price {
                    color: #e74c3c;
                    font-weight: bold;
                    margin: 0.5rem 0;
                }

                .menu__item-description {
                    color: #666;
                    margin-bottom: 1rem;
                }

                .menu__item-button {
                    width: 100%;
                    padding: 0.5rem;
                    background: #e74c3c;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .menu__item-button:hover {
                    background: #c0392b;
                }
            </style>
            <div class="menu">
                <h2 class="menu__title">Nuestro Menú</h2>
                <div class="menu__categories"></div>
                <div class="menu__grid"></div>
            </div>
        `);

        await this.loadData();
        this.renderCategories();
        this.renderMenuItems();
        this.addEventListeners();
    }

    async loadData() {
        try {
            this.categories = await getCategories();
            this.menuItems = await getMenuItems();
            if (this.categories.length > 0) {
                this.selectedCategory = this.categories[0].id;
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }

    renderCategories() {
        const container = this.shadowRoot.querySelector('.menu__categories');
        container.innerHTML = this.categories.map(category => `
            <button 
                class="menu__category-btn ${this.selectedCategory === category.id ? 'menu__category-btn--active' : ''}"
                data-category-id="${category.id}"
            >
                ${category.name}
            </button>
        `).join('');
    }

    renderMenuItems() {
        const container = this.shadowRoot.querySelector('.menu__grid');
        const filteredItems = this.selectedCategory
            ? this.menuItems.filter(item => item.category_id === this.selectedCategory)
            : this.menuItems;

        container.innerHTML = filteredItems.map(item => `
            <div class="menu__item">
                <img src="${item.image_url || 'https://via.placeholder.com/300x200'}" alt="${item.name}" class="menu__item-image">
                <div class="menu__item-content">
                    <h3 class="menu__item-title">${item.name}</h3>
                    <p class="menu__item-price">$${item.price.toFixed(2)}</p>
                    <p class="menu__item-description">${item.description}</p>
                    <button class="menu__item-button" data-item-id="${item.id}">Añadir al Carrito</button>
                </div>
            </div>
        `).join('');
    }

    addEventListeners() {
        this.shadowRoot.querySelectorAll('.menu__category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedCategory = parseInt(e.target.dataset.categoryId);
                this.renderCategories();
                this.renderMenuItems();
            });
        });

        this.shadowRoot.querySelectorAll('.menu__item-button').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const itemId = parseInt(e.target.dataset.itemId);
                const item = this.menuItems.find(i => i.id === itemId);
                if (item) {
                    try {
                        await addToCart({ ...item, quantity: 1 });
                        window.dispatchEvent(new CustomEvent('cart-updated'));
                        alert('¡Producto añadido al carrito!');
                    } catch (error) {
                        console.error('Error al añadir al carrito:', error);
                        alert('Error al añadir al carrito');
                    }
                }
            });
        });
    }
}

customElements.define('menu-component', MenuComponent);
