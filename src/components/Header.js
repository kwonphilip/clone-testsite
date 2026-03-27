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

  /**
   * Two separate refs are needed because the mobile nav and overlay are
   * rendered OUTSIDE the <header> element (see the JSX structure below).
   *
   * Why outside? The <header> has `backdrop-filter: blur()`, which creates
   * a new stacking context and makes the header the *containing block* for
   * any `position: fixed` descendants. This traps the mobile nav and overlay
   * inside the header's stacking context, causing them to render behind page
   * content. Moving them outside the <header> element entirely avoids this.
   */
  const headerRef = useRef(null); // The fixed header bar
  const navRef    = useRef(null); // The slide-in mobile nav panel

  // Add scroll shadow to header after user scrolls down 24px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu when the user clicks outside both the header bar and the nav panel.
  // We check both refs because the two elements are DOM siblings, not parent/child.
  useEffect(() => {
    const handleClickOutside = (e) => {
      const inHeader = headerRef.current?.contains(e.target);
      const inNav    = navRef.current?.contains(e.target);
      if (!inHeader && !inNav) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll while the mobile menu is open so the overlay
  // feels like a true modal surface rather than scrolling behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Header bar ────────────────────────────────────────────────── */}
      <header
        className={`header${scrolled ? ' header--scrolled' : ''}`}
        ref={headerRef}
      >
        <div className="header__inner">

          {/* Logo */}
          <Link to="/" className="header__logo" onClick={closeMenu}>
            <span className="header__logo-icon">✦</span>
            <span className="header__logo-text">
              Rejuvi<span>-Skin</span>
            </span>
          </Link>

          {/* Desktop navigation links */}
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

          {/* Hamburger button — animates to ✕ when menu is open */}
          <button
            className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </header>

      {/* ── Mobile nav panel ──────────────────────────────────────────────
       *  Rendered as a sibling of <header>, NOT a child, so the header's
       *  backdrop-filter does not trap this element in the header's
       *  stacking context. z-index: 1001 keeps it above all page content.
       * ────────────────────────────────────────────────────────────────── */}
      <div
        ref={navRef}
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

      {/* ── Dim overlay ───────────────────────────────────────────────────
       *  Also a sibling of <header> for the same stacking-context reason.
       *  z-index: 999 — above page content but below the header (1000)
       *  so the header bar remains accessible while the menu is open.
       * ────────────────────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="header__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
