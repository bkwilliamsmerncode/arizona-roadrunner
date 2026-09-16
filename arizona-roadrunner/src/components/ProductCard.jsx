import "./ProductCard.css";

const ProductCard = ({ product, onProductSelect }) => {
  const handleClick = () => {
    onProductSelect?.(product);
  };

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {product.featured && (
          <span className="product-card__badge">
            Featured
          </span>
        )}
      </div>

      <div className="product-card__content">
        <span className="product-card__category">
          {product.category}
        </span>

        <h3 className="product-card__title">
          {product.name}
        </h3>

        <p className="product-card__description">
          {product.description}
        </p>

        <div className="product-card__footer">
          <strong className="product-card__price">
            ${product.price.toFixed(2)}
          </strong>

          <button
            type="button"
            className="product-card__button"
            onClick={handleClick}
          >
            View Item
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;