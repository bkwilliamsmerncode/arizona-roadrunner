import { useCallback, useMemo, useSyncExternalStore } from "react";
const memory = new Map();
const EMPTY = [];
const eventName = "ar-storage-change";
function read(key) {
  if (memory.has(key)) return memory.get(key);
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export default function useStoredState(key, validate, initial = EMPTY) {
  const subscribe = useCallback(
    (listener) => {
      const notify = (e) => {
        if (
          e.type === eventName
            ? e.detail === key
            : e.key === key || e.key === null
        ) {
          if (e.type === "storage") memory.delete(key);
          listener();
        }
      };
      window.addEventListener("storage", notify);
      window.addEventListener(eventName, notify);
      return () => {
        window.removeEventListener("storage", notify);
        window.removeEventListener(eventName, notify);
      };
    },
    [key],
  );
  const snapshot = useCallback(() => read(key), [key]);
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const value = useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return validate(parsed) ? parsed : initial;
    } catch {
      return initial;
    }
  }, [raw, validate, initial]);
  const setValue = useCallback(
    (next) => {
      let current = initial;
      try {
        const parsed = JSON.parse(read(key));
        if (validate(parsed)) current = parsed;
      } catch {
        /* Use the supplied initial value. */
      }
      const updated = typeof next === "function" ? next(current) : next;
      const json = JSON.stringify(updated);
      try {
        localStorage.setItem(key, json);
        memory.delete(key);
      } catch {
        memory.set(key, json);
      }
      window.dispatchEvent(new CustomEvent(eventName, { detail: key }));
    },
    [key, validate, initial],
  );
  return [value, setValue];
}
