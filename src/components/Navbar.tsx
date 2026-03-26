import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layers, Gem, Factory, BadgeDollarSign, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOutUser } from '../services/authService';
import './Navbar.css';

const navItems = [
  { label: 'Studio 3D', href: '/editor', icon: <Layers size={15} /> },
  { label: 'Catalogue', href: '/catalog', icon: <Gem size={15} /> },
  { label: 'Fabricants', href: '/manufacturer', icon: <Factory size={15} /> },
  { label: 'Tarifs', href: '/#pricing', icon: <BadgeDollarSign size={15} /> },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  if (location.pathname === '/editor') return null;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/#')) return false;
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/');
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo-section">
          <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <img src="/SVG/Asset 2.svg" alt="Clothlab" className="logo-img" />
          </Link>
          <div className="navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="navbar-actions">
          {!currentUser ? (
            <>
              <Link
                to="/auth"
                className={`nav-login ${isActive('/auth') ? 'nav-login-active' : ''}`}
              >
                Se connecter
              </Link>
              <Link to="/editor" className="btn-get-started">Commencer →</Link>
            </>
          ) : (
            <>
              <Link to="/editor" className="btn-get-started">Studio 3D</Link>
              <Link to="/profile" className="navbar-avatar" title={userData?.displayName || 'Mon profil'}>
                <img
                  src={userData?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.displayName || 'User')}&background=6366f1&color=fff`}
                  alt="Profil"
                />
                {isActive('/profile') && <span className="avatar-active-ring" />}
              </Link>
            </>
          )}
        </div>

        {/* Hamburger �dt� mobile only */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`mobile-nav-link ${isActive(item.href) ? 'mobile-nav-link-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav-divider" />

          {currentUser ? (
            <>
              <Link to="/profile" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <User size={15} /> {userData?.displayName || 'Mon profil'}
              </Link>
              <button onClick={handleLogout} className="mobile-nav-link" style={{ width: '100%', textAlign: 'left' }}>
                <LogOut size={15} /> Se déconnecter
              </button>
            </>
          ) : (
            <Link to="/auth" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Se connecter
            </Link>
          )}

          <Link to="/editor" className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>
            Commencer →
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
