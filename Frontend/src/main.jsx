import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from '@clerk/react';
import { ErrorProvider } from "./context/ErrorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
