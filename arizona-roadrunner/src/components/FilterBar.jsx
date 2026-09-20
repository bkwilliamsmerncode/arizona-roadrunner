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
  return (
    <div className="filters">
      <div className="category-tabs" aria-label="Product categories">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={selectedCategory === c}
            onClick={() => onCategoryChange(c)}
          >
            {c === "all" ? "All treasures" : c}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <p role="status">
          <strong>{count}</strong> {count === 1 ? "treasure" : "treasures"} to
          discover
        </p>
        <div className="filter-row__options">
          <label>
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(e) => onSavedChange(e.target.checked)}
            />{" "}
            Saved
          </label>
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onStockChange(e.target.checked)}
            />{" "}
            Available
          </label>
          <label>
            <span className="sr-only">Price range</span>
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
          <label>
            <span className="sr-only">Sort products</span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="featured">Featured first</option>
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
    </div>
  );
}
