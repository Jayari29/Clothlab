import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSent(true);
            setEmail('');
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo-link">
                        <img src="/SVG/Asset 2.svg" alt="ClothLab" className="footer-logo-img" />
                    </Link>
                    <p>Transforming clothing creation into a simple, immersive and accessible 3D experience.</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Twitter" className="footer-social-icon">𝕏</a>
                        <a href="#" aria-label="Instagram" className="footer-social-icon">&#9679;</a>
                        <a href="#" aria-label="LinkedIn" className="footer-social-icon">in</a>
                    </div>
                </div>
                <div className="footer-links-group">
                    <h4>Plateforme</h4>
                    <Link to="/catalog">Bibliothèque de modèles</Link>
                    <Link to="/editor">Éditeur 3D</Link>
                    <Link to="/consumer">Espace Créateur</Link>
                    <Link to="/manufacturer">Portail Fabricant</Link>
                </div>
                <div className="footer-links-group">
                    <h4>Entreprise</h4>
                    <a href="#">À propos</a>
                    <a href="#">Contact</a>
                    <a href="#">Conditions d'utilisation</a>
                    <a href="#">Politique de confidentialité</a>
                </div>
                <div className="footer-links-group">
                    <h4>Contact</h4>
                    <a href="mailto:hello@clothlab.io">hello@clothlab.io</a>
                    <a href="#">+33 1 23 45 67 89</a>
                    <a href="#">Paris, France</a>
                </div>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
                <div className="footer-newsletter-text">
                    <h4>Restez informé</h4>
                    <p>Nouveaux modèles, drops exclusifs et mises à jour.</p>
                </div>
                {sent ? (
                    <p className="footer-newsletter-thanks">✓ Merci ! Vous êtes abonné.</p>
                ) : (
                    <form className="footer-newsletter-form" onSubmit={handleNewsletter}>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                        />
                        <button type="submit">S'abonner →</button>
                    </form>
                )}
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ClothLab. Tous droits réservés.</p>
                <div className="footer-bottom-links">
                    <a href="#">Confidentialité</a>
                    <a href="#">CGU</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
