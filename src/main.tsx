import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply saved theme immediately before React renders to prevent skeleton flash in wrong theme
(() => {
  const stored = localStorage.getItem("theme");
  const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
})();

createRoot(document.getElementById("root")!).render(<App />);
