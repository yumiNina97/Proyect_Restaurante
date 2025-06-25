const blogPageTemplate = document.createElement('template');
blogPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/blog-listing/blog-listing.css">
    <link rel="stylesheet" href="blocks/blog-post-summary/blog-post-summary.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-blog.webp');
        }
        .layout-split__sidebar {
            padding: 60px 40px;
            overflow-y: auto;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">BLOG</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="blog-listing">
                <header class="blog-listing__header">
                    <h2 class="blog-listing__title">BEHIND THE SCENES<br>& LATEST NEWS</h2>
                    
                </header>

                <div class="blog-listing__filters">
                    <button class="blog-listing__filter blog-listing__filter--active">ALL NEWS</button>
                    <button class="blog-listing__filter">FAVORITES</button>
                    <button class="blog-listing__filter">MY ARTICLES</button>
                </div>

                <div class="blog-listing__posts">
                    <a href="#/blogpage" class="blog-post-summary" data-link>
                        <img src="./assets/images/blog-post1.webp" class="blog-post-summary__image">
                        <div class="blog-post-summary__content">
                            <p class="blog-post-summary__date">24TH AUG 2023</p>
                            <h3 class="blog-post-summary__title">HOW QITCHEN REDEFINES FLAVOR HARMONY IN EVERY BITE</h3>
                            <p class="blog-post-summary__excerpt">Experience an orchestra of tastes as Qitchen's sushi unveils a symphony of perfectly balanced flavors.</p>
                            <p class="blog-post-summary__author">Author Name</p>
                        </div>
                    </a>

                    <a href="#/blogpage" class="blog-post-summary" data-link>
                        <img src="./assets/images/blog-post2.webp" class="blog-post-summary__image">
                        <div class="blog-post-summary__content">
                            <p class="blog-post-summary__date">24TH AUG 2023</p>
                            <h3 class="blog-post-summary__title">UNVEILING THE MASTERY BEHIND OUR CULINARY CRAFTSMANSHIP</h3>
                            <p class="blog-post-summary__excerpt">Explore the meticulous artistry and dedication that create Qitchen's renowned sushi perfection.</p>
                            <p class="blog-post-summary__author">Author Name</p>
                        </div>
                    </a>

                    <a href="#/blogpage" class="blog-post-summary" data-link>
                        <img src="./assets/images/blog-post3.webp" class="blog-post-summary__image">
                        <div class="blog-post-summary__content">
                            <p class="blog-post-summary__date">24TH AUG 2023</p>
                            <h3 class="blog-post-summary__title">JOURNEY THROUGH FRESHNESS EXQUSITE SUSHI SELECTION</h3>
                            <p class="blog-post-summary__excerpt">Embark on a seafood adventure, guided by Qitchen's fresh and exquisite sushi creations from the sea.</p>
                            <p class="blog-post-summary__author">Author Name</p>
                        </div>
                    </a>
                    <a href="#/blogpage" class="blog-post-summary" data-link>
                        <img src="./assets/images/blog-post4.webp" class="blog-post-summary__image">
                        <div class="blog-post-summary__content">
                            <p class="blog-post-summary__date">24TH AUG 2023</p>
                            <h3 class="blog-post-summary__title">PALATE WITH QITCHEN'S UNSURPASSED SUSHI DELICACIES</h3>
                            <p class="blog-post-summary__excerpt">Discover the heights of gastronomic delight as Qitchen's sushi transports you to a new culinary realm.</p>
                            <p class="blog-post-summary__author">Author Name</p>
                        </div>
                    </a>
                    <a href="#/blogpage" class="blog-post-summary" data-link>
                        <img src="./assets/images/blog-post5.webp" class="blog-post-summary__image">
                        <div class="blog-post-summary__content">
                            <p class="blog-post-summary__date">24TH AUG 2023</p>
                            <h3 class="blog-post-summary__title">THE QITCHEN EXPERIENCE BEYOND SUSHI</h3>
                            <p class="blog-post-summary__excerpt">Immerse in Qitchen's passion for culinary excellence, where sushi is more than a dish—it's an experience.</p>
                            <p class="blog-post-summary__author">Author Name</p>
                        </div>
                    </a>
                    
                    </div>
            </div>
        </aside>
    </div>
`;

class BlogPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(blogPageTemplate.content.cloneNode(true));
    }
}

customElements.define('blog-page', BlogPage);