import { useMemo, useCallback } from "react";
import products from "../data/products";
import useStoredState from "../hooks/useStoredState";
import { StorefrontContext } from "../hooks/useStorefront";
const validIds = (value) =>
  Array.isArray(value) &&
  value.length <= products.length &&
  new Set(value).size === value.length &&
  value.every((id) => products.some((p) => p.id === id));
const validBag = (value) =>
  Array.isArray(value) &&
  value.length <= products.length &&
  new Set(value.map((i) => i?.id)).size === value.length &&
  value.every(
    (i) =>
      i &&
      products.some((p) => p.id === i.id && p.inStock) &&
      Number.isInteger(i.quantity) &&
      i.quantity > 0 &&
      i.quantity <= 99,
  );
export default function StorefrontProvider({ children }) {
  const [bag, setBag] = useStoredState("ar-bag-v1", validBag);
  const [favorites, setFavorites] = useStoredState("ar-favorites-v1", validIds);
  const [recent, setRecent] = useStoredState("ar-recent-v1", validIds);
  const items = useMemo(
    () =>
      bag.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })),
    [bag],
  );
  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + Math.round(i.product.price * 100) * i.quantity,
        0,
      ),
    [items],
  );
  const cartCount = useMemo(
    () => bag.reduce((sum, i) => sum + i.quantity, 0),
    [bag],
  );
  const addItem = useCallback(
    (product, quantity = 1) => {
      if (!product.inStock || !Number.isInteger(quantity) || quantity < 1)
        return;
      setBag((prev) => {
        const found = prev.some((i) => i.id === product.id);
        return found
          ? prev.map((i) =>
              i.id === product.id
                ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
                : i,
            )
          : [...prev, { id: product.id, quantity: Math.min(quantity, 99) }];
      });
    },
    [setBag],
  );
  const setQuantity = useCallback(
    (id, quantity) => {
      if (!Number.isInteger(quantity)) return;
      setBag((prev) =>
        quantity <= 0
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) =>
              i.id === id ? { ...i, quantity: Math.min(99, quantity) } : i,
            ),
      );
    },
    [setBag],
  );
  const toggleFavorite = useCallback(
    (id) =>
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [setFavorites],
  );
  const viewProduct = useCallback(
    (id) =>
      setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8)),
    [setRecent],
  );
  const value = useMemo(
    () => ({
      items,
      favorites,
      recent,
      subtotalCents,
      cartCount,
      addItem,
      setQuantity,
      toggleFavorite,
      viewProduct,
    }),
    [
      items,
      favorites,
      recent,
      subtotalCents,
      cartCount,
      addItem,
      setQuantity,
      toggleFavorite,
      viewProduct,
    ],
  );
  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}
