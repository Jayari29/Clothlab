import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signInWithGithub } from '../services/authService';
import { UserRole } from '../types/database';
import { images } from '../config/images';
import './Auth.css';

const Auth = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [showPass, setShowPass] = useState(false);
    const [role, setRole] = useState<UserRole>('designer');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(images.auth.fashionShow);
    const navigate = useNavigate();

    // Rotate background images every 5 seconds
    useEffect(() => {
        const authImages = [images.auth.fashionShow, images.auth.designer, images.auth.background];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % authImages.length;
            setBackgroundImage(authImages[currentIndex]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                await signUpWithEmail(email, password, displayName, role);
            } else {
                await signInWithEmail(email, password);
            }

            // Navigate based on role
            if (role === 'manufacturer') {
                navigate('/manufacturer');
            } else if (role === 'designer') {
                navigate('/consumer');
            } else {
                navigate('/'); // Admin goes to home for now
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            await signInWithGoogle(role);
            // Navigate based on role
            if (role === 'manufacturer') {
                navigate('/manufacturer');
            } else {
                navigate('/consumer');
            }
        } catch (err: any) {
            setError(err.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            await signInWithGithub(role);
            // Navigate based on role
            if (role === 'manufacturer') {
                navigate('/manufacturer');
            } else {
                navigate('/consumer');
            }
        } catch (err: any) {
            setError(err.message || 'GitHub sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left — fashion image */}
            <div className="auth-left">
                <img
                    src={backgroundImage}
                    alt="ClothLab Fashion"
                    style={{ transition: 'opacity 1s ease-in-out' }}
                />
                <div className="auth-left-overlay">
                    <Link to="/" className="auth-logo-link">
                        <img src="/SVG/Asset 2.svg" alt="ClothLab" className="auth-logo-img" />
                    </Link>
                    <div className="auth-quote">
                        <p>"Design the future of fashion,<br />one stitch at a time."</p>
                        <cite>�dt� ClothLab Studio</cite>
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

            {/* Right �dt� form */}
            <div className="auth-right">
                <div className="auth-form-wrap">
                    <div className="auth-form-header">
                        <h1 className="split-heading auth-split-heading">
                            {mode === 'login'
                                ? <><span className="sh-italic">Bienvenue</span><span className="sh-bold">sur ClothLab.</span></>
                                : <><span className="sh-italic">Rejoignez</span><span className="sh-bold">la révolution.</span></>}
                        </h1>
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
                        {error && (
                            <div className="auth-error">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        {mode === 'signup' && (
                            <div className="auth-field">
                                <label>
                                    <User size={14} /> Nom complet
                                </label>
                                <input type="text" placeholder="Mahdi Benali" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                            </div>
                        )}

                        <div className="auth-field">
                            <label>
                                <Mail size={14} /> Email
                            </label>
                            <input type="email" placeholder="vous@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="auth-field">
                            <label>
                                <Lock size={14} /> Mot de passe
                            </label>
                            <div className="auth-input-wrap">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    onChange={e => setRole(e.target.value as UserRole)}
                                >
                                    <option value="designer">Créateur / Consommateur</option>
                                    <option value="manufacturer">Fabricant</option>
                                    <option value="admin">Administrateur</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Chargement...
                                </>
                            ) : (
                                <>
                                    {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>ou continuer avec</span>
                    </div>

                    <div className="auth-socials">
                        <button className="auth-social-btn" onClick={handleGoogleSignIn} type="button" disabled={loading}>
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                width={18}
                            />
                            Google
                        </button>
                        <button className="auth-social-btn" onClick={handleGithubSignIn} type="button" disabled={loading}>
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
