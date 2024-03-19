import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppProviderData from "./context/AppProvider.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviderData>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </AppProviderData>
);
