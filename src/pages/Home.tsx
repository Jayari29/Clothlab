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
        desc: 'Couleur, matière, taille, décals, coupe… chaque détail est ajustable en temps réel.',
        icon: '🎨',
    },
    {
        num: '03',
        title: 'Commandez en production',
        desc: 'Envoyez directement à un fabricant partenaire et recevez votre création livrée en 24h.',
        icon: '🚀',
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
        cta: 'Contacter l’équipe',
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
        quote: '« ClothLab a complètement transformé notre processus. L’éditeur 3D est intuitif et les rendus sont époustouflants. »',
        stars: 5,
    },
    {
        name: 'Karim B.',
        role: 'Fondateur, Urbàn Studio',
        avatar: 'https://i.pravatar.cc/64?img=12',
        quote: '« En 48h, j’avais mes premiers prototypes entre les mains. La qualité de production est au rendez-vous. »',
        stars: 5,
    },
    {
        name: 'Léa M.',
        role: 'Styliste indépendante',
        avatar: 'https://i.pravatar.cc/64?img=32',
        quote: '« La bibliothèque de décals et les options sur-mesure m’ont permis de proposer des pièces vraiment uniques. »',
        stars: 5,
    },
    {
        name: 'Nassim T.',
        role: 'Manager, CollectiveDrop',
        avatar: 'https://i.pravatar.cc/64?img=68',
        quote: '« On gère des drops de 500 pièces par mois via ClothLab. Le tableau de bord fabricant est exactement ce qu’il nous fallait. »',
        stars: 5,
    },
];

const features = [
    {
        icon: '🎨',
        title: 'Visual Editor',
        description: 'A real-time 3D editor designed for premium garment creation. Fine-tune every detail, from texture to typography.',
        bg: '#F9E8E8',
    },
    {
        icon: '📦',
        title: 'Asset Library',
        description: 'Curated Brand-quality mockups, patterns and printable graphics to build professional design proposals.',
        bg: '#8B7355',
    },
    {
        icon: '⚡',
        title: 'Seamless Workflow',
        description: 'Custom Garment tool connects production directly. From file to finished garment, every step runs without friction.',
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
                    <h1 className="hero-title">
                        Design the <span className="italic-accent">Future</span> of Fashion
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
                        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80&fit=crop" alt="Fashion Model" className="hero-model-img" />
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

            {/* Partners / Trust Bar */}
            <RevealSection className="partners-bar">
                <p className="partners-label">Ils nous font confiance</p>
                <div className="partners-logos">
                    {PARTNERS.map(p => (
                        <span key={p.name} className="partner-name">{p.text}</span>
                    ))}
                </div>
            </RevealSection>

            {/* Feature Cards Section */}
            <RevealSection>
            <section className="features-section">
                <p className="section-eyebrow">THE ULTIMATE CREATIVE TOOLKIT</p>
                <h2 className="features-heading">Engineered for Excellence,<br />Crafted for Style.</h2>
                <div className="features-grid">
                    {features.map((f) => (
                        <div key={f.title} className="feature-card">
                            <div className="feature-img" style={{ backgroundColor: f.bg }}>
                                {f.title === 'Visual Editor' && <img src="https://images.unsplash.com/photo-1594938298603-c8148c4b4571?w=260&q=80&fit=crop" alt="Visual Editor" />}
                                {f.title === 'Asset Library' && <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=260&q=80&fit=crop" alt="Asset Library" />}
                                {f.title === 'Seamless Workflow' && <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=260&q=80&fit=crop" alt="Seamless Workflow" />}
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
                <h2 className="how-heading">De l’idée au vêtement<br />en 3 étapes.</h2>
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
                <h2 className="pricing-heading">Simple, transparent,<br />sans surprise.</h2>
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
                    <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80&fit=crop" alt="Quality hoodie" />
                </div>
                <div className="quality-content">
                    <h2>Quality that <em>speaks</em> for itself.</h2>
                    <p>We don't just create looks, we provide access to high-end materials. Every design produced validates the quality, every product is a handmade, production-run material.</p>
                    <ul className="quality-list">
                        <li>✓ Organic Cotton &amp; Technical Fabrics</li>
                        <li>✓ Clean, Manufactured &amp; Screen-Print Ready</li>
                        <li>✓ Global Shipping with Made-to-order Options</li>
                    </ul>
                    <Link to="/editor" className="btn-outline-dark">Start Now</Link>
                </div>
            </section>
            </RevealSection>

            {/* Testimonials */}
            <RevealSection>
            <section className="testimonials-section">
                <p className="section-eyebrow">TÉMOIGNAGES</p>
                <h2 className="testimonials-heading">Ce que disent<br />nos créateurs.</h2>
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
                <h2>Ready to transform your design workflow?</h2>
                <p>Join the next generation of fashion creators. Build your brand, design your collections, and scale your business with ClothLab.</p>
                <div className="cta-actions">
                    <Link to="/editor" className="btn-teal">Start Your Free Trial</Link>
                    <Link to="/manufacturer" className="btn-outline-white">Contact Sales</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
