import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Factory,
  Palette,
  Play,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { RevealSection } from '../components/RevealSection';
import { images } from '../config/images';
import './Home.css';

type Feature = {
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
  accent: string;
  icon: LucideIcon;
};

type Step = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

const stats = [
  { value: '12k+', label: 'designers active' },
  { value: '180+', label: 'materials ready' },
  { value: '48h', label: 'sample turnaround' },
  { value: '96%', label: 'production approval' },
];

const partners = ['ADIDAS', 'ZARA', 'LACOSTE', 'A.P.C.', 'SUPREME', 'COS', 'H&M'];

const features: Feature[] = [
  {
    title: 'Live design studio',
    description:
      'Shape silhouettes, color stories, and graphics in one cinematic workspace built for fast iteration.',
    image: images.features.studio,
    fallbackImage: images.features.studioFallback,
    accent: 'from-teal',
    icon: Palette,
  },
  {
    title: 'Asset-rich library',
    description:
      'Pull from premium mockups, textile references, and print layers without breaking creative flow.',
    image: images.features.assets,
    fallbackImage: images.features.assetsFallback,
    accent: 'from-sand',
    icon: Boxes,
  },
  {
    title: 'Production handoff',
    description:
      'Move from concept to manufacturer-ready specs with fewer emails, cleaner approvals, and tighter timing.',
    image: images.features.workflow,
    fallbackImage: images.features.workflowFallback,
    accent: 'from-ink',
    icon: Factory,
  },
];

const steps: Step[] = [
  {
    id: '01',
    title: 'Build the concept',
    description:
      'Start from a garment base, then explore color, trims, fabric behavior, and graphics in real time.',
    icon: Wand2,
  },
  {
    id: '02',
    title: 'Review every detail',
    description:
      'Inspect fit, texture, and artwork placement with a presentation-ready view your team can react to fast.',
    icon: ScanSearch,
  },
  {
    id: '03',
    title: 'Ship to production',
    description:
      'Send clean specs to a manufacturer pipeline designed for sampling, approvals, and scaled delivery.',
    icon: Zap,
  },
];

const pricing = [
  {
    tier: 'Launch',
    price: 'Free',
    detail: 'for early exploration',
    highlight: false,
    perks: ['3 active concepts', 'Core mockup set', 'PNG exports', 'Community support'],
  },
  {
    tier: 'Studio',
    price: '29 DT',
    detail: 'per seat / month',
    highlight: true,
    perks: ['Unlimited concepts', 'Premium assets', 'Spec-ready exports', 'Priority support'],
  },
  {
    tier: 'Scale',
    price: '79 DT',
    detail: 'for growing teams',
    highlight: false,
    perks: ['Multi-user access', 'Manufacturer workflows', 'Team review tools', 'Dedicated onboarding'],
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Sofia R.',
    role: 'Creative Director, Maison Selene',
    quote:
      'ClothLab helped us go from moodboard to approved sample with a level of clarity our old workflow never had.',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    name: 'Karim B.',
    role: 'Founder, Urban Studio',
    quote:
      'The motion, material previews, and production handoff make the platform feel closer to a true design operating system.',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Lea M.',
    role: 'Independent Stylist',
    quote:
      'Clients understand ideas faster because the interface feels premium and the previews feel alive.',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
];

const Home = () => {
  return (
    <div className="home home-v2">
      <section className="hero-v2">
        <div className="hero-v2__bg">
          <div className="hero-v2__orb hero-v2__orb--one" />
          <div className="hero-v2__orb hero-v2__orb--two" />
          <div className="hero-v2__grid" />
        </div>

        <div className="hero-v2__content">
          <div className="hero-v2__copy">
            <div className="hero-v2__eyebrow">
              <Sparkles size={14} />
              Animated fashion workspace
            </div>

            <h1 className="hero-v2__title">
              More than a product page.
              <span> A motion-first fashion platform.</span>
            </h1>

            <p className="hero-v2__description">
              Design, review, and launch garments in a UI that feels premium, fast, and alive. ClothLab now
              pushes stronger visual depth, richer animation, and a more editorial presentation.
            </p>

            <div className="hero-v2__actions">
              <Link to="/editor" className="btn-teal hero-v2__primary">
                Open the studio
                <ArrowRight size={16} />
              </Link>
              <Link to="/catalog" className="hero-v2__secondary">
                <Play size={16} />
                Explore the catalog
              </Link>
            </div>

            <div className="hero-v2__signals">
              <div className="signal-card">
                <span className="signal-card__label">Design velocity</span>
                <strong>Realtime edits</strong>
                <p>Faster iteration loops with visual feedback that feels immediate.</p>
              </div>
              <div className="signal-card">
                <span className="signal-card__label">Production confidence</span>
                <strong>Spec-ready output</strong>
                <p>Cleaner transition from creative direction into manufacturing execution.</p>
              </div>
            </div>
          </div>

          <div className="hero-v2__visual">
            <div className="hero-frame">
              <div className="hero-frame__toolbar">
                <span />
                <span />
                <span />
              </div>
              <img src={images.hero.model} alt="ClothLab fashion preview" className="hero-frame__image" />

              <div className="hero-float hero-float--top">
                <div className="hero-float__icon">
                  <BadgeCheck size={16} />
                </div>
                <div>
                  <strong>Collection approved</strong>
                  <span>Ready for sample pass</span>
                </div>
              </div>

              <div className="hero-float hero-float--bottom">
                <div className="hero-float__metric">24</div>
                <div>
                  <strong>Active looks</strong>
                  <span>in current drop</span>
                </div>
              </div>
            </div>

            <div className="hero-side-panel">
              <div className="hero-side-panel__header">
                <span className="hero-side-panel__pill">Live style board</span>
                <span className="hero-side-panel__status">syncing</span>
              </div>

              <div className="hero-side-panel__items">
                <div className="style-row">
                  <span>Outerwear capsule</span>
                  <b>84%</b>
                </div>
                <div className="style-row">
                  <span>Textile palette</span>
                  <b>12 swatches</b>
                </div>
                <div className="style-row">
                  <span>Factory match</span>
                  <b>3 vendors</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-band">
          {stats.map((item) => (
            <div key={item.label} className="stats-band__item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="partners-marquee">
        <span className="partners-marquee__label">Trusted by modern fashion teams</span>
        <div className="partners-marquee__track">
          {[...partners, ...partners].map((partner, index) => (
            <span key={`${partner}-${index}`}>{partner}</span>
          ))}
        </div>
      </div>

      <RevealSection>
        <section className="feature-showcase">
          <div className="section-head">
            <p>Intentional UI direction</p>
            <h2>Sharper composition. Better rhythm. More motion where it matters.</h2>
          </div>

          <div className="feature-showcase__grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className={`feature-spotlight ${feature.accent}`}>
                  <div className="feature-spotlight__media">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      onError={(event) => {
                        const fallbackImage = feature.fallbackImage ?? images.placeholder.product;

                        if (event.currentTarget.dataset.fallbackApplied === 'true') {
                          return;
                        }

                        event.currentTarget.dataset.fallbackApplied = 'true';
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  </div>
                  <div className="feature-spotlight__content">
                    <div className="feature-spotlight__icon">
                      <Icon size={18} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </RevealSection>

      <RevealSection from="bottom">
        <section className="process-section">
          <div className="process-shell">
            <div className="section-head section-head--light process-head">
              <p>Creative flow</p>
              <h2>A clearer path from concept energy to production confidence.</h2>
              <span className="process-head__line" />
            </div>

            <div className="process-aside">
              <div className="process-aside__overview">
                <div className="process-aside__pill">
                  <Sparkles size={14} />
                  Studio pipeline
                </div>
                <p>
                  The workflow is built to keep design momentum high while making sampling, approvals, and
                  manufacturer handoff feel much more structured.
                </p>
              </div>

              <div className="process-aside__stats">
                <div>
                  <strong>3 stages</strong>
                  <span>from concept to shipment</span>
                </div>
                <div>
                  <strong>Realtime</strong>
                  <span>feedback across each step</span>
                </div>
                <div>
                  <strong>Spec-ready</strong>
                  <span>handoff for sampling and approvals</span>
                </div>
              </div>
            </div>
          </div>

          <div className="process-track" aria-hidden="true">
            {steps.map((step) => (
              <div key={step.id} className="process-track__item">
                <span>{step.id}</span>
              </div>
            ))}
          </div>

          <div className="process-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.id} className={`process-card process-card--${index + 1}`}>
                  <div className="process-card__top">
                    <div className="process-card__meta">
                      <span className="process-card__index">{step.id}</span>
                      <span className="process-card__eyebrow">Stage {step.id}</span>
                    </div>
                    <div className="process-card__icon">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="process-card__footer">
                    <span>{index === 0 ? 'Creative setup' : index === 1 ? 'Team review' : 'Factory handoff'}</span>
                    <ArrowRight size={15} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </RevealSection>

      <RevealSection from="left">
        <section className="quality-section-v2">
          <div className="quality-section-v2__media">
            <img src={images.quality.fabric} alt="Premium textile material" />
          </div>

          <div className="quality-section-v2__content">
            <span className="quality-section-v2__eyebrow">Why it feels better</span>
            <h2>We shifted the UI toward a premium studio experience instead of a generic SaaS surface.</h2>
            <p>
              Stronger typography contrast, layered backgrounds, floating interface cues, and tighter section pacing
              make the product feel more current and more crafted.
            </p>

            <div className="quality-section-v2__list">
              <div>
                <ShieldCheck size={18} />
                <span>More depth with restrained gradients and glass treatments</span>
              </div>
              <div>
                <Sparkles size={18} />
                <span>Animation focused on entrances, hover states, and ambient motion</span>
              </div>
              <div>
                <Factory size={18} />
                <span>Still aligned with the existing ClothLab routes and product structure</span>
              </div>
            </div>

            <Link to="/editor" className="btn-outline-dark">
              Start designing
            </Link>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="pricing" className="pricing-section-v2">
          <div className="section-head">
            <p>Flexible plans</p>
            <h2>Choose the setup that matches your studio stage.</h2>
          </div>

          <div className="pricing-grid-v2">
            {pricing.map((plan) => (
              <article key={plan.tier} className={`pricing-card-v2 ${plan.highlight ? 'is-highlighted' : ''}`}>
                {plan.highlight && <span className="pricing-card-v2__badge">Most popular</span>}
                <h3>{plan.tier}</h3>
                <div className="pricing-card-v2__price">{plan.price}</div>
                <p className="pricing-card-v2__detail">{plan.detail}</p>
                <div className="pricing-card-v2__perks">
                  {plan.perks.map((perk) => (
                    <div key={perk}>
                      <BadgeCheck size={16} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth" className={plan.highlight ? 'btn-teal' : 'btn-outline-dark'}>
                  Get started
                </Link>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section className="testimonials-section-v2">
          <div className="section-head">
            <p>What teams notice</p>
            <h2>The updated visual system makes the product feel more confident on first contact.</h2>
          </div>

          <div className="testimonials-section-v2__grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card-v2">
                <div className="testimonial-card-v2__stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${testimonial.name}-${index}`} size={14} fill="currentColor" />
                  ))}
                </div>
                <p>{testimonial.quote}</p>
                <div className="testimonial-card-v2__author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      <section className="cta-banner-v2">
        <div className="cta-banner-v2__content">
          <span>Ready for a more innovative surface?</span>
          <h2>Turn the ClothLab UI into something people remember after the first scroll.</h2>
          <div className="cta-banner-v2__actions">
            <Link to="/editor" className="btn-teal">
              Launch the editor
            </Link>
            <Link to="/manufacturer" className="btn-outline-white">
              View manufacturer flow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
