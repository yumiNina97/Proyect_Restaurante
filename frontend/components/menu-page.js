import { servicioCarrito } from '../services/carrito-observer-single.js';
const menuPageTemplate = document.createElement('template');
menuPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split-menu/layout-split-menu.css">
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
                <img src="./assets/images/Menu.png" class="main-hero__image" id="main-product-image">
                <site-header></site-header>
                <h1 class="layout-split__title" id="main-hero-title">MENU</h1>
                <button class="main-hero__add-btn">+</button>
            </div>
             <div id="product-details-container">
            </div>
        </main>
        <aside class="layout-split__sidebar">
            <div class="menu-filters">
                <button class="menu-filters__button menu-filters__button--active" data-category="ALL">ALL</button>
                <button class="menu-filters__button" data-category="MAKI">MAKI</button>
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

        this.imagenPrincipal = this.shadowRoot.querySelector('#main-product-image');
        this.tituloPrincipal = this.shadowRoot.querySelector('#main-hero-title');
        this.contenedorDetalles = this.shadowRoot.querySelector('#product-details-container');
        this.contenedorMenu = this.shadowRoot.querySelector('#menu-list-container');
        this.botonAnadirPrincipal = this.shadowRoot.querySelector('.main-hero__add-btn');
        this.contenedorFiltros = this.shadowRoot.querySelector('.menu-filters');

        this.todasLasCategorias = [];
        this.menuCompleto = [];
    }

    connectedCallback() {
        this.cargarDatosDelMenu();
        this.inicializarEventListeners();
    }
    
    inicializarEventListeners() {
        this.contenedorMenu.addEventListener('click', (evento) => {
            const itemMenu = evento.target.closest('.menu-item');
            if (!itemMenu) return;

            if (evento.target.closest('.menu-item__add-btn')) {
                const producto = this.menuCompleto.find(p => p.nombre === itemMenu.dataset.title);
                if (producto) {
                    
                    servicioCarrito.agregarProducto(producto);
                }
            } else {
                this.actualizarVistaPrincipal(itemMenu);
            }
        });

        this.contenedorFiltros.addEventListener('click', (evento) => {
            const botonFiltro = evento.target.closest('.menu-filters__button');
            if (botonFiltro) {
                const categoria = botonFiltro.dataset.category;
                this.actualizarBotonFiltroActivo(botonFiltro);
                this.renderizarMenu(categoria);
            }
        });
    }

    async cargarDatosDelMenu() {
        const respuesta = await fetch('/api/productos');
        const datosMenu = await respuesta.json();
        this.todasLasCategorias = datosMenu;
        this.menuCompleto = this.todasLasCategorias.flatMap(cat => cat.items);
        this.renderizarMenu('ALL');
    }

    renderizarMenu(filtroDeCategoria) {
        this.contenedorMenu.innerHTML = ''; 

        const categoriasARenderizar = filtroDeCategoria === 'ALL'
            ? this.todasLasCategorias
            : this.todasLasCategorias.filter(cat => cat.nombre === filtroDeCategoria);

        categoriasARenderizar.forEach(categoria => {
            const elementoCategoria = document.createElement('div');
            elementoCategoria.className = 'menu-category';
            elementoCategoria.innerHTML = `<h2 class="menu-category__title">${categoria.nombre}</h2>`;

            categoria.items.forEach(item => {
                const envolturaItem = document.createElement('div');
                envolturaItem.innerHTML = this.crearHtmlParaItemDeMenu(item);
                elementoCategoria.appendChild(envolturaItem.firstElementChild);
            });
            this.contenedorMenu.appendChild(elementoCategoria);
        });
    }

    actualizarBotonFiltroActivo(botonClickeado) {
        this.shadowRoot.querySelectorAll('.menu-filters__button').forEach(button => {
            button.classList.remove('menu-filters__button--active');
        });
        botonClickeado.classList.add('menu-filters__button--active');
    }

    actualizarVistaPrincipal(itemClickeado) {
        const nuevaImagen = itemClickeado.dataset.image;
        const nuevoTitulo = itemClickeado.dataset.title;
        const nuevaDescripcion = itemClickeado.dataset.description;
        const nuevoIcono = itemClickeado.dataset.icon;

        this.imagenPrincipal.src = nuevaImagen;
        this.imagenPrincipal.alt = nuevoTitulo;
        
        let htmlIconoTitulo = nuevoIcono ? `<img src="${nuevoIcono}" alt="Icono">` : '';
        this.tituloPrincipal.innerHTML = `${nuevoTitulo} ${htmlIconoTitulo}`;
        
        let textoDescripcion = nuevaDescripcion 
            ? `<p>${nuevaDescripcion}</p>`
            : '<p>Descubre el sabor único de nuestro platillo.</p>';
        this.contenedorDetalles.innerHTML = textoDescripcion;
        
        this.botonAnadirPrincipal.classList.add('main-hero__add-btn--visible');
    }

    crearHtmlParaItemDeMenu(item) {
        const htmlIcono = item.icono ? `<img src="${item.icono}" class="menu-item__icon">` : '';
        const htmlDescripcion = item.descripcion_detallada ? `<p class="menu-item__description">${item.descripcion_detallada}</p>` : '';
        const datosDescripcion = item.descripcion_detallada || '';

        return `
            <div 
                class="menu-item" 
                data-title="${item.nombre}"
                data-description="${datosDescripcion}"
                data-image="${item.imagen_url}"
                data-icon="${item.icono || ''}"
                role="button" 
                tabindex="0"
            >
                <div class="menu-item__image-wrapper">
                    <img src="${item.imagen_url}" alt="${item.nombre}" class="menu-item__image">
                    <button class="menu-item__add-btn">+</button>
                </div>
                <div class="menu-item__details">
                    <h3 class="menu-item__name">${item.nombre} ${htmlIcono}</h3>
                    ${htmlDescripcion}
                </div>
                <span class="menu-item__price">$${item.precio}</span>
            </div>
        `;
    }
}

customElements.define('menu-page', MenuPage);