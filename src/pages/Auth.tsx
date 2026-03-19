import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [showPass, setShowPass] = useState(false);
    const [role, setRole] = useState('consumer');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(role === 'manufacturer' ? '/manufacturer' : '/consumer');
    };

    return (
        <div className="auth-page">
            {/* Left ‚dtî fashion image */}
            <div className="auth-left">
                <img
                    src="/catalog_hero.png"
                    alt="ClothLab Fashion"
                />
                <div className="auth-left-overlay">
                    <Link to="/" className="auth-logo-link">
                        <img src="/SVG/Asset 2.svg" alt="ClothLab" className="auth-logo-img" />
                    </Link>
                    <div className="auth-quote">
                        <p>"Design the future of fashion,<br />one stitch at a time."</p>
                        <cite>‚dtî ClothLab Studio</cite>
                    </div>
                    <div className="auth-stats-row">
                        {[
                            { val: '10k+', label: 'Cr√©ateurs' },
                            { val: '500k+', label: 'Designs' },
                            { val: '200+', label: 'Mati√®res' },
                        ].map(s => (
                            <div key={s.label} className="auth-stat">
                                <span className="auth-stat-val">{s.val}</span>
                                <span className="auth-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right ‚dtî form */}
            <div className="auth-right">
                <div className="auth-form-wrap">
                    <div className="auth-form-header">
                        <h1 className="split-heading auth-split-heading">
                            {mode === 'login'
                                ? <><span className="sh-italic">Bienvenue</span><span className="sh-bold">sur ClothLab.</span></>
                                : <><span className="sh-italic">Rejoignez</span><span className="sh-bold">la r√©volution.</span></>}
                        </h1>
                        <p>
                            {mode === 'login'
                                ? 'Connectez-vous √† votre espace ClothLab.'
                                : 'Rejoignez la prochaine g√©n√©ration de cr√©ateurs.'}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="auth-tabs">
                        <button
                            className={mode === 'login' ? 'active' : ''}
                            onClick={() => setMode('login')}
                        >
                            Connexion
                        </button>
                        <button
                            className={mode === 'signup' ? 'active' : ''}
                            onClick={() => setMode('signup')}
                        >
                            Inscription
                        </button>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {mode === 'signup' && (
                            <div className="auth-field">
                                <label>
                                    <User size={14} /> Nom complet
                                </label>
                                <input type="text" placeholder="Mahdi Benali" required />
                            </div>
                        )}

                        <div className="auth-field">
                            <label>
                                <Mail size={14} /> Email
                            </label>
                            <input type="email" placeholder="vous@example.com" required />
                        </div>

                        <div className="auth-field">
                            <label>
                                <Lock size={14} /> Mot de passe
                            </label>
                            <div className="auth-input-wrap">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="‚dt¢‚dt¢‚dt¢‚dt¢‚dt¢‚dt¢‚dt¢‚dt¢"
                                    required
                                />
                                <button
                                    type="button"
                                    className="auth-eye-btn"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div className="auth-forgot">
                                <a href="#">Mot de passe oubli√© ?</a>
                            </div>
                        )}

                        {mode === 'signup' && (
                            <div className="auth-field">
                                <label>R√¥le</label>
                                <select
                                    className="auth-select"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                >
                                    <option value="consumer">Cr√©ateur / Consommateur</option>
                                    <option value="manufacturer">Fabricant</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" className="auth-submit-btn">
                            {mode === 'login' ? 'Se connecter' : 'Cr√©er mon compte'}
                            <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>ou continuer avec</span>
                    </div>

                    <div className="auth-socials">
                        <button className="auth-social-btn">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                width={18}
                            />
                            Google
                        </button>
                        <button className="auth-social-btn">
                            <img
                                src="https://www.svgrepo.com/show/448234/github.svg"
                                alt="GitHub"
                                width={18}
                            />
                            GitHub
                        </button>
                    </div>

                    <p className="auth-switch">
                        {mode === 'login' ? "Pas encore de compte ? " : 'D√©j√† un compte ? '}
                        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                            {mode === 'login' ? 'Cr√©er un compte' : 'Se connecter'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
