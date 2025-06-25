const contactPageTemplate = document.createElement('template');
contactPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/page-layout-contact/page-layout-contact.css">
    <link rel="stylesheet" href="blocks/opening-hours/opening-hours.css">
    <link rel="stylesheet" href="blocks/contact-gallery/contact-gallery.css">
    <link rel="stylesheet" href="blocks/contact-map/contact-map.css">
    <link rel="stylesheet" href="blocks/contact-details/contact-details.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    
    <div class="page-layout page-layout--contact">
    <main class="page-layout__main-content">
        <site-header></site-header>
        <h1 class="page-layout__title">CONTACT</h1>
    </main>

    <aside class="page-layout__sidebar">
        <div class="opening-hours">
            <h2 class="opening-hours__title">OPENING HOURS</h2>
            <ul class="opening-hours__list">
                <li class="opening-hours__item"><span>Monday</span><span>16:00 - 22:30</span></li>
                <li class="opening-hours__item"><span>Tuesday</span><span>16:00 - 22:30</span></li>
                <li class="opening-hours__item"><span>Wednesday</span><span>16:00 - 22:30</span></li>
                <li class="opening-hours__item"><span>Thursday</span><span>16:00 - 22:30</span></li>
                <li class="opening-hours__item"><span>Friday</span><span>16:00 - 22:30</span></li>
                <li class="opening-hours__item"><span>Saturday & Sunday</span><span>16:00 - 22:30</span></li>
            </ul>
        </div>
        
        <div class="contact-gallery">
            <a href="#" class="contact-gallery__link">
            <img src="assets/images/contact-gallery.png" class="contact-gallery__image">
        </a>
        </div>

        <div class="contact-map">
            <img src="assets/images/contact-map.png" class="contact-map__image">
            <a href="#" class="contact-map__route-link">SHOW ROUTE →</a>
        </div>

        <div class="contact-details">
            <h2 class="contact-details__title">GET IN TOUCH</h2>
            <div class="contact-details__item">
                <span class="contact-details__label">ADDRESS</span>
                <span class="contact-details__value">23 Greenfield Avenue,<br> Prague 120 00</span>
            </div>
            <div class="contact-details__item">
                <span class="contact-details__label">PHONE</span>
                <span class="contact-details__value">+42 1234 567890</span>
            </div>
            <div class="contact-details__item">
                <span class="contact-details__label">EMAIL</span>
                <span class="contact-details__value">email@example.com</span>
            </div>
            <div class="contact-details__item">
                <span class="contact-details__label">FOLLOW</span>
                <div class="contact-details__social-icons">
                    <a href="#" class="social-links__link" aria-label="Facebook"><img src="assets/icons/facebook-icon.svg"></a>
                    <a href="#" class="social-links__link" aria-label="Instagram"><img src="assets/icons/instagram-icon.svg"></a>
                    <a href="#" class="social-links__link" aria-label="Twitter"><img src="assets/icons/twitter-icon.svg"></a>
                </div>
            </div>
        </div>
    </aside>
</div>
`;

class ContactPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(contactPageTemplate.content.cloneNode(true));
    }
}
customElements.define('contact-page', ContactPage);