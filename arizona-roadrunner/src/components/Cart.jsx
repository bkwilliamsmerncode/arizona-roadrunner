import useDialog from "../hooks/useDialog";
import { ProductImage } from "./ProductCard";
import Icon from "./Icon";
export default function Cart({ open, items, onClose, onQuantity }) {
  const dialog = useDialog(open, onClose);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const body = items
    .map(
      ({ product, quantity }) =>
        `${quantity} × ${product.name} — $${(product.price * quantity).toFixed(2)}`,
    )
    .join("\n");
  return (
    <dialog {...dialog} className="cart-dialog" aria-labelledby="cart-title">
      <button
        className="icon-button dialog-close"
        onClick={onClose}
        aria-label="Close shopping bag"
      >
        <Icon name="close" />
      </button>
      <span className="eyebrow">Your next favorite things</span>
      <h2 id="cart-title">The shopping bag.</h2>
      {items.length ? (
        <>
          <div>
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <ProductImage product={product} />
                <div>
                  <h3>{product.name}</h3>
                  <p>${(product.price * quantity).toFixed(2)}</p>
                  <div className="cart-item__controls">
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => onQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span aria-label="Quantity">{quantity}</span>
                    <button
                      disabled={quantity >= 99}
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => onQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove"
                      onClick={() => onQuantity(product.id, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <p className="purchase-note">
            Shipping and tax are not included. Online checkout is not available
            yet. Email your bag to ask about availability and ordering; this
            does not place an order.
          </p>
          <a
            className="button"
            href={`mailto:hello@arizonaroadrunner.com?subject=${encodeURIComponent("Arizona Roadrunner — shopping bag inquiry")}&body=${encodeURIComponent("Hi! I am interested in these pieces:\n\n" + body + "\n\nItem subtotal: $" + total.toFixed(2) + "\nPlease confirm availability, shipping, and how to order.")}`}
          >
            Email a purchase inquiry <Icon name="arrow" />
          </a>
          <button className="text-link" onClick={onClose}>
            Keep exploring
          </button>
        </>
      ) : (
        <div className="empty-state">
          <Icon name="bag" />
          <h3>A little room for something special.</h3>
          <p>Your bag is waiting for its first find.</p>
          <button className="button" onClick={onClose}>
            Explore the collection <Icon name="arrow" />
          </button>
        </div>
      )}
    </dialog>
  );
}
