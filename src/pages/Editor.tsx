import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Preload } from '@react-three/drei';
import * as THREE from 'three';
import {
    Shirt, ShoppingBag, Scissors, Watch,
    UploadCloud, RefreshCw, Hand, ZoomIn, Video,
    Eye, PlusCircle, Library, Users,
    Undo2, Save, ShoppingCart, BookImage, Layers, ChevronRight,
    Ruler, X, Search, Image, Sparkles, Tag,
} from 'lucide-react';

import './Editor.css';

const COLORS = [
    '#F6F8F8', '#111111', '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#9CA3AF', '#00A8A8', null,
];

const MODELS = [
    { label: 'Hoodies', Icon: Shirt },
    { label: 'T-Shirts', Icon: ShoppingBag },
    { label: 'Pantalons', Icon: Scissors },
    { label: 'Accessoires', Icon: Watch },
];

const RECENTLY_UPLOADED = [
    { bg: '#1a1a1a', Icon: Layers, color: '#00A8A8' },
    { bg: '#f5e6c8', Icon: BookImage, color: '#8B5CF6' },
    { bg: '#f5e6c8', Icon: ShoppingCart, color: '#F59E0B' },
];

const FABRIC_OPTIONS = [
    { name: 'Heavy Cotton', desc: 'Premium Matte Finish' },
    { name: 'Tie-Dye Swirl', desc: 'Sublimation Ready' },
];

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const FIT_TYPES = [
    { id: 'regular', label: 'Regular', desc: 'Coupe standard' },
    { id: 'slim', label: 'Slim', desc: 'Ajusté au corps' },
    { id: 'oversized', label: 'Oversized', desc: 'Ample et décontracté' },
];

const MEASUREMENTS = [
    { key: 'chest', label: 'Poitrine', unit: 'cm', placeholder: '96' },
    { key: 'waist', label: 'Taille', unit: 'cm', placeholder: '80' },
    { key: 'hips', label: 'Hanches', unit: 'cm', placeholder: '100' },
    { key: 'length', label: 'Longueur', unit: 'cm', placeholder: '70' },
    { key: 'shoulder', label: 'Épaules', unit: 'cm', placeholder: '46' },
    { key: 'sleeve', label: 'Manche', unit: 'cm', placeholder: '62' },
] as const;

const TOOLS = [
    { label: 'Orbit', Icon: RefreshCw },
    { label: 'Pan', Icon: Hand },
    { label: 'Zoom', Icon: ZoomIn },
    { label: 'Camera', Icon: Video },
];

const CLOTHES_CATEGORIES = ['Hoodies', 'T-Shirts', 'Pantalons', 'Accessoires'];

const CLOTHES_LIBRARY: Record<string, { id: string; name: string; badge: string; bg: string; accent: string }[]> = {
    Hoodies: [
        { id: 'h1', name: 'Hoodie Classique', badge: 'Casual', bg: '#2B3580', accent: '#fff' },
        { id: 'h2', name: 'Zip Hoodie', badge: 'Sport', bg: '#111', accent: '#00A8A8' },
        { id: 'h3', name: 'Crop Hoodie', badge: 'Streetwear', bg: '#EC4899', accent: '#fff' },
        { id: 'h4', name: 'Hoodie Oversize', badge: 'Confort', bg: '#10B981', accent: '#fff' },
        { id: 'h5', name: 'Hoodie Velours', badge: 'Premium', bg: '#8B5CF6', accent: '#fff' },
        { id: 'h6', name: 'Hoodie Technique', badge: 'Outdoor', bg: '#F59E0B', accent: '#fff' },
    ],
    'T-Shirts': [
        { id: 't1', name: 'Tee Col Rond', badge: 'Basique', bg: '#F6F8F8', accent: '#111' },
        { id: 't2', name: 'Tee Col V', badge: 'Casual', bg: '#3B82F6', accent: '#fff' },
        { id: 't3', name: 'Crop Top', badge: 'Streetwear', bg: '#EF4444', accent: '#fff' },
        { id: 't4', name: 'Polo Classique', badge: 'Smart', bg: '#111', accent: '#fff' },
        { id: 't5', name: 'Tee Tie-Dye', badge: 'Festival', bg: '#EC4899', accent: '#fff' },
        { id: 't6', name: 'Tee Oversized', badge: 'Lounge', bg: '#9CA3AF', accent: '#fff' },
    ],
    Pantalons: [
        { id: 'p1', name: 'Jean Slim', badge: 'Denim', bg: '#2B3580', accent: '#fff' },
        { id: 'p2', name: 'Jogging Cargo', badge: 'Sport', bg: '#111', accent: '#10B981' },
        { id: 'p3', name: 'Chino Droit', badge: 'Smart', bg: '#F59E0B', accent: '#fff' },
        { id: 'p4', name: 'Short Bermuda', badge: 'Summer', bg: '#00A8A8', accent: '#fff' },
        { id: 'p5', name: 'Pantalon Large', badge: 'Streetwear', bg: '#8B5CF6', accent: '#fff' },
        { id: 'p6', name: 'Legging Technique', badge: 'Fitness', bg: '#EF4444', accent: '#fff' },
    ],
    Accessoires: [
        { id: 'a1', name: 'Casquette 5-panel', badge: 'Streetwear', bg: '#111', accent: '#00A8A8' },
        { id: 'a2', name: 'Beanie', badge: 'Hiver', bg: '#2B3580', accent: '#fff' },
        { id: 'a3', name: 'Tote Bag', badge: 'Eco', bg: '#10B981', accent: '#fff' },
        { id: 'a4', name: 'Sac à dos', badge: 'Urban', bg: '#9CA3AF', accent: '#fff' },
        { id: 'a5', name: 'Chaussettes', badge: 'Basics', bg: '#F59E0B', accent: '#fff' },
        { id: 'a6', name: 'Ceinture', badge: 'Accessoire', bg: '#EC4899', accent: '#fff' },
    ],
};

const DECAL_CATEGORIES = ['Logos', 'Patterns', 'Illustrations', 'Texte'];

const DECAL_LIBRARY: Record<string, { id: string; name: string; preview: string; tag: string }[]> = {
    Logos: [
        { id: 'd1', name: 'ClothLab Badge', preview: 'CL', tag: 'Brand' },
        { id: 'd2', name: 'Crown Icon', preview: '♛', tag: 'Premium' },
        { id: 'd3', name: 'Lightning Bolt', preview: '⚡', tag: 'Sport' },
        { id: 'd4', name: 'Rose Emblem', preview: '🌹', tag: 'Floral' },
        { id: 'd5', name: 'Dragon Crest', preview: '🐉', tag: 'Fantasy' },
        { id: 'd6', name: 'Globe Mark', preview: '🌐', tag: 'Urban' },
    ],
    Patterns: [
        { id: 'd7', name: 'Camouflage', preview: '░░', tag: 'Military' },
        { id: 'd8', name: 'Tie-Dye Burst', preview: '◎', tag: 'Festival' },
        { id: 'd9', name: 'Houndstooth', preview: '▣', tag: 'Classic' },
        { id: 'd10', name: 'Damier', preview: '⬛', tag: 'Luxe' },
        { id: 'd11', name: 'Grunge Splatter', preview: '✦', tag: 'Street' },
        { id: 'd12', name: 'Aztec Geo', preview: '◆', tag: 'Ethnic' },
    ],
    Illustrations: [
        { id: 'd13', name: 'Astronaute', preview: '🧑\u200d🚀', tag: 'Sci-fi' },
        { id: 'd14', name: 'Skateboard', preview: '🛹', tag: 'Street' },
        { id: 'd15', name: 'Cassette', preview: '📼', tag: 'Retro' },
        { id: 'd16', name: 'Fleur Tropicale', preview: '🌺', tag: 'Summer' },
        { id: 'd17', name: 'Loup Géo', preview: '🐺', tag: 'Nature' },
        { id: 'd18', name: 'Crâne Artistique', preview: '💀', tag: 'Rock' },
    ],
    Texte: [
        { id: 'd19', name: '"ORIGINAL"', preview: 'OG', tag: 'Lettering' },
        { id: 'd20', name: '"LIMITED"', preview: 'LTD', tag: 'Drop' },
        { id: 'd21', name: '"EST. 2025"', preview: '25', tag: 'Heritage' },
        { id: 'd22', name: '"MADE IN FR"', preview: 'FR', tag: 'Local' },
        { id: 'd23', name: 'Signature Cursive', preview: '✍', tag: 'Custom' },
        { id: 'd24', name: 'Numéro Maillot', preview: '#9', tag: 'Sport' },
    ],
};

type MeasurementKey = typeof MEASUREMENTS[number]['key'];

const GarmentMesh = ({ color }: { color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1.2, 0.35, 200, 32]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.5}
                    clearcoat={0.8}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
};

const Editor = () => {
    const [selectedModel, setSelectedModel] = useState('Hoodies');
    const [selectedClothesItem, setSelectedClothesItem] = useState<string | null>(null);
    const [activeColor, setActiveColor] = useState('#F6F8F8');
    const [activeFabric, setActiveFabric] = useState('Heavy Cotton');
    const [activeTool, setActiveTool] = useState('Orbit');
    const [activeSize, setActiveSize] = useState('M');
    const [activeFit, setActiveFit] = useState('regular');
    const [customMode, setCustomMode] = useState(false);
    const [measurements, setMeasurements] = useState<Record<MeasurementKey, string>>({
        chest: '', waist: '', hips: '', length: '', shoulder: '', sleeve: '',
    });

    const [clothesLibOpen, setClothesLibOpen] = useState(false);
    const [decalLibOpen, setDecalLibOpen] = useState(false);
    const [clothesCategory, setClothesCategory] = useState('Hoodies');
    const [decalCategory, setDecalCategory] = useState('Logos');
    const [decalSearch, setDecalSearch] = useState('');
    const [activeDecalId, setActiveDecalId] = useState<string | null>(null);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'info' } | null>(null);
    const navigate = useNavigate();

    const activeDecal = activeDecalId
        ? Object.values(DECAL_LIBRARY).flat().find(d => d.id === activeDecalId)
        : null;

    const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = () => showToast('Projet sauvegardé avec succès !');
    const handleOrder = () => navigate('/order');

    const handleMeasurement = (key: MeasurementKey, value: string) => {
        setMeasurements(prev => ({ ...prev, [key]: value }));
    };

    const filteredDecals = DECAL_LIBRARY[decalCategory].filter(d =>
        d.name.toLowerCase().includes(decalSearch.toLowerCase())
    );

    return (
        <>
            <div className="editor-root">
                {/* Top Bar */}
                <header className="editor-header">
                    <div className="editor-header-left">
                        <Link to="/" className="editor-logo-link">
                            <img src="/SVG/Asset 2.svg" alt="Clothlab" className="editor-logo-img" />
                        </Link>
                        <nav className="editor-top-nav">
                            <button className="editor-tab active"><Layers size={14} /> Atelier</button>
                            <button className="editor-tab"><Library size={14} /> Mes Projets</button>
                            <button className="editor-tab"><Users size={14} /> Ressources</button>
                        </nav>
                    </div>
                    <div className="editor-header-right">
                        <button className="btn-undo" title="Annuler"><Undo2 size={18} /></button>
                        <button className="btn-save" onClick={handleSave}><Save size={14} /> Sauvegarder</button>
                        <button className="btn-order-teal" onClick={handleOrder}><ShoppingCart size={14} /> Commander →</button>
                        <div className="editor-avatar">
                            <img src="https://i.pravatar.cc/32?img=12" alt="user" />
                        </div>
                    </div>
                </header>

                <div className="editor-body">
                    {/* Left Panel */}
                    <aside className="editor-left-panel">
                        <p className="panel-section-label">Modèles de base</p>
                        <div className="model-grid">
                            {MODELS.map(({ label, Icon }) => (
                                <button
                                    key={label}
                                    className={`model-card ${selectedModel === label ? 'selected' : ''}`}
                                    onClick={() => setSelectedModel(label)}
                                >
                                    <Icon size={22} className="model-svg-icon" />
                                    <span className="model-name">{label}</span>
                                </button>
                            ))}
                        </div>

                        <button className="lib-browse-btn" onClick={() => setClothesLibOpen(true)}>
                            <Library size={15} />
                            Bibliothèque 3D
                            <span className="lib-count-badge">{Object.values(CLOTHES_LIBRARY).flat().length}</span>
                        </button>

                        <div className="panel-divider" />

                        <p className="panel-section-label">Importer</p>
                        <button className="import-btn">
                            <UploadCloud size={20} className="import-icon" />
                            <div>
                                <div className="import-title">Importer un Asset 3D</div>
                                <div className="import-types">GLTF, OBJ, FBX</div>
                            </div>
                            <ChevronRight size={16} className="import-chevron" />
                        </button>

                        <p className="panel-section-label-sm">Graphiques récents</p>
                        <div className="recent-graphics">
                            {RECENTLY_UPLOADED.map((g, i) => (
                                <div key={i} className="graphic-thumb" style={{ backgroundColor: g.bg }}>
                                    <g.Icon size={20} color={g.color} />
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* 3D Viewport */}
                    <main className="editor-viewport">
                        <div className="viewport-meta">
                            <div className="meta-tag">VERTICES: 42,891</div>
                            <div className="meta-tag">TEXTURE: 4096px</div>
                        </div>

                        <div className="canvas-area">
                            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                <ambientLight intensity={0.7} />
                                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                                <spotLight position={[-10, 8, 8]} intensity={1.2} angle={0.3} penumbra={1} />
                                <Environment preset="studio" />
                                <GarmentMesh color={activeColor} />
                                <OrbitControls
                                    enableZoom={activeTool === 'Zoom'}
                                    enablePan={activeTool === 'Pan'}
                                    enableRotate={activeTool === 'Orbit'}
                                    autoRotate
                                    autoRotateSpeed={1}
                                />
                                <Preload all />
                            </Canvas>
                        </div>

                        <div className="viewport-toolbar">
                            {TOOLS.map(({ label, Icon }) => (
                                <button
                                    key={label}
                                    className={`tool-btn ${activeTool === label ? 'active-tool' : ''}`}
                                    onClick={() => setActiveTool(label)}
                                >
                                    <Icon size={18} className="tool-icon-svg" />
                                    <span className="tool-label">{label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="autosave-indicator">
                            <span className="autosave-dot" /> Sauvegarde automatique active
                        </div>
                    </main>

                    {/* Right Panel */}
                    <aside className="editor-right-panel">
                        <h2 className="settings-title">Paramètres Studio</h2>
                        <p className="settings-subtitle">Ajustez les propriétés de votre vêtement</p>

                        <div className="settings-section">
                            <div className="settings-section-header">
                                <span className="settings-label">COULEUR PRINCIPALE</span>
                                <span className="settings-value">{activeColor}</span>
                            </div>
                            <div className="color-grid">
                                {COLORS.map((c, i) =>
                                    c === null ? (
                                        <button key={i} className="color-swatch color-plus"><PlusCircle size={14} /></button>
                                    ) : (
                                        <button
                                            key={i}
                                            className={`color-swatch ${activeColor === c ? 'active-swatch' : ''}`}
                                            style={{ backgroundColor: c, border: c === '#F6F8F8' ? '1.5px solid #ccc' : 'none' }}
                                            onClick={() => setActiveColor(c)}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div className="settings-section">
                            <span className="settings-label">MATIÈRE</span>
                            <div className="fabric-list">
                                {FABRIC_OPTIONS.map((f) => (
                                    <button
                                        key={f.name}
                                        className={`fabric-card ${activeFabric === f.name ? 'active-fabric' : ''}`}
                                        onClick={() => setActiveFabric(f.name)}
                                    >
                                        <div className="fabric-swatch" />
                                        <div className="fabric-info">
                                            <span className="fabric-name">{f.name}</span>
                                            <span className="fabric-desc">{f.desc}</span>
                                        </div>
                                        {activeFabric === f.name && <span className="fabric-check">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SIZE */}
                        <div className="settings-section">
                            <div className="settings-section-header">
                                <span className="settings-label">TAILLE</span>
                                <button
                                    className={`size-mode-toggle ${customMode ? 'active' : ''}`}
                                    onClick={() => setCustomMode(!customMode)}
                                >
                                    <Ruler size={12} />
                                    {customMode ? 'Standard' : 'Sur-mesure'}
                                </button>
                            </div>

                            {!customMode ? (
                                <>
                                    {/* Standard size pills */}
                                    <div className="size-pills">
                                        {STANDARD_SIZES.map(s => (
                                            <button
                                                key={s}
                                                className={`size-pill ${activeSize === s ? 'active-size' : ''}`}
                                                onClick={() => setActiveSize(s)}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Fit type */}
                                    <span className="settings-label" style={{ marginTop: '0.85rem', display: 'block' }}>COUPE</span>
                                    <div className="fit-type-list">
                                        {FIT_TYPES.map(f => (
                                            <button
                                                key={f.id}
                                                className={`fit-type-btn ${activeFit === f.id ? 'active-fit' : ''}`}
                                                onClick={() => setActiveFit(f.id)}
                                            >
                                                <span className="fit-label">{f.label}</span>
                                                <span className="fit-desc">{f.desc}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Size guide hint */}
                                    <div className="size-guide-hint">
                                        <span>Guide des tailles</span>
                                        <ChevronRight size={12} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Custom measurements */}
                                    <p className="size-custom-note">Entrez vos mesures en cm pour une coupe parfaite.</p>
                                    <div className="measurements-grid">
                                        {MEASUREMENTS.map(m => (
                                            <div key={m.key} className="measurement-field">
                                                <label className="measurement-label">{m.label}</label>
                                                <div className="measurement-input-wrap">
                                                    <input
                                                        type="number"
                                                        className="measurement-input"
                                                        placeholder={m.placeholder}
                                                        value={measurements[m.key]}
                                                        onChange={e => handleMeasurement(m.key, e.target.value)}
                                                        min={0}
                                                    />
                                                    <span className="measurement-unit">{m.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="size-apply-btn">Appliquer les mesures</button>
                                </>
                            )}
                        </div>

                        <div className="settings-section">
                            <div className="settings-section-header">
                                <span className="settings-label">DÉCALS</span>
                                <button className="decal-lib-btn" onClick={() => setDecalLibOpen(true)}>
                                    <Image size={12} /> Bibliothèque
                                </button>
                            </div>

                            {activeDecal ? (
                                <>
                                    <div className="decal-row">
                                        <span className="decal-name">{activeDecal.name}</span>
                                        <div className="decal-actions">
                                            <button className="decal-action-btn" title="Aperçu"><Eye size={14} /></button>
                                            <button className="decal-action-btn" title="Retirer" onClick={() => setActiveDecalId(null)}><X size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="decal-scale">
                                        <div className="decal-progress-bar">
                                            <div className="decal-progress-fill" style={{ width: '65%' }} />
                                        </div>
                                        <span className="decal-scale-label">Échelle 65%</span>
                                    </div>
                                </>
                            ) : (
                                <div style={{ fontSize: '0.78rem', color: '#9ca3af', textAlign: 'center', padding: '0.85rem 0', background: '#f9fafb', borderRadius: '8px', marginBottom: '0.65rem', border: '1px dashed #e5e7eb' }}>
                                    Aucun décal sélectionné
                                </div>
                            )}

                            <button className="add-decal-btn" onClick={() => setDecalLibOpen(true)}>
                                <PlusCircle size={15} /> {activeDecal ? 'Changer le décal' : 'Choisir un décal'}
                            </button>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ===== 3D CLOTHES LIBRARY OVERLAY ===== */}
            {clothesLibOpen && (
                <div className="lib-overlay" onClick={() => setClothesLibOpen(false)}>
                    <div className="lib-drawer lib-drawer-left" onClick={e => e.stopPropagation()}>
                        <div className="lib-drawer-header">
                            <div className="lib-drawer-title">
                                <Shirt size={18} />
                                Bibliothèque 3D — Vêtements
                            </div>
                            <button className="lib-close-btn" onClick={() => setClothesLibOpen(false)}><X size={18} /></button>
                        </div>

                        <div className="lib-category-bar">
                            {CLOTHES_CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`lib-cat-btn ${clothesCategory === cat ? 'active-cat' : ''}`}
                                    onClick={() => setClothesCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="lib-result-count">
                            {CLOTHES_LIBRARY[clothesCategory].length} modèle{CLOTHES_LIBRARY[clothesCategory].length > 1 ? 's' : ''}
                        </div>
                        <div className="lib-grid">
                            {CLOTHES_LIBRARY[clothesCategory].map(item => (
                                <button
                                    key={item.id}
                                    className={`lib-item-card ${selectedClothesItem === item.id ? 'lib-item-active' : ''}`}
                                    onClick={() => {
                                        setSelectedModel(item.name);
                                        setSelectedClothesItem(item.id);
                                        setClothesLibOpen(false);
                                        showToast(`Modèle « ${item.name} » sélectionné`, 'info');
                                    }}
                                >
                                    <div className="lib-item-preview" style={{ background: item.bg, color: item.accent }}>
                                        <Shirt size={28} />
                                    </div>
                                    <div className="lib-item-meta">
                                        <span className="lib-item-name">{item.name}</span>
                                        <span className="lib-item-badge">{item.badge}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="lib-drawer-footer">
                            <button className="lib-import-btn">
                                <UploadCloud size={15} /> Importer un modèle GLTF / OBJ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== DECAL LIBRARY OVERLAY ===== */}
            {decalLibOpen && (
                <div className="lib-overlay" onClick={() => setDecalLibOpen(false)}>
                    <div className="lib-drawer lib-drawer-right" onClick={e => e.stopPropagation()}>
                        <div className="lib-drawer-header">
                            <div className="lib-drawer-title">
                                <Sparkles size={18} />
                                Bibliothèque Décals
                            </div>
                            <button className="lib-close-btn" onClick={() => setDecalLibOpen(false)}><X size={18} /></button>
                        </div>

                        <div className="lib-search-wrap">
                            <Search size={14} className="lib-search-icon" />
                            <input
                                className="lib-search-input"
                                placeholder="Rechercher un décal..."
                                value={decalSearch}
                                onChange={e => setDecalSearch(e.target.value)}
                            />
                        </div>

                        <div className="lib-category-bar">
                            {DECAL_CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`lib-cat-btn ${decalCategory === cat ? 'active-cat' : ''}`}
                                    onClick={() => { setDecalCategory(cat); setDecalSearch(''); }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="lib-result-count">
                            {filteredDecals.length} décal{filteredDecals.length !== 1 ? 's' : ''}
                            {decalSearch && ` pour « ${decalSearch} »`}
                        </div>

                        {filteredDecals.length === 0 ? (
                            <div className="lib-empty">
                                <Image size={36} />
                                <p>Aucun résultat pour « {decalSearch} »</p>
                            </div>
                        ) : (
                            <div className="lib-grid decal-lib-grid">
                                {filteredDecals.map(d => (
                                    <button
                                        key={d.id}
                                        className={`lib-item-card decal-item-card ${activeDecalId === d.id ? 'lib-item-active' : ''}`}
                                        onClick={() => setActiveDecalId(d.id)}
                                    >
                                        <div className="decal-item-preview">{d.preview}</div>
                                        <div className="lib-item-meta">
                                            <span className="lib-item-name">{d.name}</span>
                                            <span className="lib-item-badge"><Tag size={9} /> {d.tag}</span>
                                        </div>
                                        {activeDecalId === d.id && (
                                            <span className="decal-selected-mark">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="lib-drawer-footer">
                            <button
                                className="lib-apply-btn"
                                disabled={!activeDecalId}
                                onClick={() => {
                                    setDecalLibOpen(false);
                                    if (activeDecalId) showToast('Décal appliqué avec succès !', 'success');
                                }}
                            >
                                <PlusCircle size={14} />
                                {activeDecalId ? `Appliquer « ${activeDecal?.name} »` : 'Sélectionnez un décal'}
                            </button>
                            <button className="lib-import-btn">
                                <UploadCloud size={14} /> Importer une image / SVG
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast notification */}
            {toast && (
                <div className={`editor-toast editor-toast-${toast.type}`}>
                    <span className="toast-dot" />
                    {toast.msg}
                </div>
            )}
        </>
    );
};

export default Editor;
