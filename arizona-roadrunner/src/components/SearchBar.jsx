import { useEffect, useRef } from "react";
import Icon from "./Icon";
import "./SearchBar.css";
export default function SearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) {
  const input = useRef(null);
  useEffect(() => {
    const handle = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  return (
    <div className="search-bar">
      <Icon name="search" />
      <label className="sr-only" htmlFor="product-search">
        Search the collection
      </label>
      <input
        ref={input}
        id="product-search"
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Find something that feels like you…"
        autoComplete="off"
      />
      {searchTerm ? (
        <button
          className="icon-button"
          onClick={onClearSearch}
          aria-label="Clear search"
        >
          <Icon name="close" />
        </button>
      ) : (
        <kbd>Ctrl K</kbd>
      )}
    </div>
  );
}
