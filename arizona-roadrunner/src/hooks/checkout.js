export const EMPTY_CHECKOUT = {
  name: "",
  email: "",
  phone: "",
  fulfillment: "shipping",
  address: "",
  address2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "US",
  notes: "",
};
export const validCheckout = (value) =>
  value &&
  Object.keys(EMPTY_CHECKOUT).every(
    (key) => typeof value[key] === "string" && value[key].length <= 1000,
  ) &&
  ["shipping", "pickup"].includes(value.fulfillment) &&
  ["US", "CA"].includes(value.country);
export function checkoutReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        details: { ...state.details, [action.name]: action.value },
        error: "",
        saved: false,
      };
    case "review":
      return { ...state, step: "review", error: "" };
    case "edit":
      return { ...state, step: "details", error: "" };
    case "saved":
      return { ...state, saved: true };
    case "sending":
      return { ...state, pending: true, error: "" };
    case "error":
      return { ...state, pending: false, error: action.message };
    case "clear":
      return {
        details: EMPTY_CHECKOUT,
        step: "details",
        pending: false,
        error: "",
        saved: false,
      };
    default:
      return state;
  }
}
export function checkoutPayload(items, details, requestId) {
  return {
    requestId,
    currency: "USD",
    items: items.map(({ product, quantity }) => ({
      productId: product.id,
      quantity,
    })),
    customer: {
      name: details.name.trim(),
      email: details.email.trim(),
      phone: details.phone.trim(),
    },
    fulfillment: {
      type: details.fulfillment,
      ...(details.fulfillment === "shipping"
        ? {
            shippingAddress: {
              addressLine1: details.address.trim(),
              addressLine2: details.address2.trim(),
              city: details.city.trim(),
              region: details.region.trim(),
              postalCode: details.postalCode.trim(),
              country: details.country,
            },
          }
        : {}),
    },
    notes: details.notes.trim(),
  };
}
export function validateSquareUrl(value) {
  const url = new URL(value);
  const allowed = [
    "square.link",
    "checkout.square.site",
    "connect.squareup.com",
    "connect.squareupsandbox.com",
  ];
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    !allowed.includes(url.hostname)
  )
    throw new Error(
      "The checkout service returned an invalid Square payment link.",
    );
  return url.href;
}
