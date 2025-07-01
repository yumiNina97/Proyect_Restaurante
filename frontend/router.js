import './components/front-page.js';
import './components/contact-page.js';
import './components/menu-page.js';
import './components/about-page.js';
import './components/reservation-page.js';
import './components/cart-page.js';
import './components/login-page.js';
import './components/registration-page.js';
import './components/checkout-page.js';
import './components/blog-page.js';
import './components/blog-post-page.js';
import './components/account-page.js';
import './components/create-post-page.js';

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([0-9a-zA-Z\-]+)") + "$");

const getParams = match => {
    if (!match.result) return {};
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

const navigateTo = url => { window.location.hash = url; };

const router = async () => {
    const routes = [
        { path: "/", view: () => document.createElement('front-page') },
        { path: "/contact", view: () => document.createElement('contact-page') },
        { path: "/menu", view: () => document.createElement('menu-page') },
        { path: "/about", view: () => document.createElement('about-page')},
        { path: "/booktable", view: () => document.createElement('reservation-page') },
        { path: "/cart", view: () => document.createElement('cart-page') }, 
        { path: "/login", view: () => document.createElement('login-page') },
        { path: "/register", view: () => document.createElement('registration-page') },
        { path: "/checkout", view: () => document.createElement('checkout-page') },
        
        
        { path: "/blog/nuevo", view: () => document.createElement('create-post-page') },
        { path: "/blog", view: () => document.createElement('blog-page') },
        { path: "/blog/:id", view: (params) => document.createElement('blog-post-page') },

        { path: "/account", view: () => document.createElement('account-page') },
    ];

    const potentialMatches = routes.map(route => ({
        route: route,
        result: location.hash.slice(1).match(pathToRegex(route.path))
    }));

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = { route: routes[0], result: [location.hash.slice(1)] };
        window.location.hash = "";
    }
    
    const params = getParams(match);
    const view = match.route.view(params);

    Object.keys(params).forEach(key => {
        view.setAttribute(key, params[key]);
    });

    const app = document.querySelector("#app-root");
    app.innerHTML = "";
    app.appendChild(view);
};

window.addEventListener("popstate", router);
window.addEventListener("load", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        const targetLink = e.target.closest("[data-link]");
        if (targetLink) {
            e.preventDefault();
            navigateTo(targetLink.getAttribute("href"));
        }
    });
});