import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./PAGES/Login";

const root = document.getElementById("root");
if (!root) throw new Error("Failed to find the root element");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
