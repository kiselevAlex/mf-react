import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";

hydrateRoot(document.getElementById("root"), <BrowserRouter><App /></BrowserRouter>);
