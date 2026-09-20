import { useEffect, useState } from "react";
import products from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Icon from "./components/Icon";
import useProductSearch from "./hooks/useProductSearch";
import useStoredState from "./hooks/useStoredState";
import "./App.css";
const route = () => {
  const hash = window.location.hash;
  return hash.startsWith("#/about")
    ? "about"
    : hash.startsWith("#/contact")
      ? "contact"
      : "shop";
};
const validFavorites = (value) =>
  Array.isArray(value) &&
  value.every((id) => products.some((p) => p.id === id));
const validBag = (value) =>
  Array.isArray(value) &&
  new Set(value.map((i) => i?.id)).size === value.length &&
  value.every(
    (i) =>
      i &&
      products.some((p) => p.id === i.id && p.inStock) &&
      Number.isInteger(i.quantity) &&
      i.quantity > 0 &&
      i.quantity <= 99,
  );
export default function App() {
  const [page, setPage] = useState(route);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useStoredState(
    "ar-favorites-v1",
    validFavorites,
  );
  const [bag, setBag] = useStoredState("ar-bag-v1", validBag);
  const [notice, setNotice] = useState("");
  const [limit, setLimit] = useState(16);
  useEffect(() => {
    const onHash = () => {
      setPage(route());
      if (window.location.hash.startsWith("#/"))
        window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    document.title = `${page === "about" ? "Our Story" : page === "contact" ? "Get in Touch" : "Handmade Treasures"} | Arizona Roadrunner`;
  }, [page]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  const { categories, filteredProducts } = useProductSearch({
    products,
    searchTerm,
    selectedCategory,
    sortOption,
    inStockOnly,
  });
  const results = filteredProducts.filter(
    (p) =>
      (maxPrice === "all" || p.price <= Number(maxPrice)) &&
      (!savedOnly || favorites.includes(p.id)),
  );
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("featured");
    setInStockOnly(false);
    setMaxPrice("all");
    setSavedOnly(false);
    setLimit(16);
  };
  const change = (setter) => (value) => {
    setter(value);
    setLimit(16);
  };
  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  function addToBag(product, quantity = 1) {
    if (!product.inStock) return;
    setBag((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
              : i,
          )
        : [...prev, { id: product.id, quantity }];
    });
    setNotice(`${product.name} added to your bag`);
  }
  const items = bag.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id),
  }));
  const showSaved = () => {
    setSavedOnly(true);
    setSearchTerm("");
    setSelectedCategory("all");
    setMaxPrice("all");
    setInStockOnly(false);
    setLimit(16);
    if (page !== "shop") window.location.hash = "/shop";
    setTimeout(
      () =>
        document
          .getElementById("collection")
          ?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };
  return (
    <>
      <Header
        page={page}
        cartCount={bag.reduce((sum, i) => sum + i.quantity, 0)}
        favoriteCount={favorites.length}
        onCart={() => setCartOpen(true)}
        onFavorites={showSaved}
      />
      <main id="main">
        <Hero page={page} />
        {page === "shop" ? (
          <>
            <div className="discovery-strip">
              <div className="wrap">
                <span>
                  <Icon name="spark" /> Pieces with personality
                </span>
                <span>
                  <Icon name="heart" /> Chosen with intention
                </span>
                <span>
                  <Icon name="bag" /> Finds for every kind of you
                </span>
              </div>
            </div>
            <section
              className="catalog wrap"
              id="collection"
              aria-labelledby="catalog-title"
            >
              <div className="catalog-intro">
                <div>
                  <span className="eyebrow">The collection</span>
                  <h2 id="catalog-title">
                    Good things. <em>Great finds.</em>
                  </h2>
                  <p>A little unexpected. A lot to fall in love with.</p>
                </div>
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={change(setSearchTerm)}
                  onClearSearch={() => setSearchTerm("")}
                />
              </div>
              <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={change(setSelectedCategory)}
                sortOption={sortOption}
                onSortChange={change(setSortOption)}
                inStockOnly={inStockOnly}
                onStockChange={change(setInStockOnly)}
                onClearFilters={clearFilters}
                hasActiveFilters={
                  !!searchTerm ||
                  selectedCategory !== "all" ||
                  sortOption !== "featured" ||
                  inStockOnly ||
                  maxPrice !== "all" ||
                  savedOnly
                }
                maxPrice={maxPrice}
                onPriceChange={change(setMaxPrice)}
                savedOnly={savedOnly}
                onSavedChange={change(setSavedOnly)}
                count={results.length}
              />
              <ProductGrid
                products={results.slice(0, limit)}
                favorites={favorites}
                onProductSelect={setSelectedProduct}
                onToggleFavorite={toggleFavorite}
                onAdd={addToBag}
                onClear={clearFilters}
              />
              {results.length > 0 && (
                <div className="load-more">
                  <p>
                    You’ve discovered {Math.min(limit, results.length)} of{" "}
                    {results.length} treasures
                  </p>
                  <div className="progress">
                    <span
                      style={{
                        width: `${Math.min(limit / results.length, 1) * 100}%`,
                      }}
                    />
                  </div>
                  {limit < results.length && (
                    <button
                      className="button"
                      onClick={() => setLimit((n) => n + 16)}
                    >
                      There’s more to discover <Icon name="plus" />
                    </button>
                  )}
                </div>
              )}
            </section>
            <section className="editorial">
              <div className="wrap editorial__inner">
                <div>
                  <span className="eyebrow">Less ordinary. More you.</span>
                  <h2>
                    Not just a thing.
                    <br />
                    <em>Your kind of thing.</em>
                  </h2>
                  <p>
                    A home that tells your story. A gift that says “I saw this
                    and thought of you.” That’s what we’re here for.
                  </p>
                  <a href="#/about" className="text-link">
                    Meet Arizona Roadrunner <span>↗</span>
                  </a>
                </div>
                <div className="editorial__art">
                  <span aria-hidden="true">✦</span>
                  <p>
                    Made with heart.
                    <br />
                    Found with love.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : page === "about" ? (
          <Story />
        ) : (
          <Contact />
        )}
      </main>
      <footer className="footer">
        <div className="wrap footer__top">
          <a className="brand" href="#/">
            <Icon name="spark" />
            <span>
              Arizona<strong>Roadrunner.</strong>
            </span>
          </a>
          <p>
            Handmade treasures.
            <br />A little desert soul.
          </p>
          <div>
            <span className="eyebrow">Wander a little</span>
            <a href="#/shop">The collection</a>
            <a href="#/about">Our story</a>
            <a href="#/contact">Get in touch</a>
          </div>
          <div>
            <span className="eyebrow">Say hello</span>
            <a href="mailto:hello@arizonaroadrunner.com">
              hello@arizonaroadrunner.com ↗
            </a>
            <span>Inspired by Arizona.</span>
          </div>
        </div>
        <div className="wrap footer__bottom">
          <span>© {new Date().getFullYear()} Arizona Roadrunner</span>
          <span>Independent spirit. Thoughtfully chosen.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToBag}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(selectedProduct.id)}
        />
      )}
      <Cart
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onQuantity={(id, quantity) =>
          setBag((prev) =>
            quantity <= 0
              ? prev.filter((i) => i.id !== id)
              : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
          )
        }
      />
      <div
        className={`toast ${notice ? "toast--visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Icon name="check" />
            <span>{notice}</span>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setCartOpen(true);
                setNotice("");
              }}
            >
              View bag
            </button>
          </>
        )}
      </div>
    </>
  );
}
