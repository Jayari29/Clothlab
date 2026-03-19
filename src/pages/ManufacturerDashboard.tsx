import { useState } from 'react';
import {
    Package, TrendingUp, Clock, AlertTriangle,
    Filter, Search, ChevronDown, ArrowUpRight,
    Factory, Users, DollarSign, BarChart2, Settings, LogOut, Bell,
    Eye, Edit3, ChevronRight, Truck,
} from 'lucide-react';
import './ManufacturerDashboard.css';

const ORDERS = [
    { id: '#CL-3012', client: 'Mahdi Benali', product: 'Hoodie Minimaliste', qty: 50, material: 'Heavy Cotton', status: 'En production', date: '08 Mars 2026', amount: '€2 950', priority: 'high', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&q=80&fit=crop' },
    { id: '#CL-2989', client: 'Yasmine Aït', product: 'Bomber Urban', qty: 30, material: 'Nylon Ripstop', status: 'En attente', date: '06 Mars 2026', amount: '€2 970', priority: 'medium', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=80&q=80&fit=crop' },
    { id: '#CL-2891', client: 'Rayan Chérif', product: 'Tee Oversize', qty: 120, material: 'Jersey Coton', status: 'Expédié', date: '04 Mars 2026', amount: '€3 480', priority: 'low', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80&fit=crop' },
    { id: '#CL-2810', client: 'Amina Khaldi', product: 'Cargo Pants', qty: 40, material: 'Twill Cotton', status: 'Livré', date: '01 Mars 2026', amount: '€3 160', priority: 'low', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=80&q=80&fit=crop' },
    { id: '#CL-2745', client: 'Karim Benmouss', product: 'Veste Oversize', qty: 25, material: 'Poly Canvas', status: 'En production', date: '28 Fév 2026', amount: '€2 225', priority: 'high', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=80&q=80&fit=crop' },
];

const PIPELINE = [
    { stage: 'Reçues', count: 4, color: '#F59E0B' },
    { stage: 'Validation', count: 2, color: '#3B82F6' },
    { stage: 'Production', count: 7, color: '#8B5CF6' },
    { stage: 'Contrôle', count: 3, color: '#F97316' },
    { stage: 'Expédition', count: 5, color: '#10B981' },
];

const statusColor: Record<string, string> = {
    'En production': '#8B5CF6',
    'En attente': '#F59E0B',
    'Expédié': '#3B82F6',
    'Livré': '#10B981',
    'Annulé': '#EF4444',
};

const priorityMap: Record<string, { label: string; color: string }> = {
    high: { label: 'Urgent', color: '#EF4444' },
    medium: { label: 'Normal', color: '#F59E0B' },
    low: { label: 'Faible', color: '#9CA3AF' },
};

const NAV_ITEMS = [
    { icon: <BarChart2 size={17} />, label: 'Tableau de bord', id: 'dashboard' },
    { icon: <Package size={17} />, label: 'Commandes', id: 'orders' },
    { icon: <Factory size={17} />, label: 'Production', id: 'production' },
    { icon: <Truck size={17} />, label: 'Expéditions', id: 'shipping' },
    { icon: <Users size={17} />, label: 'Clients', id: 'clients' },
    { icon: <DollarSign size={17} />, label: 'Finances', id: 'finances' },
    { icon: <Settings size={17} />, label: 'Paramètres', id: 'settings' },
];

const ManufacturerDashboard = () => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('Tous');
    const [activeNav, setActiveNav] = useState('dashboard');

    const filtered = ORDERS.filter(o =>
        (filterStatus === 'Tous' || o.status === filterStatus) &&
        (o.client.toLowerCase().includes(search.toLowerCase()) ||
            o.product.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="mfr-page">
            {/* Sidebar */}
            <aside className="mfr-sidebar">
                <div className="mfr-sidebar-brand">
                    <img src="/SVG/Asset 2.svg" alt="ClothLab" className="mfr-logo-img" />
                </div>
                <nav className="mfr-sidebar-nav">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`mfr-nav-item ${activeNav === item.id ? 'active' : ''}`}
                            onClick={() => setActiveNav(item.id)}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>
                <div className="mfr-sidebar-bottom">
                    <button className="mfr-nav-item mfr-logout">
                        <LogOut size={17} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="mfr-main">
                {/* Header */}
                <header className="mfr-header">
                    <div>
                        <h1 className="split-heading mfr-welcome-heading">
                            <span className="sh-italic">Portail</span>
                            <span className="sh-bold">Fabricant.</span>
                        </h1>
                        <p>Gérez vos commandes, suivez la production et expédiez avec précision.</p>
                    </div>
                    <div className="mfr-header-actions">
                        <button className="mfr-notif-btn">
                            <Bell size={18} />
                            <span className="notif-badge">3</span>
                        </button>
                        <div className="mfr-user-info">
                            <img src="https://i.pravatar.cc/40?img=52" alt="manufacturer" className="mfr-user-avatar" />
                            <div>
                                <div className="mfr-user-name">TextilePro SAS</div>
                                <div className="mfr-user-role">Fabricant certifié</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* KPI Cards */}
                {activeNav === 'dashboard' && (<>
                    <div className="mfr-kpi-grid">
                        {[
                            { label: 'Commandes en cours', value: '12', icon: <Clock size={20} />, color: '#F59E0B', delta: '+3 cette semaine' },
                            { label: 'En production', value: '7', icon: <Factory size={20} />, color: '#8B5CF6', delta: '2 urgentes' },
                            { label: 'Expédiées ce mois', value: '34', icon: <Truck size={20} />, color: '#3B82F6', delta: '+12% vs mois dernier' },
                            { label: 'Revenus ce mois', value: '€24.5k', icon: <TrendingUp size={20} />, color: '#10B981', delta: '+8.3% croissance' },
                        ].map(s => (
                            <div key={s.label} className="mfr-kpi-card">
                                <div className="mfr-kpi-icon" style={{ color: s.color, background: s.color + '18' }}>{s.icon}</div>
                                <div className="mfr-kpi-value">{s.value}</div>
                                <div className="mfr-kpi-label">{s.label}</div>
                                <div className="mfr-kpi-delta"><ArrowUpRight size={12} /> {s.delta}</div>
                            </div>
                        ))}
                    </div>

                    {/* Pipeline */}
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><Factory size={17} /> Pipeline de production</h2>
                        </div>
                        <div className="mfr-pipeline">
                            {PIPELINE.map((stage, i) => (
                                <div key={stage.stage} className="pipeline-stage-wrap">
                                    <div className="pipeline-stage">
                                        <div className="pipeline-num" style={{ background: stage.color + '18', color: stage.color }}>
                                            {stage.count}
                                        </div>
                                        <div className="pipeline-label">{stage.stage}</div>
                                        <div className="pipeline-bar"><div className="pipeline-bar-fill" style={{ width: `${(stage.count / 10) * 100}%`, background: stage.color }} /></div>
                                    </div>
                                    {i < PIPELINE.length - 1 && <ChevronRight size={18} className="pipeline-arrow" />}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Alerts */}
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><AlertTriangle size={17} /> Alertes &amp; Priorités</h2>
                        </div>
                        <div className="mfr-alerts">
                            {[
                                { type: 'urgent', msg: '2 commandes urgentes dépassent le délai estimé', color: '#EF4444' },
                                { type: 'info', msg: 'Stock de matière "Nylon Ripstop" bientôt épuisé (12 m restants)', color: '#F59E0B' },
                                { type: 'success', msg: 'Commande #CL-2891 expédiée avec succès ce matin', color: '#10B981' },
                            ].map((a, i) => (
                                <div key={i} className="mfr-alert-item" style={{ borderLeftColor: a.color }}>
                                    <span style={{ color: a.color }}>{a.type === 'urgent' ? '🔴' : a.type === 'info' ? '🟡' : '🟢'}</span>
                                    <span>{a.msg}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </>)}

                {/* �dt�dt ORDERS �dt�dt */}
                {activeNav === 'orders' && (
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><Package size={17} /> Gestion des commandes</h2>
                            <div className="mfr-table-controls">
                                <div className="mfr-search-wrap">
                                    <Search size={15} className="mfr-search-icon" />
                                    <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="mfr-search-input" />
                                </div>
                                <div className="mfr-filter-wrap">
                                    <Filter size={14} />
                                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="mfr-filter-select">
                                        {['Tous', 'En attente', 'En production', 'Expédié', 'Livré'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                        <div className="mfr-table-wrap">
                            <table className="mfr-table">
                                <thead><tr><th>Commande</th><th>Client</th><th>Produit</th><th>Qté</th><th>Matière</th><th>Date</th><th>Montant</th><th>Priorité</th><th>Statut</th><th></th></tr></thead>
                                <tbody>
                                    {filtered.map(o => (
                                        <tr key={o.id}>
                                            <td className="mfr-order-id">{o.id}</td>
                                            <td className="mfr-client">{o.client}</td>
                                            <td><div className="mfr-product-cell"><img src={o.img} alt={o.product} />{o.product}</div></td>
                                            <td className="mfr-qty">{o.qty} pcs</td>
                                            <td className="mfr-material">{o.material}</td>
                                            <td className="mfr-date">{o.date}</td>
                                            <td className="mfr-amount">{o.amount}</td>
                                            <td><span className="mfr-priority-badge" style={{ color: priorityMap[o.priority].color, background: priorityMap[o.priority].color + '18' }}>{priorityMap[o.priority].label}</span></td>
                                            <td><span className="mfr-status-badge" style={{ color: statusColor[o.status], background: statusColor[o.status] + '18' }}>{o.status}</span></td>
                                            <td><div className="mfr-row-actions"><button className="mfr-action-btn"><Eye size={14} /></button><button className="mfr-action-btn"><Edit3 size={14} /></button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && <div className="mfr-empty">Aucune commande trouvée.</div>}
                        </div>
                    </section>
                )}

                {/* �dt�dt PRODUCTION �dt�dt */}
                {activeNav === 'production' && (
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><Factory size={17} /> Suivi de production</h2>
                        </div>
                        <div className="mfr-pipeline" style={{ marginBottom: '2rem' }}>
                            {PIPELINE.map((stage, i) => (
                                <div key={stage.stage} className="pipeline-stage-wrap">
                                    <div className="pipeline-stage">
                                        <div className="pipeline-num" style={{ background: stage.color + '18', color: stage.color }}>{stage.count}</div>
                                        <div className="pipeline-label">{stage.stage}</div>
                                        <div className="pipeline-bar"><div className="pipeline-bar-fill" style={{ width: `${(stage.count / 10) * 100}%`, background: stage.color }} /></div>
                                    </div>
                                    {i < PIPELINE.length - 1 && <ChevronRight size={18} className="pipeline-arrow" />}
                                </div>
                            ))}
                        </div>
                        <div className="mfr-table-wrap">
                            <table className="mfr-table">
                                <thead><tr><th>Commande</th><th>Produit</th><th>Client</th><th>Matière</th><th>Qté</th><th>Statut</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {ORDERS.filter(o => ['En production', 'En attente'].includes(o.status)).map(o => (
                                        <tr key={o.id}>
                                            <td className="mfr-order-id">{o.id}</td>
                                            <td><div className="mfr-product-cell"><img src={o.img} alt={o.product} />{o.product}</div></td>
                                            <td className="mfr-client">{o.client}</td>
                                            <td className="mfr-material">{o.material}</td>
                                            <td className="mfr-qty">{o.qty} pcs</td>
                                            <td><span className="mfr-status-badge" style={{ color: statusColor[o.status], background: statusColor[o.status] + '18' }}>{o.status}</span></td>
                                            <td><div className="mfr-row-actions"><button className="mfr-action-btn"><Eye size={14} /></button><button className="mfr-action-btn"><Edit3 size={14} /></button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* �dt�dt SHIPPING �dt�dt */}
                {activeNav === 'shipping' && (
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><Truck size={17} /> Expéditions</h2>
                        </div>
                        <div className="mfr-table-wrap">
                            <table className="mfr-table">
                                <thead><tr><th>Commande</th><th>Client</th><th>Produit</th><th>Date</th><th>Montant</th><th>Statut</th></tr></thead>
                                <tbody>
                                    {ORDERS.filter(o => ['Expédié', 'Livré'].includes(o.status)).map(o => (
                                        <tr key={o.id}>
                                            <td className="mfr-order-id">{o.id}</td>
                                            <td className="mfr-client">{o.client}</td>
                                            <td><div className="mfr-product-cell"><img src={o.img} alt={o.product} />{o.product}</div></td>
                                            <td className="mfr-date">{o.date}</td>
                                            <td className="mfr-amount">{o.amount}</td>
                                            <td><span className="mfr-status-badge" style={{ color: statusColor[o.status], background: statusColor[o.status] + '18' }}>{o.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* �dt�dt CLIENTS �dt�dt */}
                {activeNav === 'clients' && (
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><Users size={17} /> Clients</h2>
                        </div>
                        <div className="mfr-table-wrap">
                            <table className="mfr-table">
                                <thead><tr><th>Client</th><th>Commandes</th><th>Dernier achat</th><th>Total dépensé</th><th>Statut</th></tr></thead>
                                <tbody>
                                    {[...new Map(ORDERS.map(o => [o.client, o])).values()].map(o => (
                                        <tr key={o.client}>
                                            <td className="mfr-client">{o.client}</td>
                                            <td>{ORDERS.filter(x => x.client === o.client).length}</td>
                                            <td className="mfr-date">{o.date}</td>
                                            <td className="mfr-amount">{o.amount}</td>
                                            <td><span className="mfr-status-badge" style={{ color: '#10B981', background: '#10B98118' }}>Actif</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* �dt�dt FINANCES �dt�dt */}
                {activeNav === 'finances' && (
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><DollarSign size={17} /> Finances</h2>
                        </div>
                        <div className="mfr-kpi-grid">
                            {[
                                { label: 'Revenus ce mois', value: '€24 500', color: '#10B981', icon: <TrendingUp size={20} />, delta: '+8.3%' },
                                { label: 'Revenus totaux', value: '€187 240', color: '#2B3580', icon: <DollarSign size={20} />, delta: 'Depuis lancement' },
                                { label: 'Commandes facturées', value: '145', color: '#3B82F6', icon: <Package size={20} />, delta: 'Ce trimestre' },
                                { label: 'Marge moyenne', value: '34%', color: '#8B5CF6', icon: <BarChart2 size={20} />, delta: '+2% vs T3' },
                            ].map(s => (
                                <div key={s.label} className="mfr-kpi-card">
                                    <div className="mfr-kpi-icon" style={{ color: s.color, background: s.color + '18' }}>{s.icon}</div>
                                    <div className="mfr-kpi-value">{s.value}</div>
                                    <div className="mfr-kpi-label">{s.label}</div>
                                    <div className="mfr-kpi-delta"><ArrowUpRight size={12} /> {s.delta}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mfr-alert-item" style={{ marginTop: '1.5rem', borderLeftColor: '#10B981' }}>
                            <span style={{ color: '#10B981' }}>🟢</span>
                            <span>Paiement reçu pour commande #CL-2810 �dt� €3 160</span>
                        </div>
                        <div className="mfr-alert-item" style={{ borderLeftColor: '#F59E0B' }}>
                            <span style={{ color: '#F59E0B' }}>🟡</span>
                            <span>Facture #CL-2989 en attente de règlement �dt� €2 970</span>
                        </div>
                    </section>
                )}

                {/* �dt�dt SETTINGS �dt�dt */}
                {activeNav === 'settings' && (
                    <section className="mfr-section">
                        <div className="mfr-section-header">
                            <h2><Settings size={17} /> Paramètres du compte</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 560 }}>
                            {[
                                { label: "Nom de l\u2019entreprise", value: 'TextilePro SAS', type: 'text' },
                                { label: 'Email de contact', value: 'contact@textilepro.fr', type: 'email' },
                                { label: 'Téléphone', value: '+33 1 44 55 66 77', type: 'tel' },
                                { label: 'Ville', value: 'Lyon, France', type: 'text' },
                            ].map(f => (
                                <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280' }}>{f.label}</label>
                                    <input defaultValue={f.value} type={f.type} style={{ padding: '0.65rem 1rem', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                            ))}
                            <button style={{ alignSelf: 'flex-start', padding: '0.65rem 1.5rem', background: '#2B3580', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                                Sauvegarder
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ManufacturerDashboard;
