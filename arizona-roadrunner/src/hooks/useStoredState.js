import { useEffect, useState } from "react";
export default function useStoredState(key, validate) {
  const [value, setValue] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key));
      return validate(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Shopping continues when browser storage is unavailable. */
    }
  }, [key, value]);
  return [value, setValue];
}
