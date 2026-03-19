import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Layers, ShoppingBag, Heart, Bell, TrendingUp,
    Plus, ArrowRight, Eye, Edit3, Package,
    Star, Zap, ChevronRight, BarChart2,
} from 'lucide-react';
import './ConsumerDashboard.css';

const RECENT_DESIGNS = [
    { id: 1, name: 'Urban Hoodie', status: 'Publié', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=90&fit=crop' },
    { id: 2, name: 'Tee Oversize', status: 'Brouillon', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=90&fit=crop' },
    { id: 3, name: 'Bomber Black', status: 'Publié', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=90&fit=crop' },
];

const RECENT_ORDERS = [
    { id: '#CL-2891', product: 'Hoodie Minimaliste', date: '05 Mars 2026', status: 'Livré', amount: '€59', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&q=80&fit=crop' },
    { id: '#CL-2745', product: 'Tee Oversize Blanc', date: '25 Fév 2026', status: 'En transit', amount: '€29', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80&fit=crop' },
    { id: '#CL-2612', product: 'Bomber Urban', date: '18 Fév 2026', status: 'Livré', amount: '€99', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=80&q=80&fit=crop' },
];

const RECOMMENDED = [
    { name: 'Cargo Street', price: '€79', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=280&q=80&fit=crop' },
    { name: 'Veste Oversize', price: '€89', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=280&q=80&fit=crop' },
    { name: 'T-Shirt Graphique', price: '€35', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=280&q=80&fit=crop' },
    { name: 'Hoodie Earth Tone', price: '€65', img: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=280&q=80&fit=crop' },
];

const statusColor: Record<string, string> = {
    Publié: '#10B981',
    Brouillon: '#9CA3AF',
    'En révision': '#F59E0B',
    Livré: '#10B981',
    'En transit': '#3B82F6',
};

const ConsumerDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <div className="consumer-page">
            {/* Sidebar */}
            <aside className="consumer-sidebar">
                <div className="sidebar-user">
                    <img src="https://i.pravatar.cc/48?img=47" alt="avatar" className="sidebar-avatar" />
                    <div>
                        <div className="sidebar-name">Mahdi Benali</div>
                        <div className="sidebar-role">Créateur Premium</div>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    {[
                        { id: 'overview', icon: <BarChart2 size={17} />, label: "Vue d'ensemble" },
                        { id: 'designs', icon: <Layers size={17} />, label: 'Mes Créations' },
                        { id: 'orders', icon: <ShoppingBag size={17} />, label: 'Commandes' },
                        { id: 'wishlist', icon: <Heart size={17} />, label: 'Favoris' },
                        { id: 'notifications', icon: <Bell size={17} />, label: 'Notifications' },
                    ].map(item => (
                        <button
                            key={item.id}
                            className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>
                <Link to="/editor" className="sidebar-cta">
                    <Plus size={16} /> Nouveau Design
                </Link>
            </aside>

            {/* Main Content */}
            <div className="consumer-main">
                <div className="consumer-header">
                    <div>
                        <h1 className="split-heading consumer-welcome-heading">
                            <span className="sh-italic">Bonjour,</span>
                            <span className="sh-bold">Mahdi 👋</span>
                        </h1>
                        <p>Voici un aperçu de votre activité sur ClothLab.</p>
                    </div>
                    <Link to="/editor" className="btn-new-design-dash">
                        <Plus size={15} /> Nouveau Design
                    </Link>
                </div>

                {/* �dt�dt OVERVIEW �dt�dt */}
                {activeSection === 'overview' && (<>
                {/* Stats */}
                <div className="consumer-stats">
                    {[
                        { label: 'Créations totales', value: '24', icon: <Layers size={20} />, color: '#2B3580', delta: '+3 ce mois' },
                        { label: 'Commandes actives', value: '3', icon: <ShoppingBag size={20} />, color: '#00A8A8', delta: '2 en transit' },
                        { label: 'Favoris', value: '47', icon: <Heart size={20} />, color: '#EF4444', delta: '+8 cette semaine' },
                        { label: 'Vues totales', value: '3.2k', icon: <TrendingUp size={20} />, color: '#10B981', delta: '+15% ce mois' },
                    ].map(s => (
                        <div key={s.label} className="dash-stat-card">
                            <div className="dash-stat-icon" style={{ color: s.color, background: s.color + '18' }}>{s.icon}</div>
                            <div className="dash-stat-value">{s.value}</div>
                            <div className="dash-stat-label">{s.label}</div>
                            <div className="dash-stat-delta">{s.delta}</div>
                        </div>
                    ))}
                </div>

                {/* Two-column grid */}
                <div className="consumer-grid">
                    <section className="consumer-section">
                        <div className="section-header">
                            <h2><Layers size={18} /> Créations récentes</h2>
                            <Link to="/profile" className="see-all-link">Voir tout <ChevronRight size={14} /></Link>
                        </div>
                        <div className="recent-designs-list">
                            <Link to="/editor" className="design-dash-card new-card">
                                <Plus size={24} />
                                <span>Nouvelle création</span>
                            </Link>
                            {RECENT_DESIGNS.map(d => (
                                <div key={d.id} className="design-dash-card">
                                    <img src={d.img} alt={d.name} />
                                    <div className="design-dash-overlay">
                                        <Link to="/editor" className="overlay-icon-btn"><Edit3 size={14} /></Link>
                                        <button className="overlay-icon-btn"><Eye size={14} /></button>
                                    </div>
                                    <div className="design-dash-footer">
                                        <span className="design-dash-name">{d.name}</span>
                                        <span className="design-dash-status" style={{ color: statusColor[d.status] }}>● {d.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="consumer-section quick-actions-section">
                        <div className="section-header">
                            <h2><Zap size={18} /> Actions rapides</h2>
                        </div>
                        <div className="quick-actions-list">
                            {[
                                { label: 'Créer un design', desc: 'Ouvrir le studio 3D', icon: <Layers size={18} />, to: '/editor', color: '#2B3580' },
                                { label: 'Parcourir le catalogue', desc: 'Voir les modèles', icon: <Star size={18} />, to: '/catalog', color: '#00A8A8' },
                                { label: 'Suivre ma commande', desc: 'Voir les statuts', icon: <Package size={18} />, to: '/profile', color: '#10B981' },
                                { label: 'Mes favoris', desc: 'Articles sauvegardés', icon: <Heart size={18} />, to: '/profile', color: '#EF4444' },
                            ].map(a => (
                                <Link key={a.label} to={a.to} className="quick-action-item">
                                    <div className="qa-icon" style={{ color: a.color, background: a.color + '18' }}>{a.icon}</div>
                                    <div className="qa-text">
                                        <span className="qa-label">{a.label}</span>
                                        <span className="qa-desc">{a.desc}</span>
                                    </div>
                                    <ArrowRight size={15} className="qa-arrow" />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Recent Orders */}
                <section className="consumer-section">
                    <div className="section-header">
                        <h2><ShoppingBag size={18} /> Commandes récentes</h2>
                        <Link to="/profile" className="see-all-link">Voir tout <ChevronRight size={14} /></Link>
                    </div>
                    <div className="orders-table-wrap">
                        <table className="dash-orders-table">
                            <thead>
                                <tr>
                                    <th>Commande</th>
                                    <th>Produit</th>
                                    <th>Date</th>
                                    <th>Montant</th>
                                    <th>Statut</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {RECENT_ORDERS.map(o => (
                                    <tr key={o.id}>
                                        <td className="order-id-cell">{o.id}</td>
                                        <td>
                                            <div className="order-product-cell">
                                                <img src={o.img} alt={o.product} />
                                                {o.product}
                                            </div>
                                        </td>
                                        <td className="order-date-cell">{o.date}</td>
                                        <td className="order-amount-cell">{o.amount}</td>
                                        <td>
                                            <span className="order-status-badge" style={{ color: statusColor[o.status], background: statusColor[o.status] + '18' }}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="order-detail-link">Détails <ArrowRight size={12} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Recommended */}
                <section className="consumer-section">
                    <div className="section-header">
                        <h2><Star size={18} /> Recommandé pour vous</h2>
                        <Link to="/catalog" className="see-all-link">Voir tout <ChevronRight size={14} /></Link>
                    </div>
                    <div className="recommended-grid">
                        {RECOMMENDED.map(r => (
                            <div key={r.name} className="rec-card">
                                <div className="rec-img">
                                    <img src={r.img} alt={r.name} />
                                    <button className="rec-wishlist-btn"><Heart size={14} /></button>
                                </div>
                                <div className="rec-info">
                                    <span className="rec-name">{r.name}</span>
                                    <span className="rec-price">{r.price}</span>
                                </div>
                                <Link to="/editor" className="rec-customize-btn">Personnaliser →</Link>
                            </div>
                        ))}
                    </div>
                </section>
                </>)}

                {/* �dt�dt MES CRÉATIONS �dt�dt */}
                {activeSection === 'designs' && (
                    <section className="consumer-section">
                        <div className="section-header">
                            <h2><Layers size={18} /> Toutes mes créations</h2>
                            <Link to="/editor" className="btn-new-design-dash"><Plus size={15} /> Nouveau</Link>
                        </div>
                        <div className="recent-designs-list">
                            <Link to="/editor" className="design-dash-card new-card">
                                <Plus size={24} />
                                <span>Nouvelle création</span>
                            </Link>
                            {[...RECENT_DESIGNS, ...RECENT_DESIGNS].map((d, i) => (
                                <div key={i} className="design-dash-card">
                                    <img src={d.img} alt={d.name} />
                                    <div className="design-dash-overlay">
                                        <Link to="/editor" className="overlay-icon-btn"><Edit3 size={14} /></Link>
                                        <button className="overlay-icon-btn"><Eye size={14} /></button>
                                    </div>
                                    <div className="design-dash-footer">
                                        <span className="design-dash-name">{d.name}</span>
                                        <span className="design-dash-status" style={{ color: statusColor[d.status] }}>● {d.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* �dt�dt COMMANDES �dt�dt */}
                {activeSection === 'orders' && (
                    <section className="consumer-section">
                        <div className="section-header">
                            <h2><ShoppingBag size={18} /> Toutes mes commandes</h2>
                        </div>
                        <div className="orders-table-wrap">
                            <table className="dash-orders-table">
                                <thead>
                                    <tr>
                                        <th>Commande</th>
                                        <th>Produit</th>
                                        <th>Date</th>
                                        <th>Montant</th>
                                        <th>Statut</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...RECENT_ORDERS, ...RECENT_ORDERS].map((o, i) => (
                                        <tr key={i}>
                                            <td className="order-id-cell">{o.id}</td>
                                            <td>
                                                <div className="order-product-cell">
                                                    <img src={o.img} alt={o.product} />
                                                    {o.product}
                                                </div>
                                            </td>
                                            <td className="order-date-cell">{o.date}</td>
                                            <td className="order-amount-cell">{o.amount}</td>
                                            <td>
                                                <span className="order-status-badge" style={{ color: statusColor[o.status], background: statusColor[o.status] + '18' }}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="order-detail-link">Détails <ArrowRight size={12} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* �dt�dt FAVORIS �dt�dt */}
                {activeSection === 'wishlist' && (
                    <section className="consumer-section">
                        <div className="section-header">
                            <h2><Heart size={18} /> Mes favoris</h2>
                        </div>
                        <div className="recommended-grid">
                            {[...RECOMMENDED, ...RECOMMENDED].map((r, i) => (
                                <div key={i} className="rec-card">
                                    <div className="rec-img">
                                        <img src={r.img} alt={r.name} />
                                        <button className="rec-wishlist-btn" style={{ color: '#EF4444' }}><Heart size={14} /></button>
                                    </div>
                                    <div className="rec-info">
                                        <span className="rec-name">{r.name}</span>
                                        <span className="rec-price">{r.price}</span>
                                    </div>
                                    <Link to="/editor" className="rec-customize-btn">Personnaliser →</Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* �dt�dt NOTIFICATIONS �dt�dt */}
                {activeSection === 'notifications' && (
                    <section className="consumer-section">
                        <div className="section-header">
                            <h2><Bell size={18} /> Notifications</h2>
                        </div>
                        <div className="notifications-list">
                            {[
                                { icon: '📦', title: 'Commande #CL-2891 livrée', desc: 'Votre Hoodie Minimaliste a été livré avec succès.', time: 'Il y a 2h', read: false },
                                { icon: '�dt', title: 'Commande #CL-2745 expédiée', desc: 'Votre Tee Oversize Blanc est en route.', time: 'Il y a 1 jour', read: false },
                                { icon: '✨', title: 'Nouveaux modèles disponibles', desc: 'Découvrez notre nouvelle collection Spring 2026.', time: 'Il y a 2 jours', read: true },
                                { icon: '💬', title: 'Avis laissé', desc: "Merci d'avoir partagé votre expérience.", time: 'Il y a 3 jours', read: true },
                                { icon: '🎁', title: 'Offre exclusive Créateur Premium', desc: '-15% sur votre prochaine commande. Code: PREMIUM15', time: 'Il y a 5 jours', read: true },
                            ].map((n, i) => (
                                <div key={i} className={`notif-item ${!n.read ? 'notif-unread' : ''}`}>
                                    <div className="notif-icon">{n.icon}</div>
                                    <div className="notif-content">
                                        <div className="notif-title">{n.title}</div>
                                        <div className="notif-desc">{n.desc}</div>
                                        <div className="notif-time">{n.time}</div>
                                    </div>
                                    {!n.read && <div className="notif-dot" />}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ConsumerDashboard;
