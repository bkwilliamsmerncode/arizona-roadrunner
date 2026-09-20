import { useMemo } from "react";

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function productMatchesSearch(product, searchTerm) {
  const normalizedSearch = normalize(searchTerm);

  if (!normalizedSearch) {
    return true;
  }

  const searchableFields = [
    product.name,
    product.category,
    product.description,
    ...(product.materials ?? []),
    ...(product.tags ?? []),
  ];

  const haystack = searchableFields.map(normalize).join(" ");
  return normalizedSearch
    .split(/\s+/)
    .every((token) => haystack.includes(token));
}

function sortProducts(products, sortOption) {
  const sortedProducts = [...products];

  switch (sortOption) {
    case "price-low":
      return sortedProducts.sort((a, b) => a.price - b.price);

    case "price-high":
      return sortedProducts.sort((a, b) => b.price - a.price);

    case "name-az":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    case "name-za":
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

    case "featured":
    default:
      return sortedProducts.sort(
        (a, b) => Number(b.featured) - Number(a.featured),
      );
  }
}

function useProductSearch({
  products,
  searchTerm,
  selectedCategory,
  sortOption,
  inStockOnly,
}) {
  const categories = useMemo(() => {
    const uniqueCategories = new Set();

    for (const product of products) {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    }

    return [...uniqueCategories].sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = productMatchesSearch(product, searchTerm);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesStock = !inStockOnly || product.inStock === true;

      return matchesSearch && matchesCategory && matchesStock;
    });

    return sortProducts(filtered, sortOption);
  }, [products, searchTerm, selectedCategory, sortOption, inStockOnly]);

  return {
    categories,
    filteredProducts,
  };
}

export default useProductSearch;
