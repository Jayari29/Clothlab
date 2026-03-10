import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User, Settings, ShoppingBag, Heart, Star,
    Edit3, MapPin, Mail, Phone, Calendar,
    Layers, Download, Eye, MoreHorizontal, Bell, Shield, LogOut,
} from 'lucide-react';
import './Profile.css';

const TABS = ['Mes Créations', 'Commandes', 'Favoris', 'Paramètres'];

const MY_DESIGNS = [
    { id: 1, name: 'Hoodie Minimaliste', date: '02 Mars 2026', status: 'Publié', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80&fit=crop', color: '#3B82F6' },
    { id: 2, name: 'Tee Oversize Blanc', date: '28 Fév 2026', status: 'Brouillon', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80&fit=crop', color: '#F6F8F8' },
    { id: 3, name: 'Bomber Urban', date: '20 Fév 2026', status: 'Publié', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&q=80&fit=crop', color: '#111' },
    { id: 4, name: 'Cargo Street', date: '14 Fév 2026', status: 'En révision', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80&fit=crop', color: '#10B981' },
];

const ORDERS = [
    { id: '#CL-2891', product: 'Hoodie Minimaliste', date: '05 Mars 2026', status: 'Livré', amount: '€59', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&q=80&fit=crop' },
    { id: '#CL-2745', product: 'Tee Oversize Blanc', date: '25 Fév 2026', status: 'En transit', amount: '€29', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80&fit=crop' },
    { id: '#CL-2612', product: 'Bomber Urban', date: '18 Fév 2026', status: 'Livré', amount: '€99', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=80&q=80&fit=crop' },
];

const FAVORITES = [
    { name: 'Hoodie Earth Tone', img: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=280&q=80&fit=crop', price: '€65' },
    { name: 'Veste Oversized', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=280&q=80&fit=crop', price: '€89' },
    { name: 'T-shirt Graphique', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=280&q=80&fit=crop', price: '€35' },
];

const statusColor: Record<string, string> = {
    Publié: '#10B981',
    Brouillon: '#9CA3AF',
    'En révision': '#F59E0B',
    Livré: '#10B981',
    'En transit': '#3B82F6',
};

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Mes Créations');

    return (
        <div className="profile-page">
            {/* ── Hero Banner ── */}
            <div className="profile-banner">
                <div className="profile-banner-img" />
                <div className="profile-avatar-wrap">
                    <img
                        className="profile-avatar"
                        src="https://i.pravatar.cc/120?img=47"
                        alt="Avatar"
                    />
                    <button className="avatar-edit-btn" onClick={() => setActiveTab('Paramètres')}>
                        <Edit3 size={13} />
                    </button>
                </div>
            </div>

            <div className="profile-container">
                {/* ── Identity ── */}
                <div className="profile-identity">
                    <div className="profile-identity-info">
                        <h1>Mahdi Benali</h1>
                        <span className="profile-role"><Star size={13} /> Créateur Premium</span>
                        <div className="profile-meta-row">
                            <span><MapPin size={13} /> Alger, Algérie</span>
                            <span><Mail size={13} /> mahdi@clothlab.com</span>
                            <span><Calendar size={13} /> Membre depuis Mars 2025</span>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn-edit-profile" onClick={() => setActiveTab('Paramètres')}>
                            <Edit3 size={15} /> Modifier le profil
                        </button>
                        <Link to="/editor" className="btn-new-design">
                            <Layers size={15} /> Nouveau Design
                        </Link>
                    </div>
                </div>

                {/* ── Stats ── */}
                <div className="profile-stats">
                    {[
                        { label: 'Créations', value: '24', icon: <Layers size={18} /> },
                        { label: 'Commandes', value: '12', icon: <ShoppingBag size={18} /> },
                        { label: 'Favoris', value: '47', icon: <Heart size={18} /> },
                        { label: 'Vues totales', value: '3.2k', icon: <Eye size={18} /> },
                    ].map(s => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-card-icon">{s.icon}</div>
                            <div className="stat-card-value">{s.value}</div>
                            <div className="stat-card-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Tabs ── */}
                <div className="profile-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <div className="profile-content">

                    {/* MES CRÉATIONS */}
                    {activeTab === 'Mes Créations' && (
                        <div className="designs-grid">
                            <Link to="/editor" className="design-card new-design-card">
                                <div className="new-design-icon"><Layers size={28} /></div>
                                <span>Nouveau Design</span>
                            </Link>
                            {MY_DESIGNS.map(d => (
                                <div key={d.id} className="design-card">
                                    <div className="design-card-img">
                                        <img src={d.img} alt={d.name} />
                                        <div className="design-card-overlay">
                                            <Link to="/editor" className="design-overlay-btn"><Edit3 size={15} /></Link>
                                            <button className="design-overlay-btn"><Eye size={15} /></button>
                                            <button className="design-overlay-btn"><Download size={15} /></button>
                                        </div>
                                    </div>
                                    <div className="design-card-info">
                                        <div className="design-card-top">
                                            <span className="design-name">{d.name}</span>
                                            <button className="design-more"><MoreHorizontal size={16} /></button>
                                        </div>
                                        <div className="design-card-bottom">
                                            <span className="design-date">{d.date}</span>
                                            <span className="design-status" style={{ color: statusColor[d.status] }}>
                                                ● {d.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* COMMANDES */}
                    {activeTab === 'Commandes' && (
                        <div className="orders-section">
                            <table className="orders-table">
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
                                    {ORDERS.map(o => (
                                        <tr key={o.id}>
                                            <td className="order-id">{o.id}</td>
                                            <td>
                                                <div className="order-product">
                                                    <img src={o.img} alt={o.product} />
                                                    {o.product}
                                                </div>
                                            </td>
                                            <td className="order-date">{o.date}</td>
                                            <td className="order-amount">{o.amount}</td>
                                            <td>
                                                <span className="order-badge" style={{ color: statusColor[o.status], backgroundColor: statusColor[o.status] + '18' }}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td><button className="order-detail-btn">Détails →</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* FAVORIS */}
                    {activeTab === 'Favoris' && (
                        <div className="favorites-grid">
                            {FAVORITES.map(f => (
                                <div key={f.name} className="fav-card">
                                    <div className="fav-img">
                                        <img src={f.img} alt={f.name} />
                                        <button className="fav-heart active"><Heart size={16} /></button>
                                    </div>
                                    <div className="fav-info">
                                        <span className="fav-name">{f.name}</span>
                                        <span className="fav-price">{f.price}</span>
                                    </div>
                                    <Link to="/editor" className="fav-customize-btn">Personnaliser →</Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PARAMÈTRES */}
                    {activeTab === 'Paramètres' && (
                        <div className="settings-panel">
                            {/* Personal info */}
                            <div className="settings-block">
                                <div className="settings-block-header">
                                    <User size={18} /><h3>Informations personnelles</h3>
                                </div>
                                <div className="settings-fields">
                                    <div className="settings-field-row">
                                        <div className="settings-field">
                                            <label>Prénom</label>
                                            <input type="text" defaultValue="Mahdi" />
                                        </div>
                                        <div className="settings-field">
                                            <label>Nom</label>
                                            <input type="text" defaultValue="Benali" />
                                        </div>
                                    </div>
                                    <div className="settings-field">
                                        <label><Mail size={13} /> Email</label>
                                        <input type="email" defaultValue="mahdi@clothlab.com" />
                                    </div>
                                    <div className="settings-field">
                                        <label><Phone size={13} /> Téléphone</label>
                                        <input type="tel" defaultValue="+213 555 123 456" />
                                    </div>
                                    <div className="settings-field">
                                        <label><MapPin size={13} /> Ville</label>
                                        <input type="text" defaultValue="Alger, Algérie" />
                                    </div>
                                </div>
                                <button className="settings-save-btn">Sauvegarder</button>
                            </div>

                            {/* Notifications */}
                            <div className="settings-block">
                                <div className="settings-block-header">
                                    <Bell size={18} /><h3>Notifications</h3>
                                </div>
                                {[
                                    { label: 'Mises à jour des commandes', on: true },
                                    { label: 'Nouveaux modèles disponibles', on: true },
                                    { label: 'Offres promotionnelles', on: false },
                                    { label: 'Newsletters ClothLab', on: false },
                                ].map(n => (
                                    <div key={n.label} className="settings-toggle-row">
                                        <span>{n.label}</span>
                                        <div className={`toggle ${n.on ? 'toggle-on' : ''}`}>
                                            <div className="toggle-thumb" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Security */}
                            <div className="settings-block">
                                <div className="settings-block-header">
                                    <Shield size={18} /><h3>Sécurité</h3>
                                </div>
                                <div className="settings-field">
                                    <label>Mot de passe actuel</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <div className="settings-field">
                                    <label>Nouveau mot de passe</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <button className="settings-save-btn">Mettre à jour</button>
                            </div>

                            {/* Danger zone */}
                            <div className="settings-block danger-block">
                                <div className="settings-block-header">
                                    <LogOut size={18} /><h3>Zone de danger</h3>
                                </div>
                                <p>Ces actions sont irréversibles. Procédez avec prudence.</p>
                                <div className="danger-actions">
                                    <button className="btn-logout">Se déconnecter</button>
                                    <button className="btn-delete-account">Supprimer le compte</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Profile;
