import { useState } from "react";
import useDialog from "../hooks/useDialog";
import useStorefront from "../hooks/useStorefront";
import { ProductImage } from "./ProductCard";
import Checkout from "./Checkout";
import Icon from "./Icon";
import "./Cart.css";
export default function Cart({ open, onClose }) {
  const { items, subtotalCents, setQuantity } = useStorefront();
  const [checkout, setCheckout] = useState(false);
  const dialog = useDialog(open, onClose);
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
      <h2 id="cart-title">
        {checkout && items.length
          ? "The finishing touches."
          : "Your shopping bag."}
      </h2>
      {items.length ? (
        checkout ? (
          open && (
            <Checkout
              items={items}
              subtotalCents={subtotalCents}
              onBack={() => setCheckout(false)}
            />
          )
        ) : (
          <>
            <p className="bag-intro">
              Good finds, all in one place. Saved here for whenever you’re
              ready.
            </p>
            <div>
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <ProductImage product={product} />
                  <div>
                    <span className="cart-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>${(product.price * quantity).toFixed(2)}</p>
                    <div className="cart-item__controls">
                      <button
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => setQuantity(product.id, quantity - 1)}
                      >
                        −
                      </button>
                      <span aria-label="Quantity">{quantity}</span>
                      <button
                        disabled={quantity >= 99}
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="remove"
                        onClick={() => setQuantity(product.id, 0)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="bag-summary">
              <div className="cart-total">
                <span>Items subtotal</span>
                <strong>${(subtotalCents / 100).toFixed(2)}</strong>
              </div>
              <p className="purchase-note">
                Shipping and tax will be confirmed at checkout.
              </p>
              <button className="button" onClick={() => setCheckout(true)}>
                Continue to checkout <Icon name="arrow" />
              </button>
              <button className="text-link" onClick={onClose}>
                Keep exploring
              </button>
              <p className="bag-local">
                <Icon name="check" /> Your bag is saved in this browser.
              </p>
            </div>
          </>
        )
      ) : (
        <div className="empty-state">
          <Icon name="bag" />
          <h3>A little room for something special.</h3>
          <p>Your bag is waiting for its first find.</p>
          <button
            className="button"
            onClick={() => {
              setCheckout(false);
              onClose();
            }}
          >
            Explore the collection <Icon name="arrow" />
          </button>
        </div>
      )}
    </dialog>
  );
}
