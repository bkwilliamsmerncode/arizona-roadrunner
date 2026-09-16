import { useState } from "react";

import products from "./data/products";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";

import useProductSearch from "./hooks/useProductSearch";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    categories,
    filteredProducts,
  } = useProductSearch({
    products,
    searchTerm,
    selectedCategory,
    sortOption,
    inStockOnly,
  });

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    selectedCategory !== "all" ||
    sortOption !== "featured" ||
    inStockOnly;

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("featured");
    setInStockOnly(false);
  };

  return (
    <div className="app">

      <Header />

      <main>

        <Hero />

        <section
          id="shop"
          className="catalog"
          aria-labelledby="catalog-title"
        >
          <div className="catalog__container">

            <div className="catalog__intro">

              <div>
                <span className="catalog__eyebrow">
                  THE COLLECTION
                </span>

                <h2
                  id="catalog-title"
                  className="catalog__title"
                >
                  Handmade Treasures
                </h2>

                <p className="catalog__description">
                  Discover one-of-a-kind handmade pieces
                  crafted with creativity, character, and a
                  little Arizona soul.
                </p>
              </div>

              <div className="catalog__count">
                <span>
                  {filteredProducts.length}
                </span>

                <small>
                  {filteredProducts.length === 1
                    ? "Treasure"
                    : "Treasures"}
                </small>
              </div>

            </div>

            <div className="catalog__controls">

              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={clearSearch}
              />

              <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortOption={sortOption}
                onSortChange={setSortOption}
                inStockOnly={inStockOnly}
                onStockChange={setInStockOnly}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />

            </div>

            <div className="catalog__results">

              {searchTerm.trim() && (
                <p className="catalog__search-status">
                  Showing results for{" "}
                  <strong>
                    "{searchTerm}"
                  </strong>
                </p>
              )}

              <ProductGrid
                products={filteredProducts}
                onProductSelect={setSelectedProduct}
              />

            </div>

          </div>
        </section>

        <section
          id="featured"
          className="featured-section"
        >
          <div className="featured-section__container">

            <span className="featured-section__eyebrow">
              MADE WITH HEART
            </span>

            <h2>
              Every piece has a story.
            </h2>

            <p>
              Arizona Roadrunner celebrates handmade
              creations that are a little different,
              a little unexpected, and completely unique.
            </p>

          </div>
        </section>

        <section
          id="about"
          className="about-section"
        >
          <div className="about-section__container">

            <div className="about-section__content">

              <span className="about-section__eyebrow">
                ABOUT ARIZONA ROADRUNNER
              </span>

              <h2>
                Handmade.
                <br />
                Original.
                <br />
                Arizona.
              </h2>

              <p>
                Arizona Roadrunner is a growing collection
                of handmade treasures created for people who
                appreciate things that feel personal,
                creative, and different.
              </p>

              <p>
                From small gifts to statement pieces,
                every item is selected with the goal of
                bringing something special into your home.
              </p>

            </div>

          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
        >
          <div className="contact-section__container">

            <span className="contact-section__eyebrow">
              GET IN TOUCH
            </span>

            <h2>
              Have something special in mind?
            </h2>

            <p>
              Custom creations and questions are always
              welcome.
            </p>

            <a
              className="contact-section__button"
              href="mailto:hello@arizonaroadrunner.com"
            >
              Contact Arizona Roadrunner
            </a>

          </div>
        </section>

      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <footer className="site-footer">

        <div className="site-footer__container">

          <div className="site-footer__brand">
            <span className="site-footer__name">
              Arizona Roadrunner
            </span>

            <p>
              Handmade treasures with a little desert soul.
            </p>
          </div>

          <nav
            className="site-footer__navigation"
            aria-label="Footer navigation"
          >
            <a href="#shop">
              Shop
            </a>

            <a href="#featured">
              Featured
            </a>

            <a href="#about">
              About
            </a>

            <a href="#contact">
              Contact
            </a>
          </nav>

          <div className="site-footer__bottom">

            <span>
              © {new Date().getFullYear()} Arizona Roadrunner
            </span>

            <span>
              Handmade in Arizona
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;