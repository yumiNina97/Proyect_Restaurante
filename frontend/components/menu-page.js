const menuPageTemplate = document.createElement('template');
menuPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/menu-filter/menu-filter.css">
    <link rel="stylesheet" href="blocks/menu-category/menu-category.css">
    <link rel="stylesheet" href="blocks/menu-item/menu-item.css">
    
    <style>
        .main-hero__image {
            width: 100%;
            height: 100vh;
            object-fit: cover;
            display: block;
        }
        .layout-split__sidebar {
            padding: 40px;
        }
        #menu-list-container {
            margin-top: 40px;
        }
        #product-details-container {
            color: #a0a0a0;
            padding: 40px;
        }
        #product-details-container h3 {
            color: white;
            font-size: 2rem;
            font-family: 'Times New Roman', serif;
            margin: 0 0 15px 0;
        }
        #product-details-container p {
            margin: 0;
            line-height: 1.7;
            font-size: 1rem;
        }
        .layout-split__title img {
            height: 4rem;
            vertical-align: middle;
            margin-left: 15px;
        }
        .main-hero__add-btn {
            position: absolute;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: black;
            color: white;
            border: 1px solid #888;
            border-radius: 50%;
            font-size: 2rem;
            cursor: pointer;
            z-index: 5;
            opacity: 0;
            transform: scale(0.8);
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .main-hero__add-btn--visible {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
        }
        .main-hero__add-btn:hover {
            background-color:rgb(134, 134, 134);
            border-color:rgb(167, 167, 167);
        }
        .menu-item {
            position: relative;
        }
        .menu-item__image-wrapper {
            position: relative;
            width: 80px;
            height: 50px;
        }
        .menu-item__add-btn {
            position: absolute;
            bottom: 5px;
            left: 5px;
            width: 24px;
            height: 24px;
            background-color: rgba(0,0,0,0.6);
            color: white;
            border: 1px solid #888;
            border-radius: 50%;
            font-size: 1rem;
            line-height: 22px;
            text-align: center;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .menu-item__add-btn:hover {
            background-color:rgb(132, 132, 132);
            border-color:rgb(147, 147, 147);
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <div style="position: relative; width: 100%; height: 100%;">
                <img src="./assets/images/menu.png" class="main-hero__image" id="main-product-image">
                <site-header></site-header>
                <h1 class="layout-split__title" id="main-hero-title">MENU</h1>
                <button class="main-hero__add-btn">+</button>
            </div>
             <div id="product-details-container">
            </div>
        </main>
        <aside class="layout-split__sidebar">
            <div class="menu-filters">
                <button class="menu-filters__button" data-category="ALL">ALL</button>
                <button class="menu-filters__button menu-filters__button--active" data-category="MAKI">MAKI</button>
                <button class="menu-filters__button" data-category="URAMAKI">URAMAKI</button>
                <button class="menu-filters__button" data-category="SPECIAL ROLLS">SPECIAL ROLLS</button>
            </div>
            <div id="menu-list-container"></div>
        </aside>
    </div>
`;


class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(menuPageTemplate.content.cloneNode(true));
        this.mainImage = this.shadowRoot.querySelector('#main-product-image');
        this.mainTitle = this.shadowRoot.querySelector('#main-hero-title');
        this.detailsContainer = this.shadowRoot.querySelector('#product-details-container');
        this.menuContainer = this.shadowRoot.querySelector('#menu-list-container');
        this.mainAddBtn = this.shadowRoot.querySelector('.main-hero__add-btn');
        this.filtersContainer = this.shadowRoot.querySelector('.menu-filters');
        this.allCategories = [];
    }

    connectedCallback() {
        this.loadMenuData();
        this.menuContainer.addEventListener('click', (e) => {
            const addButton = e.target.closest('.menu-item__add-btn');
            const menuItem = e.target.closest('.menu-item');

            if (addButton) {
                console.log('Añadir al carrito:', menuItem.dataset.title);
            } else if (menuItem) {
                this.updateMainView(menuItem);
            }
        });

        this.filtersContainer.addEventListener('click', (e) => {
            const filterButton = e.target.closest('.menu-filters__button');
            if (filterButton) {
                const category = filterButton.dataset.category;
                this.ActivacionFiltro(filterButton);
                this.renderMenu(category);
            }
        });
    }

    async loadMenuData() {
        const response = await fetch('./data/menu.json');
        const menuData = await response.json();
        this.allCategories = menuData.categorias;
        this.renderMenu('MAKI'); 
    }

    renderMenu(filterCategory) {
        this.menuContainer.innerHTML = ''; 

        let categoriesToRender;

        if (filterCategory === 'ALL') {
            categoriesToRender = this.allCategories;
        } else {

            categoriesToRender = this.allCategories.filter(cat => cat.nombre === filterCategory);
        }

        categoriesToRender.forEach(categoria => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'menu-category';
            categoryElement.innerHTML = `<h2 class="menu-category__title">${categoria.nombre}</h2>`;

            categoria.items.forEach(item => {
                const itemWrapper = document.createElement('div');
                itemWrapper.innerHTML = this.createMenuItemHTML(item);
                categoryElement.appendChild(itemWrapper.firstElementChild);
            });
            this.menuContainer.appendChild(categoryElement);
        });
    }

    ActivacionFiltro(clickedButton) {
        this.shadowRoot.querySelectorAll('.menu-filters__button').forEach(button => {
            button.classList.remove('menu-filters__button--active');
        });
        clickedButton.classList.add('menu-filters__button--active');
    }

    updateMainView(clickedItem) {
        const newImage = clickedItem.dataset.image;
        const newTitle = clickedItem.dataset.title;
        const newDescription = clickedItem.dataset.description;
        const newIcon = clickedItem.dataset.icon;

        this.mainImage.src = newImage;
        this.mainImage.alt = newTitle;
        
        let titleIconHTML = '';
        if (newIcon) {
            titleIconHTML = `<img src="${newIcon}">`;
        }
        this.mainTitle.innerHTML = `${newTitle} ${titleIconHTML}`;
        
        let descriptionText = '<p>Descubre el sabor único de nuestro platillo.</p>';
        if (newDescription) {
            descriptionText = `<p>${newDescription}</p>`;
        }
        this.detailsContainer.innerHTML = descriptionText;
        
        this.mainAddBtn.classList.add('main-hero__add-btn--visible');
    }

    createMenuItemHTML(item) {
        let iconHTML = '';
        if (item.icono) {
            iconHTML = `<img src="${item.icono}" class="menu-item__icon">`;
        }

        let descriptionHTML = '';
        if (item.descripcion) {
            descriptionHTML = `<p class="menu-item__description">${item.descripcion}</p>`;
        }

        let descriptionData = '';
        if (item.descripcion) {
            descriptionData = item.descripcion;
        }

        return `
            <div 
                class="menu-item" 
                data-title="${item.nombre}"
                data-description="${descriptionData}"
                data-image="${item.imagen}"
                data-icon="${item.icono || ''}"
                role="button" 
                tabindex="0"
            >
                <div class="menu-item__image-wrapper">
                    <img src="${item.imagen}" class="menu-item__image">
                    <button class="menu-item__add-btn">+</button>
                </div>
                <div class="menu-item__details">
                    <h3 class="menu-item__name">${item.nombre} ${iconHTML}</h3>
                    ${descriptionHTML}
                </div>
                <span class="menu-item__price">$${item.precio}</span>
            </div>
        `;
    }
}
customElements.define('menu-page', MenuPage);