import { Link } from 'react-router-dom';
import { RevealSection } from '../components/RevealSection';
import './Home.css';

const stats = [
    { value: '10k+', label: 'Creators' },
    { value: '500k+', label: 'Designs' },
    { value: '200+', label: 'Fabrics' },
    { value: '24h', label: 'Delivery' },
];

const HOW_STEPS = [
    {
        num: '01',
        title: 'Choisissez un modèle',
        desc: 'Parcourez notre bibliothèque 3D et sélectionnez votre gabarit parmi des dizaines de catégories.',
        icon: '👕',
    },
    {
        num: '02',
        title: 'Personnalisez librement',
        desc: 'Couleur, matière, taille, décals, coupe�dt� chaque détail est ajustable en temps réel.',
        icon: '🎨',
    },
    {
        num: '03',
        title: 'Commandez en production',
        desc: 'Envoyez directement à un fabricant partenaire et recevez votre création livrée en 24h.',
        icon: '�dt',
    },
];

const PRICING = [
    {
        tier: 'Starter',
        price: 'Gratuit',
        period: '',
        highlight: false,
        badge: null,
        perks: [
            '3 créations / mois',
            'Bibliothèque standard',
            'Export PNG',
            'Support communautaire',
        ],
        cta: 'Commencer',
        ctaPath: '/auth',
    },
    {
        tier: 'Pro',
        price: '€29',
        period: ' /mois',
        highlight: true,
        badge: 'Populaire',
        perks: [
            'Créations illimitées',
            'Bibliothèque premium + Décals',
            'Export PNG, SVG, PDF',
            'Sur-mesure & tailles avancées',
            'Support prioritaire',
        ],
        cta: 'Essai 14 jours',
        ctaPath: '/auth',
    },
    {
        tier: 'Studio',
        price: '€79',
        period: ' /mois',
        highlight: false,
        badge: null,
        perks: [
            'Tout le plan Pro',
            'Accès multi-utilisateurs',
            'API & intégrations',
            'Fabricants partenaires dédiés',
            'Onboarding personnalisé',
            'SLA garanti',
        ],
        cta: 'Contacter l�dt�équipe',
        ctaPath: '/auth',
    },
];

const PARTNERS = [
    { name: 'Adidas', text: 'ADIDAS' },
    { name: 'H&M', text: 'H&M' },
    { name: 'Zara', text: 'ZARA' },
    { name: 'Supreme', text: 'SUPREME' },
    { name: 'Lacoste', text: 'LACOSTE' },
    { name: 'A.P.C.', text: 'A.P.C.' },
];

const TESTIMONIALS = [
    {
        name: 'Sofia R.',
        role: 'Creative Director, Maison Sélène',
        avatar: 'https://i.pravatar.cc/64?img=47',
        quote: '« ClothLab a complètement transformé notre processus. L�dt�éditeur 3D est intuitif et les rendus sont époustouflants. »',
        stars: 5,
    },
    {
        name: 'Karim B.',
        role: 'Fondateur, Urbàn Studio',
        avatar: 'https://i.pravatar.cc/64?img=12',
        quote: '« En 48h, j�dt�avais mes premiers prototypes entre les mains. La qualité de production est au rendez-vous. »',
        stars: 5,
    },
    {
        name: 'Léa M.',
        role: 'Styliste indépendante',
        avatar: 'https://i.pravatar.cc/64?img=32',
        quote: '« La bibliothèque de décals et les options sur-mesure m�dt�ont permis de proposer des pièces vraiment uniques. »',
        stars: 5,
    },
    {
        name: 'Nassim T.',
        role: 'Manager, CollectiveDrop',
        avatar: 'https://i.pravatar.cc/64?img=68',
        quote: '« On gère des drops de 500 pièces par mois via ClothLab. Le tableau de bord fabricant est exactement ce qu�dt�il nous fallait. »',
        stars: 5,
    },
];

const features = [
    {
        icon: '🎨',
        title: 'Éditeur Visuel',
        description: 'Un éditeur 3D en temps réel pour la création de vêtements haut de gamme. Affinez chaque détail, de la texture à la typographie.',
        bg: '#F9E8E8',
    },
    {
        icon: '📦',
        title: 'Bibliothèque d\'Assets',
        description: 'Mockups, motifs et graphiques imprimables de qualité professionnelle pour construire des propositions de design premium.',
        bg: '#8B7355',
    },
    {
        icon: '⚡',
        title: 'Workflow Intégré',
        description: 'L\'outil sur-mesure connecte la production directement. Du fichier au vêtement fini, chaque étape s\'enchaîne sans friction.',
        bg: '#2D4A3E',
    },
];

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-left">
                    <div className="hero-badge">✦ AI FASHION GENERATOR V2.0</div>
                    <h1 className="hero-title split-heading">
                        <span className="sh-italic">Design the Future</span>
                        <span className="sh-bold">of Fashion.</span>
                    </h1>
                    <p className="hero-desc">
                        Empowering high-end fashion creators with precision tools for production-ready custom apparel.
                    </p>
                    <div className="hero-actions">
                        <Link to="/editor" className="btn-teal">Start Designing Now</Link>
                        <Link to="/catalog" className="btn-outline">Learn More →</Link>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="hero-model-img-container">
                        <img src="/hero_model.png" alt="Fashion Model" className="hero-model-img" />
                        <div className="hero-badge-stat">10k+ <span>Active Creators</span></div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar">
                {stats.map((s) => (
                    <div key={s.label} className="stat-item">
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
            </section>

            {/* Partners / Trust Bar �dt� auto-scrolling marquee */}
            <div className="partners-bar">
                <p className="partners-label">Ils nous font confiance</p>
                <div className="partners-track-wrapper">
                    <div className="partners-track">
                        {[...PARTNERS, ...PARTNERS].map((p, i) => (
                            <span key={`${p.name}-${i}`} className="partner-name">{p.text}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature Cards Section */}
            <RevealSection>
            <section className="features-section">
                <p className="section-eyebrow">THE ULTIMATE CREATIVE TOOLKIT</p>
                <h2 className="features-heading split-heading">
                    <span className="sh-italic">Engineered for Excellence,</span>
                    <span className="sh-bold">Crafted for Style.</span>
                </h2>
                <div className="features-grid">
                        {features.map((f) => (
                        <div key={f.title} className="feature-card">
                            <div className="feature-img" style={{ backgroundColor: f.bg }}>
                                {f.title === 'Éditeur Visuel' && <img src="/feature_studio.png" alt="Éditeur Visuel" />}
                                {f.title === 'Bibliothèque d\'Assets' && <img src="https://images.unsplash.com/photo-1614179818511-5e65ef3fae5f?w=600&q=90&fit=crop" alt="Bibliothèque d'Assets" />}
                                {f.title === 'Workflow Intégré' && <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=90&fit=crop" alt="Workflow Intégré" />}
                            </div>
                            <div className="feature-card-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            </RevealSection>

            {/* How It Works Section */}
            <RevealSection from="bottom">
            <section className="how-section">
                <p className="section-eyebrow">PROCESSUS SIMPLE</p>
                <h2 className="how-heading split-heading">
                    <span className="sh-italic">De l'idée au vêtement</span>
                    <span className="sh-bold-light">en 3 étapes.</span>
                </h2>
                <div className="how-steps">
                    {HOW_STEPS.map((step, i) => (
                        <div key={step.num} className="how-step">
                            <div className="how-step-num">{step.num}</div>
                            <div className="how-step-icon">{step.icon}</div>
                            <h3 className="how-step-title">{step.title}</h3>
                            <p className="how-step-desc">{step.desc}</p>
                            {i < HOW_STEPS.length - 1 && <div className="how-step-arrow">→</div>}
                        </div>
                    ))}
                </div>
            </section>
            </RevealSection>

            {/* Pricing Section */}
            <RevealSection>
            <section id="pricing" className="pricing-section">
                <p className="section-eyebrow">TARIFS</p>
                <h2 className="pricing-heading split-heading">
                    <span className="sh-italic">Simple, transparent,</span>
                    <span className="sh-bold">sans surprise.</span>
                </h2>
                <div className="pricing-grid">
                    {PRICING.map((plan) => (
                        <div key={plan.tier} className={`pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''}`}>
                            {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
                            <div className="pricing-tier">{plan.tier}</div>
                            <div className="pricing-price">
                                {plan.price}<span className="pricing-period">{plan.period}</span>
                            </div>
                            <ul className="pricing-perks">
                                {plan.perks.map(p => (
                                    <li key={p}><span className="perk-check">✓</span> {p}</li>
                                ))}
                            </ul>
                            <Link
                                to={plan.ctaPath}
                                className={plan.highlight ? 'btn-teal' : 'btn-outline-dark'}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
            </RevealSection>

            {/* Quality Block */}
            <RevealSection from="left">
            <section className="quality-section">
                <div className="quality-img">
                    <img src="/quality_fabric.png" alt="Qualité textile" />
                </div>
                <div className="quality-content">
                    <h2 className="split-heading">
                        <span className="sh-italic">Une qualité qui parle</span>
                        <span className="sh-bold-light">d'elle-même.</span>
                    </h2>
                    <p>Nous ne créons pas seulement des looks, nous donnons accès à des matériaux haut de gamme. Chaque design produit valide la qualité, chaque produit est fait main, prêt pour la production.</p>
                    <ul className="quality-list">
                        <li>✓ Coton Biologique &amp; Tissus Techniques</li>
                        <li>✓ Propre, Fabriqué &amp; Prêt pour la Sérigraphie</li>
                        <li>✓ Expédition Mondiale avec Options Sur-Mesure</li>
                    </ul>
                    <Link to="/editor" className="btn-outline-dark">Commencer</Link>
                </div>
            </section>
            </RevealSection>

            {/* Testimonials */}
            <RevealSection>
            <section className="testimonials-section">
                <p className="section-eyebrow">TÉMOIGNAGES</p>
                <h2 className="testimonials-heading">
                    <span className="th-line-accent">Ce que disent</span>
                    <span className="th-line-main">nos créateurs.</span>
                </h2>

                {/* Textile image strip */}
                <div className="testimonials-textile-strip">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=90&fit=crop&crop=center" alt="tissu" />
                    <img src="https://images.unsplash.com/photo-1614179818511-5e65ef3fae5f?w=500&q=90&fit=crop&crop=center" alt="tissu" />
                    <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=90&fit=crop&crop=center" alt="tissu" />
                    <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=90&fit=crop&crop=center" alt="tissu" />
                    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&q=90&fit=crop&crop=center" alt="tissu" />
                </div>
                <div className="testimonials-grid">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.name} className="testimonial-card">
                            <div className="testimonial-stars">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <span key={i}>&#9733;</span>
                                ))}
                            </div>
                            <p className="testimonial-quote">{t.quote}</p>
                            <div className="testimonial-author">
                                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                                <div>
                                    <span className="testimonial-name">{t.name}</span>
                                    <span className="testimonial-role">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            </RevealSection>

            {/* CTA Banner */}
            <section className="cta-banner">
                <h2 className="split-heading">
                    <span className="sh-italic">Prêt à transformer</span>
                    <span className="sh-bold-light">votre workflow de design ?</span>
                </h2>
                <p>Rejoignez la prochaine génération de créateurs de mode. Développez votre marque, concevez vos collections et faites évoluer votre entreprise avec ClothLab.</p>
                <div className="cta-actions">
                    <Link to="/editor" className="btn-teal">Essai Gratuit</Link>
                    <Link to="/manufacturer" className="btn-outline-white">Contacter les Ventes</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
