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
            {/* Left — fashion image */}
            <div className="auth-left">
                <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
                    alt="ClothLab Fashion"
                />
                <div className="auth-left-overlay">
                    <Link to="/" className="auth-logo-link">
                        <img src="/SVG/Asset 2.svg" alt="ClothLab" className="auth-logo-img" />
                    </Link>
                    <div className="auth-quote">
                        <p>"Design the future of fashion,<br />one stitch at a time."</p>
                        <cite>— ClothLab Studio</cite>
                    </div>
                    <div className="auth-stats-row">
                        {[
                            { val: '10k+', label: 'Créateurs' },
                            { val: '500k+', label: 'Designs' },
                            { val: '200+', label: 'Matières' },
                        ].map(s => (
                            <div key={s.label} className="auth-stat">
                                <span className="auth-stat-val">{s.val}</span>
                                <span className="auth-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right — form */}
            <div className="auth-right">
                <div className="auth-form-wrap">
                    <div className="auth-form-header">
                        <h1>{mode === 'login' ? 'Bienvenue' : 'Créer un compte'}</h1>
                        <p>
                            {mode === 'login'
                                ? 'Connectez-vous à votre espace ClothLab.'
                                : 'Rejoignez la prochaine génération de créateurs.'}
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
                                    placeholder="••••••••"
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
                                <a href="#">Mot de passe oublié ?</a>
                            </div>
                        )}

                        {mode === 'signup' && (
                            <div className="auth-field">
                                <label>Rôle</label>
                                <select
                                    className="auth-select"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                >
                                    <option value="consumer">Créateur / Consommateur</option>
                                    <option value="manufacturer">Fabricant</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" className="auth-submit-btn">
                            {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
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
                        {mode === 'login' ? "Pas encore de compte ? " : 'Déjà un compte ? '}
                        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                            {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
