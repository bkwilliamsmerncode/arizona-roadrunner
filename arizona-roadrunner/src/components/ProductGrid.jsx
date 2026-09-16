import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products, onProductSelect }) => {
  if (!products?.length) {
    return (
      <section className="product-grid-empty" aria-live="polite">
        <div className="product-grid-empty__icon">🔎</div>

        <h2>No treasures found</h2>

        <p>
          We couldn't find any handmade items matching your search.
          Try another search term or category.
        </p>
      </section>
    );
  }

  return (
    <section
      className="product-grid"
      aria-label="Arizona Roadrunner handmade products"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductSelect={onProductSelect}
        />
      ))}
    </section>
  );
};

export default ProductGrid;