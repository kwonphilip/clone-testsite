import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/skin-treatments', label: 'Skin' },
  { to: '/beauty-treatments', label: 'Beauty' },
  { to: '/spa-treatments', label: 'Spa' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} ref={menuRef}>
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-icon">✦</span>
          <span className="header__logo-text">
            Rejuvi<span>-Skin</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/appointments" className="btn btn--primary btn--sm header__cta">
            Book Now
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`header__mobile-nav${menuOpen ? ' header__mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `header__mobile-link${isActive ? ' header__mobile-link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/appointments" className="header__mobile-cta" onClick={closeMenu}>
            Book an Appointment
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="header__overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}
