import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import StorefrontProvider from "./components/StorefrontProvider";

import "./styles/variables.css";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Arizona Roadrunner could not find the application root element.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <StorefrontProvider>
      <App />
    </StorefrontProvider>
  </StrictMode>,
);
