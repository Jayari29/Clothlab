import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight, Package, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import './Order.css';

const DELIVERY_OPTIONS = [
    { id: 'standard', label: 'Standard', delay: '5–7 jours ouvrés', price: '€4.90' },
    { id: 'express', label: 'Express',  delay: '2–3 jours ouvrés', price: '€9.90' },
    { id: 'same_day', label: '24h',     delay: 'Livraison le lendemain', price: '€14.90' },
];

const STEPS = [
    { id: 1, label: 'Résumé',   Icon: Package    },
    { id: 2, label: 'Livraison', Icon: MapPin    },
    { id: 3, label: 'Paiement', Icon: CreditCard },
    { id: 4, label: 'Confirmé', Icon: CheckCircle },
];

const Order = () => {
    const [step, setStep] = useState(1);
    const [delivery, setDelivery] = useState('express');
    const [orderNum] = useState(() => Math.floor(10000 + Math.random() * 90000));
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '',
        address: '', city: '', zip: '', country: 'France',
        cardName: '', cardNumber: '', expiry: '', cvc: '',
    });

    const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [k]: e.target.value }));

    const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === delivery)!;
    const itemPrice = 59;
    const deliveryPrice = parseFloat(selectedDelivery.price.replace('€', ''));
    const total = (itemPrice + deliveryPrice).toFixed(2);

    const next = () => setStep(s => Math.min(s + 1, 4));
    const back = () => setStep(s => Math.max(s - 1, 1));

    return (
        <div className="order-root">
            {/* Header */}
            <header className="order-header">
                <Link to="/editor" className="order-back-link">
                    <ArrowLeft size={18} /> Retour à l'éditeur
                </Link>
                <img src="/SVG/Asset 2.svg" alt="ClothLab" className="order-logo" />
                <span />
            </header>

            <div className="order-body">
                {/* Stepper */}
                <div className="order-stepper">
                    {STEPS.map((s, i) => (
                        <div key={s.id} className={`order-step ${step >= s.id ? 'step-done' : ''} ${step === s.id ? 'step-active' : ''}`}>
                            <div className="step-circle">
                                {step > s.id ? <CheckCircle size={16} /> : <s.Icon size={16} />}
                            </div>
                            <span className="step-label">{s.label}</span>
                            {i < STEPS.length - 1 && <div className="step-connector" />}
                        </div>
                    ))}
                </div>

                <div className="order-content">
                    {/* ── STEP 1: Summary ── */}
                    {step === 1 && (
                        <div className="order-card">
                            <h2 className="order-card-title">Résumé de la commande</h2>
                            <div className="order-summary-item">
                                <div className="summary-preview" style={{ background: '#2B3580' }}>
                                    <span style={{ fontSize: '2.5rem' }}>👕</span>
                                </div>
                                <div className="summary-details">
                                    <span className="summary-name">Hoodie Classique</span>
                                    <span className="summary-meta">Taille M · Regular · Heavy Cotton</span>
                                    <span className="summary-meta">Couleur #F6F8F8 · Décal Logo Poitrine</span>
                                    <span className="summary-price">€{itemPrice}.00</span>
                                </div>
                                <div className="summary-qty">
                                    <span className="qty-label">Qté</span>
                                    <span className="qty-val">1</span>
                                </div>
                            </div>

                            <div className="order-delivery-section">
                                <h3 className="order-section-label">Mode de livraison</h3>
                                <div className="delivery-options">
                                    {DELIVERY_OPTIONS.map(opt => (
                                        <button
                                            key={opt.id}
                                            className={`delivery-option ${delivery === opt.id ? 'delivery-active' : ''}`}
                                            onClick={() => setDelivery(opt.id)}
                                        >
                                            <div className="delivery-radio">
                                                <span>{delivery === opt.id ? '●' : '○'}</span>
                                            </div>
                                            <div className="delivery-info">
                                                <span className="delivery-label">{opt.label}</span>
                                                <span className="delivery-delay">{opt.delay}</span>
                                            </div>
                                            <span className="delivery-price">{opt.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="order-total-row">
                                <span>Sous-total</span><span>€{itemPrice}.00</span>
                            </div>
                            <div className="order-total-row">
                                <span>Livraison ({selectedDelivery.label})</span><span>{selectedDelivery.price}</span>
                            </div>
                            <div className="order-total-row order-grand-total">
                                <span>Total</span><span>€{total}</span>
                            </div>

                            <button className="order-next-btn" onClick={next}>
                                Continuer vers la livraison <ChevronRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* ── STEP 2: Delivery ── */}
                    {step === 2 && (
                        <div className="order-card">
                            <h2 className="order-card-title">Adresse de livraison</h2>
                            <div className="order-form-grid">
                                <div className="form-group">
                                    <label>Prénom</label>
                                    <input value={form.firstName} onChange={handle('firstName')} placeholder="Sofia" />
                                </div>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input value={form.lastName} onChange={handle('lastName')} placeholder="Richard" />
                                </div>
                                <div className="form-group form-full">
                                    <label>Email</label>
                                    <input type="email" value={form.email} onChange={handle('email')} placeholder="sofia@example.com" />
                                </div>
                                <div className="form-group form-full">
                                    <label>Adresse</label>
                                    <input value={form.address} onChange={handle('address')} placeholder="12 rue de la Mode" />
                                </div>
                                <div className="form-group">
                                    <label>Ville</label>
                                    <input value={form.city} onChange={handle('city')} placeholder="Paris" />
                                </div>
                                <div className="form-group">
                                    <label>Code postal</label>
                                    <input value={form.zip} onChange={handle('zip')} placeholder="75001" />
                                </div>
                                <div className="form-group form-full">
                                    <label>Pays</label>
                                    <select value={form.country} onChange={handle('country')}>
                                        <option>France</option>
                                        <option>Belgique</option>
                                        <option>Suisse</option>
                                        <option>Canada</option>
                                        <option>Maroc</option>
                                        <option>Algérie</option>
                                        <option>Tunisie</option>
                                    </select>
                                </div>
                            </div>
                            <div className="order-nav-row">
                                <button className="order-back-btn" onClick={back}><ArrowLeft size={15} /> Retour</button>
                                <button className="order-next-btn" onClick={next}>Continuer vers le paiement <ChevronRight size={16} /></button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 3: Payment ── */}
                    {step === 3 && (
                        <div className="order-card">
                            <h2 className="order-card-title">Informations de paiement</h2>
                            <div className="card-brands">
                                <span className="card-brand visa">VISA</span>
                                <span className="card-brand mc">MC</span>
                                <span className="card-brand paypal">PP</span>
                            </div>
                            <div className="order-form-grid">
                                <div className="form-group form-full">
                                    <label>Nom sur la carte</label>
                                    <input value={form.cardName} onChange={handle('cardName')} placeholder="SOFIA RICHARD" />
                                </div>
                                <div className="form-group form-full">
                                    <label>Numéro de carte</label>
                                    <input value={form.cardNumber} onChange={handle('cardNumber')} placeholder="4242 4242 4242 4242" maxLength={19} />
                                </div>
                                <div className="form-group">
                                    <label>Date d'expiration</label>
                                    <input value={form.expiry} onChange={handle('expiry')} placeholder="MM/AA" maxLength={5} />
                                </div>
                                <div className="form-group">
                                    <label>CVC</label>
                                    <input value={form.cvc} onChange={handle('cvc')} placeholder="123" maxLength={3} />
                                </div>
                            </div>
                            <div className="order-secure-note">
                                🔒 Paiement sécurisé SSL 256-bit — Vos données sont protégées.
                            </div>
                            <div className="order-total-row order-grand-total" style={{ marginTop: '1.25rem' }}>
                                <span>Total à payer</span><span>€{total}</span>
                            </div>
                            <div className="order-nav-row">
                                <button className="order-back-btn" onClick={back}><ArrowLeft size={15} /> Retour</button>
                                <button className="order-next-btn" onClick={next}>
                                    Confirmer la commande <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 4: Confirmation ── */}
                    {step === 4 && (
                        <div className="order-card order-confirm-card">
                            <div className="confirm-icon">
                                <CheckCircle size={56} />
                            </div>
                            <h2 className="confirm-title">Commande confirmée !</h2>
                            <p className="confirm-sub">
                                Votre création est en route vers la production.<br />
                                Un email de confirmation a été envoyé à <strong>{form.email || 'votre adresse'}</strong>.
                            </p>
                            <div className="confirm-order-num">
                                Numéro de commande : <strong>#CL-{orderNum}</strong>
                            </div>
                            <div className="confirm-delivery-info">
                                <Package size={16} />
                                Livraison {selectedDelivery.label} — {selectedDelivery.delay}
                            </div>
                            <div className="confirm-actions">
                                <Link to="/consumer" className="order-next-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                                    Voir mes commandes
                                </Link>
                                <Link to="/editor" className="order-back-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                                    Créer un autre design
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Sticky mini-summary sidebar */}
                    {step < 4 && (
                        <aside className="order-sidebar">
                            <h3 className="sidebar-title">Votre commande</h3>
                            <div className="sidebar-item">
                                <div className="sidebar-thumb" style={{ background: '#2B3580' }}>👕</div>
                                <div>
                                    <p className="sidebar-item-name">Hoodie Classique</p>
                                    <p className="sidebar-item-meta">Taille M · Regular</p>
                                </div>
                                <span className="sidebar-item-price">€59</span>
                            </div>
                            <div className="sidebar-divider" />
                            <div className="sidebar-line"><span>Livraison</span><span>{selectedDelivery.price}</span></div>
                            <div className="sidebar-line sidebar-total-line"><span>Total</span><span>€{total}</span></div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;
