import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Gem, Factory, BadgeDollarSign, Menu, X, User } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { label: 'Studio 3D', href: '/editor', icon: <Layers size={15} /> },
  { label: 'Catalogue', href: '/catalog', icon: <Gem size={15} /> },
  { label: 'Fabricants', href: '/manufacturer', icon: <Factory size={15} /> },
  { label: 'Tarifs', href: '/#pricing', icon: <BadgeDollarSign size={15} /> },
];

const Navbar = () => {
  const location = useLocation();
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
          <Link
            to="/auth"
            className={`nav-login ${isActive('/auth') ? 'nav-login-active' : ''}`}
          >
            Se connecter
          </Link>
          <Link to="/editor" className="btn-get-started">Commencer →</Link>
          <Link to="/profile" className="navbar-avatar" title="Mon profil">
            <img src="https://i.pravatar.cc/36?img=47" alt="Profil" />
            {isActive('/profile') && <span className="avatar-active-ring" />}
          </Link>
        </div>

        {/* Hamburger — mobile only */}
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
          <Link to="/profile" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            <User size={15} /> Mon profil
          </Link>
          <Link to="/auth" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            Se connecter
          </Link>
          <Link to="/editor" className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>
            Commencer →
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
