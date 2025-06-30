const frontPageTemplate = document.createElement('template');

frontPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/page-layout/page-layout.css">
    <link rel="stylesheet" href="blocks/main-hero/main-hero.css">
    <link rel="stylesheet" href="blocks/promo-links/promo-links.css">
    <link rel="stylesheet" href="blocks/social-links/social-links.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    
    <div class="page-layout">
        <main class="page-layout__main-content">
            <site-header></site-header>
            
            <section class="main-hero">
                <img class="main-hero__main-image" src="assets/images/plate-deco-1.png">
                <h1 class="main-hero__title">SUSHI<br>SENSATION</h1>
                <div class="social-links">
                    <a href="#" class="social-links__link" aria-label="Instagram"><img src="assets/icons/instagram-icon.svg"></a>
                    <a href="#" class="social-links__link" aria-label="Facebook"><img src="assets/icons/facebook-icon.svg"></a>
                    <a href="#" class="social-links__link" aria-label="Twitter"><img src="assets/icons/twitter-icon.svg"></a>
                </div>
            </section>
        </main>
        <aside class="page-layout__sidebar">
            <div class="promo-links">
                <a href="#/menu" class="promo-links__item"><img src="assets/images/promo-menu.png" class="promo-links__image"><span class="promo-links__text">MENU ➲</span></a>
                <a href="#/booktable" class="promo-links__item"><img src="assets/images/promo-reservation.png"class="promo-links__image"><span class="promo-links__text">RESERVATION ➲</span></a>
                <a href="#/about" class="promo-links__item"><img src="assets/images/promo-restaurant.png"class="promo-links__image"><span class="promo-links__text">OUR RESTAURANT ➲</span></a>
            </div>
        </aside>
    </div>
`;

class FrontPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(frontPageTemplate.content.cloneNode(true));
    }
}
customElements.define('front-page', FrontPage);