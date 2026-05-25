import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/global";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
