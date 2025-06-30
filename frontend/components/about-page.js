const aboutPageTemplate = document.createElement('template');
aboutPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/about-top-section/about-top-section.css">
    <link rel="stylesheet" href="blocks/about-intro/about-intro.css">
    <link rel="stylesheet" href="blocks/awards-panel/awards-panel.css">
    <link rel="stylesheet" href="blocks/award-card/award-card.css">
    <link rel="stylesheet" href="blocks/story-panel/story-panel.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-about.png');
        }
        .layout-split__sidebar {
            padding-left: 10%;
            padding-right: 10%;
            padding-top: 2%;
            padding-bottom: 0%;
            display: flex;
            flex-direction: column;

        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">ABOUT</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="about-top-section">
                <section class="about-intro">
                    <h2 class="about-intro__title">SUSHI ARTISTRY REDEFINED</h2>
                    <p class="about-intro__text">Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.</p>
                </section>
                <img src="./assets/images/about-image-right.png" class="about-top-section__image">
            </div>

            <section class="awards-panel">
                <div class="award-card">
                    <div class="award-card__stars">★★★★★</div>
                    <h3 class="award-card__title">TRIP ADVISOR</h3>
                    <p class="award-card__subtitle">BEST STEAK HOUSE<br>PRAGUE</p>
                </div>
                <div class="award-card">
                    <div class="award-card__stars">★★★★★</div>
                    <h3 class="award-card__title">MICHELIN GUIDE</h3>
                    <p class="award-card__subtitle">BEST STEAK HOUSE<br>PRAGUE</p>
                </div>
                <div class="award-card">
                    <div class="award-card__stars">★★★★★</div>
                    <h3 class="award-card__title">STAR DINING</h3>
                    <p class="award-card__subtitle">BEST STEAK HOUSE<br>PRAGUE</p>
                </div>
            </section>

            <section class="story-panel">
                <img src="./assets/images/about-image-bottom.png" class="story-panel__image">
                <div class="story-panel__content">
                    <h2 class="story-panel__title">OUR STORY</h2>
                    <p class="story-panel__text">
                        Founded with a passion for culinary excellence, Qitchen's journey began in the heart of Prague. Over years, it evolved into a haven for sushi enthusiasts, celebrated for its artful mastery and devotion to redefining gastronomy.
                    </p>
                </div>
            </section>
        </aside>
    </div>
`;

class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(aboutPageTemplate.content.cloneNode(true));
    }
}
customElements.define('about-page', AboutPage);