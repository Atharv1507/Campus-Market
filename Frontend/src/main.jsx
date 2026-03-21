import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from '@clerk/react';
import { ErrorProvider } from "./context/ErrorContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider>
        <ErrorProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ErrorProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
