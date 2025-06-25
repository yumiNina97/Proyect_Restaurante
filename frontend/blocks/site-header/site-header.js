class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.getElementById('site-header-template');
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);
    }
}

customElements.define('site-header', SiteHeader);