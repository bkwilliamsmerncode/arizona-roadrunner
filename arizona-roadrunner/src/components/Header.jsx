import Icon from "./Icon";
import "./Header.css";
export default function Header({
  page,
  cartCount,
  favoriteCount,
  onCart,
  onFavorites,
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        A little desert soul. A world of extraordinary finds.{" "}
        <span>Thoughtfully chosen · Southwest inspired</span>
      </div>
      <header className="header">
        <div className="wrap header__inner">
          <a className="brand" href="#/" aria-label="Arizona Roadrunner home">
            <Icon name="spark" />
            <span>
              Arizona
              <strong>
                Roadrunner<span className="brand__dot">.</span>
              </strong>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a
              href="#/shop"
              aria-current={page === "shop" ? "page" : undefined}
            >
              The collection
            </a>
            <a
              href="#/about"
              aria-current={page === "about" ? "page" : undefined}
            >
              Our story
            </a>
            <a
              href="#/contact"
              aria-current={page === "contact" ? "page" : undefined}
            >
              Get in touch
            </a>
          </nav>
          <div className="header__actions">
            <button
              className="icon-button"
              onClick={onFavorites}
              aria-label={`Saved items (${favoriteCount})`}
            >
              <Icon name="heart" />
              {favoriteCount > 0 && <b>{favoriteCount}</b>}
            </button>
            <button
              className="bag-button"
              onClick={onCart}
              aria-label={`Shopping bag (${cartCount})`}
            >
              <Icon name="bag" />
              <span>Bag</span>
              <b>{cartCount}</b>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
