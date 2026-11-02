import React, { useEffect, useState } from "react";
import "./App.css";

const collections = [
    {
        name: "Paintings",
        path: "paintings.html",
        description: "Stories, colour, and craft on canvas.",
        pageDescription: "Explore expressive brushwork, unforgettable scenes, and stories told on canvas.",
        image: "images/painting1.jpg",
        imageAlt: "American Gothic by Grant Wood",
        artworks: [
            { title: "American Gothic", artist: "Grant Wood", image: "images/painting1.jpg", description: "A carefully composed portrait of rural American life, both direct and quietly mysterious." },
            { title: "The Starry Night", artist: "Vincent van Gogh", image: "images/painting2.jpg", description: "A village rests beneath a swirling, luminous night sky full of movement and colour." },
            { title: "The Swing", artist: "Jean-Honoré Fragonard", image: "images/painting3.jpg", description: "A playful Rococo garden scene filled with soft light, motion, and delicate detail." },
            { title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", image: "images/painting4.jpg", description: "A quiet turn of the head and a gleaming pearl make this portrait unforgettable." },
            { title: "Mona Lisa", artist: "Leonardo da Vinci", image: "images/painting5.jpg", description: "A celebrated Renaissance portrait known for its subtle expression and soft landscape." },
            { title: "The Persistence of Memory", artist: "Salvador Dalí", image: "images/painting6.jpg", description: "Surreal, melting clocks transform a still landscape into a dreamlike puzzle." },
            { title: "The Birth of Venus", artist: "Sandro Botticelli", image: "images/painting7.jpg", description: "A mythological scene that celebrates beauty, grace, and the world of the Renaissance." },
            { title: "The Garden at Sainte-Adresse", artist: "Claude Monet", image: "images/art-painting-garden.jpg", description: "A sunlit garden overlooks the sea in this colourful painting by Claude Monet.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Jardin_%C3%A0_Sainte-Adresse.jpg", license: "Public domain" },
            { title: "Springtime", artist: "Claude Monet", image: "images/art-painting-springtime.jpg", description: "Monet captures the fresh greens and gentle light of a spring garden.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Springtime_-_Google_Art_Project.jpg", license: "Public domain" },
            { title: "The Magpie", artist: "Claude Monet", image: "images/art-painting-magpie.jpg", description: "A magpie rests on a snowy fence in Monet's quiet winter landscape.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Magpie_-_Google_Art_Project.jpg", license: "Public domain" }
        ]
    },
    {
        name: "Digital Art",
        path: "digital-art.html",
        description: "Imagination shaped by new tools.",
        pageDescription: "Step into imaginative worlds made with pixels, light, and limitless possibility.",
        image: "images/digital1.png",
        imageAlt: "Colourful digital artwork of a neon city",
        artworks: [
            { title: "Neon City", artist: "Cyberpunk digital art", image: "images/digital1.png", description: "A glowing cityscape where vivid lights turn the night into a living canvas." },
            { title: "Enchanted Castle", artist: "Fantasy digital art", image: "images/digital2.jpg", description: "A storybook fortress invites visitors into a world of wonder and possibility." },
            { title: "Cosmic Dreams", artist: "Space-inspired art", image: "images/digital3.jpg", description: "Colourful celestial forms imagine the vastness and beauty of space." },
            { title: "Ocean Dreams", artist: "Underwater-inspired art", image: "images/digital4.jpg", description: "An imaginative journey beneath the waves, filled with fluid shapes and colour." },
            { title: "Dreamscape", artist: "Surreal digital art", image: "images/digital5.jpg", description: "Familiar forms shift into an unexpected landscape shaped by dreams." },
            { title: "Future Robot", artist: "Science-fiction art", image: "images/digital6.jpg", description: "A character study that explores the meeting point of technology and imagination." },
            { title: "Mystic Forest", artist: "Fantasy nature art", image: "images/digital7.jpg", description: "A quiet woodland becomes an enchanted place through light, texture, and colour." },
            { title: "Mandelbulb 3D", artist: "Mariagata1959", image: "images/art-digital-fractal.jpg", description: "A computer-generated fractal reveals intricate forms and repeating patterns.", sourceUrl: "https://commons.wikimedia.org/wiki/File:1037_Mandelbulb_3D.jpg", license: "CC BY-SA 4.0" },
            { title: "Alice in Wonderland", artist: "David Revoy", image: "images/art-digital-alice.jpg", description: "A digital illustration brings a familiar storybook world to life.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Alice-in-Wonderland_by-David-Revoy_2010-07-21.jpg", license: "CC BY 4.0" },
            { title: "Futuristic Digital Art", artist: "Satheesh Sankaran", image: "images/art-digital-future.jpg", description: "A vivid digital scene imagines a glowing world shaped by future technology.", sourceUrl: "https://commons.wikimedia.org/wiki/File:8K_Futuristic_Digital_Art_Wallpaper.jpg", license: "CC BY-SA 2.0" }
        ]
    },
    {
        name: "Sculptures",
        path: "sculptures.html",
        description: "Art that brings form into space.",
        pageDescription: "Discover how artists transform stone, bronze, and other materials into lasting forms.",
        image: "images/sculpture6.jpg",
        imageAlt: "A sculpted figure displayed outdoors",
        artworks: [
            { title: "David", artist: "Michelangelo", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/David%20by%20Michelangelo.jpg", description: "A monumental marble figure that captures strength, focus, and human possibility." },
            { title: "The Thinker", artist: "Auguste Rodin", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Thinker%2C%20Rodin.jpg", description: "A bronze figure whose stillness gives physical form to deep reflection." },
            { title: "Venus de Milo", artist: "Alexandros of Antioch", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Venus%20de%20Milo.jpg", description: "An ancient Greek sculpture admired for its poised stance and graceful lines." },
            { title: "Pietà", artist: "Michelangelo", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pieta%20by%20Michelangelo.jpg", description: "A masterful marble composition balancing tenderness with remarkable detail." },
            { title: "The Kiss", artist: "Auguste Rodin", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rodin%20The%20Kiss.JPG", description: "Two figures meet in a sculpture that captures intimacy and movement." },
            { title: "The Little Mermaid", artist: "Edvard Eriksen", image: "images/sculpture6.jpg", description: "A much-loved Copenhagen landmark inspired by Hans Christian Andersen's tale." },
            { title: "Dynamic Mobile", artist: "Michal Klajban", image: "images/art-sculpture-mobile.jpg", description: "A steel mobile sculpture balances movement and form in an outdoor setting.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Dynamic_Mobile_Steel_Sculpture,_Victoria,_British_Columbia,_Canada_01.jpg", license: "CC BY-SA 4.0" },
            { title: "Madonna with Child and Saint John", artist: "Petar Milošević", image: "images/art-sculpture-madonna.jpg", description: "A carved devotional sculpture brings together three figures in a quiet scene.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sculpture_of_Madonna_with_child_and_St_John_(Kunsthistoriches_Museum).jpg", license: "CC BY-SA 4.0" },
            { title: "Lion of Saint Mark", artist: "Didier Descouens", image: "images/art-sculpture-lion.jpg", description: "A sculpted lion stands above the historic Piazza dei Signori in Vicenza.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Piazza_dei_Signori_(Vicenza)_-_Statue_of_the_Lion_of_Saint_Mark.jpg", license: "CC BY-SA 4.0" },
            { title: "Statue of Bes", artist: "Photo by Szilas", image: "images/art-sculpture-bes.jpg", description: "An ancient Egyptian figure is preserved in a detailed museum sculpture.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Statue_of_Bes,_an_Egyptian_official_(Gulbenkian_Museum,_photo_by_Szilas).jpg", license: "CC BY-SA 3.0" }
        ]
    },
    {
        name: "Photography",
        path: "photography.html",
        description: "Remarkable moments, held in time.",
        pageDescription: "See how a single frame can preserve a feeling, a place, or a moment in history.",
        image: "images/photography2.jpg",
        imageAlt: "A striking portrait photograph",
        artworks: [
            { title: "Migrant Mother", artist: "Dorothea Lange", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lange-MigrantMother02.jpg", description: "A compassionate portrait that became an enduring image of resilience during the Great Depression." },
            { title: "Afghan Girl", artist: "Steve McCurry", image: "images/photography2.jpg", description: "A powerful portrait remembered for its direct gaze and vivid colour." },
            { title: "Lunch Atop a Skyscraper", artist: "Charles C. Ebbets", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lunch%20atop%20a%20Skyscraper.jpg", description: "Workers share a lunch break above Manhattan in a striking record of city-building." },
            { title: "Moonrise, Hernandez", artist: "Ansel Adams", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moonrise%2C%20Hernandez%2C%20New%20Mexico.jpg", description: "Carefully balanced light and shadow give this landscape its dramatic clarity." },
            { title: "Earthrise", artist: "William Anders", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Earthrise.jpg", description: "A view of Earth from lunar orbit that changed how many people pictured our planet." },
            { title: "The Falling Man", artist: "Richard Drew", image: "images/photography6.jpg", description: "A difficult and widely discussed image that documents a moment in modern history." },
            { title: "Jean-Michel Jarre Live", artist: "A. Savin", image: "images/art-photo-jarre.jpg", description: "A live performance portrait captures musician Jean-Michel Jarre on stage.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean_Michel_Jarre_B10-2016.jpg", license: "FAL" },
            { title: "Portrait of James John Charles Beck", artist: "Unknown author", image: "images/art-photo-beck.jpg", description: "A historic portrait photograph preserves the likeness of James John Charles Beck.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_James_John_Charles_Beck_(4673954).jpg", license: "Public domain" },
            { title: "Autumn near Gullesfjordbotn", artist: "Ximonic (Simo Räsänen)", image: "images/art-photo-autumn.jpg", description: "Autumn colours settle over a quiet landscape near Gullesfjordbotn, Norway.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Autumn_landscape_near_Gullesfjordbotn,_Hinn%C3%B8ya,_2010_September.jpg", license: "CC BY-SA 3.0" },
            { title: "Tuscan Landscape with a Lonely Tree", artist: "Eric Kilby", image: "images/art-photo-tuscany.jpg", description: "A solitary tree shapes the open lines of this Tuscan landscape photograph.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tuscan_landscape_with_lonely_tree.jpg", license: "CC BY-SA 2.0" }
        ]
    },
    {
        name: "Modern Art",
        path: "modern-art.html",
        description: "Fresh perspectives and fearless ideas.",
        pageDescription: "Explore bold experiments and new ways of seeing that changed the language of art.",
        image: "images/modernart2.jpg",
        imageAlt: "Expressive modern artwork",
        artworks: [
            { title: "The Scream", artist: "Edvard Munch", image: "images/modernart1.jpg", description: "A vivid image of anxiety and emotion, expressed through a dramatic landscape." },
            { title: "Guernica", artist: "Pablo Picasso", image: "images/modernart2.jpg", description: "A monumental anti-war work whose fractured forms convey grief and protest." },
            { title: "Campbell's Soup Cans", artist: "Andy Warhol", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Campbell%27s%20Soup%20Cans%20by%20Andy%20Warhol.jpg", description: "Everyday packaging becomes the subject of a landmark Pop Art series." },
            { title: "Composition VIII", artist: "Wassily Kandinsky", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wassily%20Kandinsky%20Composition%20VIII.jpg", description: "Geometric forms and colour create a lively visual rhythm across the canvas." },
            { title: "The Son of Man", artist: "René Magritte", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Son%20of%20Man.jpg", description: "A familiar portrait is made strange by a carefully placed, floating apple." },
            { title: "No. 5, 1948", artist: "Jackson Pollock", image: "images/modernart6.jpg", description: "Layered gestures and drips make the act of painting part of the finished work." },
            { title: "Color Tale", artist: "Fons Heijnsbroek", image: "images/art-modern-color-tale.jpg", description: "Green and yellow watercolor forms blend into a lively abstract composition.", sourceUrl: "https://commons.wikimedia.org/wiki/File:%27Color_Tale%27_-_abstract_painting_in_green_and_yellow_blur_-_watercolor_on_paper_-_modern_abstract_expressionism_by_Fons_Heijnsbroek,_2008_-_free_download_art_image_CC0,_high_resolutions_TIFF.tif", license: "CC0" },
            { title: "Danish Blue", artist: "Fons Heijnsbroek and Ben Vollers", image: "images/art-modern-danish-blue.jpg", description: "Layered blue shapes form a bold, collaborative abstract painting.", sourceUrl: "https://commons.wikimedia.org/wiki/File:%27Danish_Blue%27_large_abstract_painting_on_canvas,_created_together_by_artists_Ben_Vollers_%26_Fons_Heijnsbroek_in_2008;_modern_wall_art_painting_-_free_download_art_image_CC0,_high_resolutions_TIFF.tif", license: "CC0" },
            { title: "Nature's Entry", artist: "Fons Heijnsbroek and Ben Vollers", image: "images/art-modern-natures-entry.jpg", description: "Organic shapes and colour create an abstract interpretation of nature.", sourceUrl: "https://commons.wikimedia.org/wiki/File:%27Nature%27s_Entry%27_large_abstract_painting_on_canvas,_created_together_by_artists_Ben_Vollers_%26_Fons_Heijnsbroek_in_2008;_modern_wall_art_painting_-_free_download_art_image_CC0,_high_resolutions_TIFF.tif", license: "CC0" },
            { title: "Tomorrow", artist: "Fons Heijnsbroek and Ben Vollers", image: "images/art-modern-tomorrow.jpg", description: "A colourful abstract composition suggests movement toward a new horizon.", sourceUrl: "https://commons.wikimedia.org/wiki/File:%27Tomorrow%27_large_abstract_painting_on_canvas,_created_together_by_artists_Ben_Vollers_%26_Fons_Heijnsbroek_in_2008;_modern_wall_art_painting_-_free_download_art_image_CC0,_high_resolutions_TIFF.tif", license: "CC0" }
        ]
    }
];

function Navigation({ isHome, currentCollection, isOpen, onNavigate }) {
    const homeLink = "/EX%201.html";

    return (
        <nav className={"main-nav" + (isOpen ? " is-open" : "")} aria-label="Main navigation">
            {!isHome && <a href={homeLink} onClick={onNavigate}>Home</a>}
            {collections.map(function (collection) {
                return (
                    <a
                        key={collection.path}
                        href={collection.path}
                        aria-current={currentCollection && currentCollection.path === collection.path ? "page" : undefined}
                        onClick={onNavigate}
                    >
                        {collection.name}
                    </a>
                );
            })}
            <a href={isHome ? "#contact" : homeLink + "#contact"} onClick={onNavigate}>Contact Us</a>
        </nav>
    );
}

function Header({ isHome, collection, theme, onThemeToggle }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = function () {
        setIsMenuOpen(false);
    };

    return (
        <header className={"site-header" + (isHome ? "" : " page-header")}>
            <div className="header-content">
                <div className="header-tools">
                    <a className="brand" href="/EX%201.html">Art Gallery</a>
                    <button className="theme-toggle" type="button" onClick={onThemeToggle}>
                        {theme === "light" ? "☾ Dark mode" : "☀ Light mode"}
                    </button>
                    <button
                        className="menu-toggle"
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls="gallery-navigation"
                        onClick={function () { setIsMenuOpen(!isMenuOpen); }}
                    >
                        {isMenuOpen ? "Close menu" : "Menu"}
                    </button>
                </div>
                {isHome ? (
                    <>
                        <p className="eyebrow">A place for imagination</p>
                        <h1>Discover art that moves you.</h1>
                        <p className="header-description">Explore timeless masterpieces and bold new ideas from around the world.</p>
                    </>
                ) : (
                    <div className="page-heading">
                        <p className="eyebrow">Collection {String(collections.indexOf(collection) + 1).padStart(2, "0")}</p>
                        <h1>{collection.name}</h1>
                        <p>{collection.pageDescription}</p>
                    </div>
                )}
                <div id="gallery-navigation">
                    <Navigation
                        isHome={isHome}
                        currentCollection={collection}
                        isOpen={isMenuOpen}
                        onNavigate={closeMenu}
                    />
                </div>
            </div>
        </header>
    );
}

function HeroSection() {
    return (
        <section className="intro-section content-width">
            <div className="intro-copy">
                <p className="eyebrow">Welcome to the gallery</p>
                <h2>Art opens a world of possibilities.</h2>
                <p>Step into a welcoming space where every artwork has a story. Browse five distinct collections, discover the artists behind iconic works, and find inspiration in styles that span centuries and mediums.</p>
                <a className="button-link" href="paintings.html">Explore the collections</a>
            </div>
            <figure className="featured-art">
                <img src="images/painting2.jpg" alt="A vivid, swirling night sky in a painting" />
                <figcaption>A little wonder in every brushstroke</figcaption>
            </figure>
        </section>
    );
}

function CollectionCard({ collection, index }) {
    return (
        <a className="collection-card" href={collection.path}>
            <img src={collection.image} alt={collection.imageAlt} />
            <span>{String(index + 1).padStart(2, "0")} / Collection</span>
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
        </a>
    );
}

function CollectionGrid() {
    return (
        <section className="collection-section content-width" aria-labelledby="collections-heading">
            <div className="section-heading">
                <p className="eyebrow">Find your inspiration</p>
                <h2 id="collections-heading">Explore the collections</h2>
                <p>Choose a collection and take a closer look at the works within.</p>
            </div>
            <div className="collection-grid">
                {collections.map(function (collection, index) {
                    return <CollectionCard key={collection.path} collection={collection} index={index} />;
                })}
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <section className="about-section" id="about">
            <div className="about-content content-width">
                <p className="eyebrow">Our purpose</p>
                <h2>A gallery for everyone.</h2>
                <p>Art Gallery celebrates creativity in all its forms. We make it easy to explore celebrated works, learn a little about their history, and enjoy the many ways artists see the world. Whether you are a lifelong art lover or just starting to explore, there is always something new to discover.</p>
            </div>
        </section>
    );
}

function validateForm(values) {
    const errors = {};

    if (values.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters long.";
    }

    return errors;
}

function ContactForm() {
    const [values, setValues] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateField(event) {
        const field = event.target.name;
        const value = event.target.value;
        setValues(function (currentValues) {
            return { ...currentValues, [field]: value };
        });
        setErrors(function (currentErrors) {
            return { ...currentErrors, [field]: "" };
        });
        setStatus("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formErrors = validateForm(values);
        setErrors(formErrors);
        setStatus("");

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });
            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors || {});
                setStatus(result.message || "Your message could not be sent.");
                return;
            }

            setStatus(result.message);
            setValues({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("Unable to send your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="contact-section content-width" id="contact">
            <div className="section-heading">
                <p className="eyebrow">We would love to hear from you</p>
                <h2 id="contact-heading">Contact Us</h2>
                <p>Have a question about the gallery? Send us a message.</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={updateField} aria-describedby="name-error" aria-invalid={Boolean(errors.name)} />
                    <p className="field-error" id="name-error">{errors.name}</p>
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={updateField} aria-describedby="email-error" aria-invalid={Boolean(errors.email)} />
                    <p className="field-error" id="email-error">{errors.email}</p>
                </div>
                <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" value={values.message} onChange={updateField} aria-describedby="message-error" aria-invalid={Boolean(errors.message)} />
                    <p className="field-error" id="message-error">{errors.message}</p>
                </div>
                <button className="button-link" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                </button>
                <p className="form-success" role="status" aria-live="polite">{status}</p>
            </form>
        </section>
    );
}

function ArtworkCard({ artwork, isFavourite, onToggleFavourite }) {
    return (
        <article className="artwork-card">
            <img src={artwork.image} alt={artwork.title} />
            <div className="artwork-copy">
                <h2>{artwork.title}</h2>
                <p className="artwork-credit">{artwork.artist}</p>
                {artwork.sourceUrl && (
                    <p className="artwork-attribution">
                        <a href={artwork.sourceUrl} target="_blank" rel="noreferrer">
                            Image source · {artwork.license}
                        </a>
                    </p>
                )}
                <p>{artwork.description}</p>
                <button className="favourite-button" type="button" aria-pressed={isFavourite} onClick={onToggleFavourite}>
                    {isFavourite ? "♥ Favourited" : "♡ Favourite"}
                </button>
            </div>
        </article>
    );
}

function ArtworkCollection({ collection }) {
    const [searchText, setSearchText] = useState("");
    const [favourites, setFavourites] = useState([]);
    const visibleArtworks = collection.artworks.filter(function (artwork) {
        return artwork.title.toLowerCase().includes(searchText.trim().toLowerCase());
    });

    function toggleFavourite(title) {
        setFavourites(function (currentFavourites) {
            return currentFavourites.includes(title)
                ? currentFavourites.filter(function (favourite) { return favourite !== title; })
                : [...currentFavourites, title];
        });
    }

    return (
        <main>
            <section className="artwork-section content-width" aria-label={collection.name + " collection"}>
                <div className="artwork-controls">
                    <label htmlFor="artwork-search">Search by title</label>
                    <input type="search" id="artwork-search" placeholder="Search artworks..." value={searchText} onChange={function (event) { setSearchText(event.target.value); }} />
                    <p className="favourite-count" aria-live="polite">Favourites: <span>{favourites.length}</span></p>
                </div>
                <div className="artwork-grid">
                    {visibleArtworks.map(function (artwork) {
                        return (
                            <ArtworkCard
                                key={artwork.title}
                                artwork={artwork}
                                isFavourite={favourites.includes(artwork.title)}
                                onToggleFavourite={function () { toggleFavourite(artwork.title); }}
                            />
                        );
                    })}
                </div>
                {visibleArtworks.length === 0 && <p className="no-results">No artworks match that title.</p>}
            </section>
            <a className="back-link" href="/EX%201.html">← Back to Home</a>
        </main>
    );
}

function Footer() {
    return (
        <footer className="site-footer">
            <a className="footer-brand" href="/EX%201.html">Art Gallery</a>
            <p>Made for curious minds and creative hearts.</p>
            <p>&copy; 2026 Art Gallery. All rights reserved.</p>
        </footer>
    );
}

export default function App() {
    const [theme, setTheme] = useState("light");
    const pathname = decodeURIComponent(window.location.pathname).toLowerCase();
    const collection = collections.find(function (item) {
        return pathname.endsWith("/" + item.path);
    });
    const isHome = !collection;

    useEffect(function () {
        document.title = collection
            ? collection.name + " | Art Gallery"
            : "Art Gallery | Discover Art That Moves You";
    }, [collection]);

    return (
        <div className={"app-shell theme-" + theme}>
            <Header
                isHome={isHome}
                collection={collection}
                theme={theme}
                onThemeToggle={function () { setTheme(theme === "light" ? "dark" : "light"); }}
            />
            {isHome ? (
                <main>
                    <HeroSection />
                    <CollectionGrid />
                    <AboutSection />
                    <ContactForm />
                </main>
            ) : (
                <ArtworkCollection key={collection.path} collection={collection} />
            )}
            <Footer />
        </div>
    );
}
