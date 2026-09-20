import { useEffect, useRef } from "react";
export default function useDialog(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);
  const onCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  const onClick = (e) => {
    if (e.target === ref.current) {
      const r = ref.current.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        onClose();
    }
  };
  return { ref, onCancel, onClick };
}
