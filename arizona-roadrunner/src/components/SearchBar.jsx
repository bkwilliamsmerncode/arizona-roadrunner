import "./SearchBar.css";

function SearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) {
  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="search-bar">
      <label
        className="search-bar__label"
        htmlFor="product-search"
      >
        Search the collection
      </label>

      <div className="search-bar__wrapper">
        <span
          className="search-bar__icon"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          id="product-search"
          className="search-bar__input"
          type="search"
          value={searchTerm}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          placeholder="Search handmade treasures..."
          autoComplete="off"
        />

        {hasSearch && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={onClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <p className="search-bar__hint">
        Search by name, category, material, description,
        or tag.
      </p>
    </div>
  );
}

export default SearchBar;