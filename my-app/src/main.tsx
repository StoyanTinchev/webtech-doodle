import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MeetingPage from "./components/MeetingPage/MeetingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"meeting/:id"} element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
