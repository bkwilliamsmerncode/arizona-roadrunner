import { useCallback, useId, useReducer, useRef } from "react";
import emailjs from "@emailjs/browser";
import useStoredState from "./useStoredState";


const EMPTY = { from_name: "", reply_to: "", subject: "", message: "" };
const valid = (value) =>
  value &&
  Object.keys(EMPTY).every(
    (key) => typeof value[key] === "string" && value[key].length <= 3000,
  );
function reducer(state, action) {
  switch (action.type) {
    case "sending":
      return { status: "sending", error: "" };
    case "sent":
      return { status: "sent", error: "" };
    case "error":
      return { status: "error", error: action.message };
    case "edit":
      return state.status === "sending" ? state : { status: "idle", error: "" };
    default:
      return state;
  }
}
export default function useContactForm() {
  const formRef = useRef(null);
  const busy = useRef(false);
  const formId = useId();
  const [draft, setDraft] = useStoredState("ar-contact-draft-v1", valid, EMPTY);
  const [state, dispatch] = useReducer(reducer, { status: "idle", error: "" });
  const edit = useCallback(
    (e) => {
      const { name, value } = e.target;
      setDraft((prev) => ({ ...prev, [name]: value }));
      dispatch({ type: "edit" });
    },
    [setDraft],
  );
  const clear = useCallback(() => {
    setDraft(EMPTY);
    dispatch({ type: "edit" });
  }, [setDraft]);
  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (busy.current) return;
      const form = formRef.current;
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (String(data.get("website") || "").trim()) return;
      const service='service_4fqwyle'
      const template='template_jrj9cmp'
      const publicKey='hQim4ICvqwKb9uuvj'
      if (!service || !template || !publicKey) {
        dispatch({
          type: "error",
          message:
            "Messaging is temporarily unavailable. Your draft is saved; please try again later or use the email link.",
        });
        return;
      }
      busy.current = true;
      dispatch({ type: "sending" });
      try {
        await emailjs.sendForm(service, template, form, {
          publicKey,
          limitRate: { id: "ar-contact", throttle: 3000 },
        });
        setDraft(EMPTY);
        dispatch({ type: "sent" });
      } catch (error) {
        dispatch({
          type: "error",
          message:
            error.status === 429
              ? "Please wait a moment before trying again. Your message is still here."
              : "We couldn’t send your message. Your draft is saved. Please try again or use the email link.",
        });
      } finally {
        busy.current = false;
      }
    },
    [setDraft],
  );
  return { formRef, formId, draft, state, edit, clear, submit };
}
