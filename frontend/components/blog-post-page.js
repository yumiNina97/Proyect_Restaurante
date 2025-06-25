const blogPostPageTemplate = document.createElement('template');
blogPostPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/article-content/article-content.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-blogpage.png');
        }
        .layout-split__sidebar {
            padding: 60px 40px;
            overflow-y: auto;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            </main>

        <aside class="layout-split__sidebar">
            <article class="article-content">
                <p class="article-content__date">24'th AUG 2023</p>
                <h1 class="article-content__main-title">HOW QITCHEN REDEFINES FLAVOR HARMONY IN EVERY BITE</h1>
                
                <h2 class="article-content__section-title">UNVEILING CULINARY ARTISTRY: A JOURNEY INTO QITCHEN'S SOUL</h2>
                <p class="article-content__paragraph">
                    In a world where dining experiences often blend into the ordinary, Qitchen stands as an emblem of culinary passion redefined. Beyond being a restaurant that serves sushi, Qitchen is an embodiment of dedication, creativity, and a profound love for the art of gastronomy. As you step through its doors, you're not merely entering an eatery; you're immersing yourself in an experience that goes beyond the boundaries of a traditional dining encounter.
                </p>

                <h2 class="article-content__section-title">CRAFTING A FEAST FOR THE SENSES</h2>
                <p class="article-content__paragraph">
                    The heart of Qitchen's allure lies in its meticulous attention to every detail, from the selection of ingredients to the presentation of each dish. While renowned for its exceptional sushi, Qitchen's passion for perfection extends to every facet of the culinary journey. The talented chefs curate a symphony of flavors, seamlessly blending textures, colors, and aromas to create a multisensory masterpiece.
                </p>
                <p class="article-content__paragraph">
                    The ambiance itself speaks of a story where modern elegance meets warmth, inviting patrons to relish not only the food but also the atmosphere that envelopes them. Each dish that graces the table is not just a meal; it's a tale told through taste—a testament to the tireless commitment Qitchen has toward crafting an experience that resonates with food enthusiasts and connoisseurs alike.
                </p>

                <h2 class="article-content__section-title">BEYOND SUSHI: NURTURING CONNECTIONS</h2>
                <p class="article-content__paragraph">
                    While the gastronomic delights are undoubtedly the centerpiece, Qitchen goes beyond being a culinary haven. It's a place that fosters connections, where conversations flow as smoothly as the sake, and moments turn into cherished memories. The passionate team at Qitchen believes that dining is an act of bonding—a chance to share joy, laughter, and stories over a beautifully laid table. 
                </p>
                <p class="article-content__paragraph">
                    The Qitchen experience transcends the physical walls of the restaurant. It's an invitation to step out of the ordinary and into a world where passion for food is an art, and every guest is a cherished canvas. Through the symphony of flavors, the artistry of presentation, and the warmth of connection, Qitchen invites you to witness passion personified in every aspect of your dining journey.
                </p>

                <p class="article-content__author">Author: Name</p>
            </article>
        </aside>
    </div>
`;


class BlogPostPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(blogPostPageTemplate.content.cloneNode(true));
    }
}

customElements.define('blog-post-page', BlogPostPage);