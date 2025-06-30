class BaseHTMLElement extends HTMLElement {
    constructor() {
        super();
    }

    async loadHTML(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load HTML from ${path}`);
            }
            const html = await response.text();
            this.setInnerHTML(html);
        } catch (error) {
            console.warn(`Error loading HTML from ${path}, falling back to empty content`);
            this.setInnerHTML('');
        }
    }

    setInnerHTML(html) {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = html;
        } else {
            this.innerHTML = html;
        }
    }

    // Método auxiliar para cargar HTML directamente
    loadHTMLContent(html) {
        this.setInnerHTML(html);
    }
}

export default BaseHTMLElement;