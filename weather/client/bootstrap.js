import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import { ApiProvider } from "@mf/api";

const root = document.getElementById("root");

hydrateRoot(
  root,
  <BrowserRouter>
    <ApiProvider>
      <App />
    </ApiProvider>
  </BrowserRouter>
);
