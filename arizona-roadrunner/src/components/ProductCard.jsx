import { useState } from "react";
import Icon from "./Icon";
import "./ProductCard.css";
export function ProductImage({ product, ...props }) {
  const [failed, setFailed] = useState(!product.image);
  return failed ? (
    <div
      className="image-fallback"
      role="img"
      aria-label={`${product.name} — photo unavailable`}
    >
      <Icon name="spark" />
      <span>{product.category}</span>
      <small>Photo coming soon</small>
    </div>
  ) : (
    <img
      src={product.image}
      alt={product.name}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
export default function ProductCard({
  product,
  onProductSelect,
  onToggleFavorite,
  isFavorite,
  onAdd,
}) {
  return (
    <article className="product-card">
      <div className="product-card__visual">
        <button
          className="product-card__image"
          onClick={() => onProductSelect(product)}
          aria-label={`View ${product.name}`}
        >
          <ProductImage product={product} loading="lazy" />
        </button>
        {product.featured && (
          <span className="product-card__badge">A special find</span>
        )}
        <button
          className={`icon-button favorite ${isFavorite ? "is-saved" : ""}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-label={`${isFavorite ? "Unsave" : "Save"} ${product.name}`}
          aria-pressed={isFavorite}
        >
          <Icon name="heart" />
        </button>
        <button className="quick-view" onClick={() => onProductSelect(product)}>
          Take a closer look <Icon name="arrow" />
        </button>
      </div>
      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <div className="product-card__heading">
          <h3>
            <button onClick={() => onProductSelect(product)}>
              {product.name}
            </button>
          </h3>
          <strong>${product.price}</strong>
        </div>
        <p>{product.description}</p>
        <div className="product-card__bottom">
          <span className={product.inStock ? "available" : ""}>
            {product.inStock ? "Available to add" : "Currently unavailable"}
          </span>
          <button
            className="icon-button"
            onClick={() => onAdd(product)}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to bag`}
          >
            <Icon name="plus" />
          </button>
        </div>
      </div>
    </article>
  );
}
