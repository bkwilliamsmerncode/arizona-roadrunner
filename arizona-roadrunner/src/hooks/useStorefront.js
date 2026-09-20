import { createContext, useContext } from "react";
export const StorefrontContext = createContext(null);
export default function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) throw new Error("StorefrontProvider is required.");
  return context;
}
