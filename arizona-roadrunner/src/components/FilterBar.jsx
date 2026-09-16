import "./FilterBar.css";

function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  inStockOnly,
  onStockChange,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__top">

        <div className="filter-bar__category-group">
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => {
              onCategoryChange(event.target.value);
            }}
          >
            <option value="all">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-bar__sort-group">
          <label htmlFor="sort-filter">
            Sort
          </label>

          <select
            id="sort-filter"
            value={sortOption}
            onChange={(event) => {
              onSortChange(event.target.value);
            }}
          >
            <option value="featured">
              Featured
            </option>

            <option value="price-low">
              Price: Low → High
            </option>

            <option value="price-high">
              Price: High → Low
            </option>

            <option value="name-az">
              Name: A → Z
            </option>

            <option value="name-za">
              Name: Z → A
            </option>
          </select>
        </div>

      </div>

      <div className="filter-bar__bottom">

        <label className="filter-bar__stock">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => {
              onStockChange(event.target.checked);
            }}
          />

          <span className="filter-bar__checkbox">
            <span>✓</span>
          </span>

          <span>
            Show available items only
          </span>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-bar__clear"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        )}

      </div>
    </div>
  );
}

export default FilterBar;