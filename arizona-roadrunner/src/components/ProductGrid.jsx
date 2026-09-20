import ProductCard from "./ProductCard";
import Icon from "./Icon";
import "./ProductGrid.css";
export default function ProductGrid({
  products,
  favorites,
  onClear,
  ...props
}) {
  return products.length ? (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          {...props}
        />
      ))}
    </div>
  ) : (
    <div className="empty-state">
      <Icon name="search" />
      <h3>No treasures found. Yet.</h3>
      <p>Try another search or give your filters a fresh start.</p>
      <button className="button" onClick={onClear}>
        Explore all treasures <Icon name="arrow" />
      </button>
    </div>
  );
}
