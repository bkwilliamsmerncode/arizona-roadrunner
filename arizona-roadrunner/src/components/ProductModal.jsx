import { useEffect } from "react";

import "./ProductModal.css";

function ProductModal({
  product,
  onClose,
}) {
  useEffect(() => {
    if (!product) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  const {
    name,
    category,
    price,
    description,
    image,
    materials = [],
    tags = [],
    inStock = true,
    paymentUrl = "#",
  } = product;

  const formattedPrice =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const handleBackdropClick = (
    event
  ) => {
    if (
      event.target === event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="product-modal"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="product-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button
          type="button"
          className="product-modal__close"
          onClick={onClose}
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="product-modal__layout">
          <div className="product-modal__image-wrapper">
            <img
              className="product-modal__image"
              src={image}
              alt={name}
            />

            <span className="product-modal__category">
              {category}
            </span>
          </div>

          <div className="product-modal__content">
            <p className="product-modal__eyebrow">
              Arizona Roadrunner
            </p>

            <h2
              id="product-modal-title"
              className="product-modal__title"
            >
              {name}
            </h2>

            <p className="product-modal__price">
              {formattedPrice}
            </p>

            <div className="product-modal__divider" />

            <p className="product-modal__description">
              {description}
            </p>

            {materials.length > 0 && (
              <div className="product-modal__section">
                <h3>Materials</h3>

                <div className="product-modal__materials">
                  {materials.map(
                    (material) => (
                      <span
                        key={material}
                      >
                        {material}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div className="product-modal__section">
                <h3>Tags</h3>

                <div className="product-modal__tags">
                  {tags.map((tag) => (
                    <span key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="product-modal__purchase">
              {inStock ? (
                <>
                  <a
                    className="product-modal__buy"
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy This Item
                    <span aria-hidden="true">
                      ↗
                    </span>
                  </a>

                  <p>
                    You'll complete your purchase
                    through our secure payment
                    partner.
                  </p>
                </>
              ) : (
                <div className="product-modal__unavailable">
                  Currently Unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
