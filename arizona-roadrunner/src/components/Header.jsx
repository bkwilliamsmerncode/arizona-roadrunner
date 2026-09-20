import Icon from "./Icon";
import "./Header.css";
export default function Header({ page, cartCount, onCart }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="header">
        <div className="wrap header__inner">
          <a className="brand" href="#/" aria-label="Arizona Roadrunner home">
            <Icon name="spark" />
            <span>
              Arizona<strong>Roadrunner</strong>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a
              href="#/shop"
              aria-current={page === "shop" ? "page" : undefined}
            >
              Shop
            </a>
            <a
              href="#/about"
              aria-current={page === "about" ? "page" : undefined}
            >
              Our Story
            </a>
            <a
              href="#/contact"
              aria-current={page === "contact" ? "page" : undefined}
            >
              Contact
            </a>
          </nav>
          <button
            className="bag-button"
            onClick={onCart}
            aria-label={`Shopping bag (${cartCount})`}
          >
            <Icon name="bag" />
            <b>{cartCount}</b>
          </button>
        </div>
      </header>
    </>
  );
}
