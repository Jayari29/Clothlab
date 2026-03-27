import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';

const heroImages = [
    { label: 'New In', src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=90&fit=crop' },
    { label: 'Hoodies', src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=90&fit=crop' },
    { label: 'T-Shirts', src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=300&q=90&fit=crop' },
    { label: 'Trousers', src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=90&fit=crop' },
];

const featureCards = [
    { label: 'Minimalist', src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=90&fit=crop' },
    { label: 'Street Wear', src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&q=90&fit=crop' },
    { label: 'Tailored', src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=90&fit=crop' },
];

const trendingItems = [
    { name: 'Oversized Hoodie',  price: 'DT 59',  src: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=90&fit=crop',  tag: 'Best Seller', category: 'Hoodies'      },
    { name: 'Zip Hoodie',        price: 'DT 65',  src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=90&fit=crop',  tag: 'New',         category: 'Hoodies'      },
    { name: 'Hoodie Fleece',     price: 'DT 55',  src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=90&fit=crop',  tag: 'Confort',     category: 'Hoodies'      },
    { name: 'Classic White Tee', price: 'DT 29',  src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=90&fit=crop',  tag: 'New',         category: 'T-Shirts'     },
    { name: 'Crop Top',          price: 'DT 34',  src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&q=90&fit=crop',  tag: 'Trending',    category: 'T-Shirts'     },
    { name: 'Polo Sport',        price: 'DT 45',  src: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=90&fit=crop',  tag: 'Sport',       category: 'T-Shirts'     },
    { name: 'Cargo Pants',       price: 'DT 79',  src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=90&fit=crop',  tag: 'Trending',    category: 'Pantalons'    },
    { name: 'Jean Slim',         price: 'DT 69',  src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=90&fit=crop',  tag: 'Classic',     category: 'Pantalons'    },
    { name: 'Jogging Cargo',     price: 'DT 59',  src: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&q=90&fit=crop',  tag: 'Street',      category: 'Pantalons'    },
    { name: 'Bomber Jacket',     price: 'DT 99',  src: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=90&fit=crop',  tag: 'Limited',     category: 'Vestes'       },
    { name: 'Windbreaker',       price: 'DT 89',  src: 'https://images.unsplash.com/photo-1542219550-37153d387c27?w=400&q=90&fit=crop',  tag: 'New',         category: 'Vestes'       },
    { name: 'Casquette 5-panel', price: 'DT 25',  src: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=90&fit=crop',  tag: 'Best Seller', category: 'Accessoires'  },
    { name: 'Tote Bag',          price: 'DT 19',  src: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=90&fit=crop',  tag: 'Eco',         category: 'Accessoires'  },
    { name: 'Beanie',            price: 'DT 22',  src: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&q=90&fit=crop',  tag: 'Hiver',       category: 'Accessoires'  },
];

const FILTER_CATS = ['Tout', 'Hoodies', 'T-Shirts', 'Pantalons', 'Vestes', 'Accessoires'];

const sideGrid = [
    { src: 'https://images.unsplash.com/photo-1485218126466-34e6392ec754?w=200&q=80&fit=crop', label: 'Luxury Edit' },
    { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80&fit=crop', label: 'Summer 25' },
    { src: 'https://images.unsplash.com/photo-1561861422-a549073e547a?w=200&q=80&fit=crop', label: 'Urban Core' },
    { src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80&fit=crop', label: 'Festival Edit' },
];

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState('Tout');
    const [searchInput, setSearchInput] = useState('');

    const filteredItems = trendingItems.filter(item => {
        const matchCat = activeCategory === 'Tout' || item.category === activeCategory;
        const matchSearch = item.name.toLowerCase().includes(searchInput.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="catalog-page">
            <section className="catalog-hero">
                <div className="catalog-hero-bg">
                    <img src="/catalog_hero.png" alt="hero fashion" />
                    <div className="catalog-hero-overlay" />
                </div>
                <div className="catalog-hero-content">
                    <span className="catalog-eyebrow">La bibliothÃ¨que des modÃ¨les</span>
                    <h1 className="split-heading">
                        <span className="sh-italic">Muse prÃ©cision, qualitÃ©,</span>
                        <span className="sh-bold-light">adaptabilitÃ© crÃ©ative.</span>
                    </h1>
                    <p>Choisissez parmi notre sÃ©lection de gabarits 3D prÃªts Ã  personnaliser.</p>
                    <Link to="/editor" className="btn-teal-lg">Commencer â†’</Link>
                </div>
                {/* Thumbnail strip */}
                <div className="catalog-hero-strip">
                    {heroImages.map((img) => (
                        <div key={img.label} className="hero-strip-item">
                            <img src={img.src} alt={img.label} />
                            <span>{img.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---- Style Categories ---- */}
            <section className="catalog-section catalog-categories">
                <div className="catalog-section-label">Styles</div>
                <div className="catalog-cols">
                    <div className="catalog-col-left">
                        <h2 className="split-heading">
                            <span className="sh-italic">Filtrer par</span>
                            <span className="sh-bold">inspiration.</span>
                        </h2>
                        <p>Parcourez les styles et trouvez le gabarit idÃ©al pour votre crÃ©ation.</p>
                        <Link to="/editor" className="btn-outline-sm">Voir tout</Link>
                    </div>
                    <div className="catalog-col-right">
                        <div className="feature-cards-row">
                            {featureCards.map((c) => (
                                <div key={c.label} className="feature-img-card">
                                    <img src={c.src} alt={c.label} />
                                    <div className="feature-img-label">{c.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- Trending Grid ---- */}
            <section className="catalog-section catalog-trending">
                <div className="catalog-section-label">Tendances</div>
                <div className="trending-header">
                    <h2 className="split-heading">
                        <span className="sh-italic">ModÃ¨les</span>
                        <span className="sh-bold">en vogue.</span>
                    </h2>
                    <span className="trending-count">{filteredItems.length} modÃ¨le{filteredItems.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Filter bar */}
                <div className="catalog-filter-bar">
                    <div className="catalog-filter-pills">
                        {FILTER_CATS.map(cat => (
                            <button
                                key={cat}
                                className={`filter-pill ${activeCategory === cat ? 'filter-pill-active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="catalog-search-wrap">
                        <span className="catalog-search-icon">ðŸ”</span>
                        <input
                            className="catalog-search-input"
                            placeholder="Rechercher un modÃ¨le..."
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        {searchInput && (
                            <button className="catalog-search-clear" onClick={() => setSearchInput('')}>Ã—</button>
                        )}
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="catalog-empty">
                        <p>Aucun modÃ¨le trouvÃ© pour <strong>"{searchInput}"</strong> dans <strong>{activeCategory}</strong>.</p>
                        <button className="btn-outline-sm" onClick={() => { setActiveCategory('Tout'); setSearchInput(''); }}>RÃ©initialiser les filtres</button>
                    </div>
                ) : (
                    <div className="trending-grid">
                        {filteredItems.map((item) => (
                            <div key={item.name} className="trending-card">
                                <div className="trending-img">
                                    <img src={item.src} alt={item.name} />
                                    <span className="trending-tag">{item.tag}</span>
                                    <span className="trending-category-badge">{item.category}</span>
                                    <div className="trending-hover"><Link to="/editor">Personnaliser</Link></div>
                                </div>
                                <div className="trending-info">
                                    <span className="trending-name">{item.name}</span>
                                    <span className="trending-price">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ---- Feature Row (image left, text right) ---- */}
            <section className="catalog-section catalog-feature-row">
                <div className="feature-row-img">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80&fit=crop" alt="navigation fluide" />
                </div>
                <div className="feature-row-text">
                    <span className="catalog-section-label">ExpÃ©rience</span>
                    <h2 className="split-heading">
                        <span className="sh-italic">Navigation</span>
                        <span className="sh-bold">fluide.</span>
                    </h2>
                    <p>Parcourez simplement une vaste collection de modÃ¨les, d'options et d'inspirations en toute fluiditÃ©. Chaque filtre vous rapproche du vÃªtement parfait.</p>
                    <ul className="feature-bullet-list">
                        <li>âœ“ Filtres par catÃ©gorie, style, genre</li>
                        <li>âœ“ AperÃ§u 3D interactif par modÃ¨le</li>
                        <li>âœ“ AccÃ¨s direct Ã  l'Ã©diteur en 1 clic</li>
                    </ul>
                    <Link to="/editor" className="btn-teal-lg">Essayer maintenant</Link>
                </div>
            </section>

            {/* ---- Side-by-side grid + text ---- */}
            <section className="catalog-section catalog-side-grid-row">
                <div className="side-grid-text">
                    <span className="catalog-section-label">AperÃ§u 3D</span>
                    <h2 className="split-heading">
                        <span className="sh-italic">AperÃ§u 3D</span>
                        <span className="sh-bold">immÃ©diat.</span>
                    </h2>
                    <p>Chaque modÃ¨le peut Ãªtre visualisÃ© et tournÃ© en 3D avant sÃ©lection. Inspectez chaque dÃ©tail avant de commencer la personnalisation.</p>
                    <Link to="/editor" className="btn-outline-sm">Voir en 3D â†’</Link>
                </div>
                <div className="side-grid">
                    {sideGrid.map((item) => (
                        <div key={item.label} className="side-grid-item">
                            <img src={item.src} alt={item.label} />
                            <div className="side-grid-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---- Feature Row (text left, image right) ---- */}
            <section className="catalog-section catalog-feature-row reversed">
                <div className="feature-row-text">
                    <span className="catalog-section-label">Direct</span>
                    <h2 className="split-heading">
                        <span className="sh-italic">AccÃ¨s direct</span>
                        <span className="sh-bold">Ã  l'Ã©dition.</span>
                    </h2>
                    <p>Lancez la personnalisation du modÃ¨le choisi sans fioriture. Un click suffit pour ouvrir le studio et commencer Ã  crÃ©er.</p>
                    <Link to="/editor" className="btn-teal-lg">Ouvrir le Studio</Link>
                </div>
                <div className="feature-row-img">
                    <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80&fit=crop" alt="edition directe" />
                </div>
            </section>

            {/* ---- CTA ---- */}
            <section className="catalog-cta">
                <h2 className="split-heading">
                    <span className="sh-italic">PrÃªt Ã  explorerÂ ?</span>
                    <span className="sh-bold-light">Lancez-vous.</span>
                </h2>
                <p>DÃ©couvrez notre bibliothÃ¨que de gabarits et lancez votre premiÃ¨re crÃ©ation.</p>
                <Link to="/editor" className="btn-teal-lg">Explorer maintenant</Link>
            </section>

        </div>
    );
};

export default Catalog;
