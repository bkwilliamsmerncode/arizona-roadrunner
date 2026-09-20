import { useState } from "react";
import useDialog from "../hooks/useDialog";
import { ProductImage } from "./ProductCard";
import Icon from "./Icon";
import "./ProductModal.css";
export default function ProductModal({
  product,
  onClose,
  onAdd,
  onToggleFavorite,
  isFavorite,
}) {
  const dialog = useDialog(Boolean(product), onClose);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  if (!product) return null;
  return (
    <dialog
      {...dialog}
      className="product-modal"
      aria-labelledby="product-modal-title"
    >
      <button
        className="icon-button dialog-close"
        onClick={onClose}
        aria-label="Close product details"
      >
        <Icon name="close" />
      </button>
      <div className="product-modal__layout">
        <div className="product-modal__image">
          <ProductImage product={product} />
        </div>
        <div className="product-modal__content">
          <span className="eyebrow">
            {product.category} / Arizona Roadrunner
          </span>
          <h2 id="product-modal-title">{product.name}</h2>
          <p className="product-modal__price">
            ${product.price.toFixed(2)} <small>USD</small>
          </p>
          <p>{product.description}</p>
          <div className="materials">
            <h3>The details</h3>
            <p>{product.materials.join(" · ")}</p>
            <span>
              {product.inStock
                ? "Available to add to your bag"
                : "Currently unavailable"}
            </span>
          </div>
          <label className="quantity-label">
            Quantity
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <button
            className="button add-button"
            disabled={!product.inStock}
            onClick={() => { onAdd(product, quantity); setAdded(true); }}
          >
            Add to bag — ${(product.price * quantity).toFixed(2)}{" "}
            <Icon name="bag" />
          </button>
          {added && <p role="status" className="added-confirmation">Added to your bag. Close this window to keep exploring or open your bag from the header.</p>}
          <button
            className="save-link"
            onClick={() => onToggleFavorite(product.id)}
            aria-pressed={isFavorite}
          >
            <Icon name="heart" />
            {isFavorite ? "Saved to your favorites" : "Save for another day"}
          </button>
          <p className="purchase-note">
            Photography is illustrative. Contact us to confirm the exact piece,
            availability, and delivery before purchasing.
          </p>
        </div>
      </div>
    </dialog>
  );
}
