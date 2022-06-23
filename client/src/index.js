import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ContextProvider } from "./contexts/ContextProvider";
import { ComponentsProvider } from "./contexts/ComponentsProvider";
import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import ScrollToTop from "./contexts/ScrollToTop";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /*   <React.StrictMode> */
  <BrowserRouter>
    <ContextProvider>
      <AuthProvider>
        <CartProvider>
          <ComponentsProvider>
            <ScrollToTop>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </ScrollToTop>
          </ComponentsProvider>
        </CartProvider>
      </AuthProvider>
    </ContextProvider>
  </BrowserRouter>
  /*   </React.StrictMode> */
);
