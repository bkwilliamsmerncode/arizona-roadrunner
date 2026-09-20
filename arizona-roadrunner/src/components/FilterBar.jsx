import { useState } from "react";
import "./FilterBar.css";
export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  inStockOnly,
  onStockChange,
  onClearFilters,
  hasActiveFilters,
  maxPrice,
  onPriceChange,
  savedOnly,
  onSavedChange,
  count,
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="filters">
      <div className="category-tabs" aria-label="Product categories">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={selectedCategory === c}
            onClick={() => onCategoryChange(c)}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <p role="status">
          <strong>
            {count} {count === 1 ? "treasure" : "treasures"}
          </strong>
        </p>
        <div className="filter-row__options">
          <button
            className="filters-toggle"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="extra-filters"
          >
            Filters {hasActiveFilters ? "•" : ""}{" "}
            <span>{expanded ? "−" : "+"}</span>
          </button>
          <label>
            Sort{" "}
            <select
              aria-label="Sort products"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </label>
          {hasActiveFilters && (
            <button className="text-link" onClick={onClearFilters}>
              Reset
            </button>
          )}
        </div>
      </div>
      <div id="extra-filters" hidden={!expanded} className="extra-filters">
        <label>
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => onSavedChange(e.target.checked)}
          />{" "}
          Saved favorites
        </label>
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onStockChange(e.target.checked)}
          />{" "}
          Available items
        </label>
        <label>
          Price{" "}
          <select
            value={maxPrice}
            onChange={(e) => onPriceChange(e.target.value)}
          >
            <option value="all">Any price</option>
            <option value="25">$25 & under</option>
            <option value="50">$50 & under</option>
            <option value="100">$100 & under</option>
          </select>
        </label>
      </div>
    </div>
  );
}
