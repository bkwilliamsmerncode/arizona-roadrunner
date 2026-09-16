import { useState } from "react";

import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">

        {/* Logo */}
        <a
          className="brand"
          href="/"
          aria-label="Arizona Roadrunner home"
          onClick={closeMenu}
        >
          <span className="brand-icon" aria-hidden="true">
            🏜️
          </span>

          <span className="brand-text">
            <span className="brand-name">Arizona</span>
            <span className="brand-name brand-name--accent">
              Roadrunner
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="desktop-navigation"
          aria-label="Main navigation"
        >
          <a href="#shop">Shop</a>
          <a href="#featured">Featured</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">

          <button
            type="button"
            className="cart-button"
            aria-label="Shopping cart"
          >
            <span aria-hidden="true">🛒</span>
            <span className="cart-count">0</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`menu-button ${
              isMenuOpen ? "menu-button--open" : ""
            }`}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${
          isMenuOpen ? "mobile-navigation--open" : ""
        }`}
        aria-label="Mobile navigation"
      >
        <a href="#shop" onClick={closeMenu}>
          Shop
        </a>

        <a href="#featured" onClick={closeMenu}>
          Featured
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;