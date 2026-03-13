import { createRoot } from "react-dom/client";
import AdminApp from "../src/AdminApp";
import "../src/styles/globals.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<div style=\"padding:24px;font-family:system-ui;color:#c00;\">Erro: elemento #root não encontrado.</div>";
} else {
  try {
    createRoot(rootEl).render(<AdminApp />);
  } catch (err) {
    const msg = (err instanceof Error ? err.message : String(err)).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    rootEl.innerHTML = `<div style="padding:24px;font-family:system-ui;max-width:480px;"><h2 style="color:#c00;">Erro ao carregar o admin</h2><p>${msg}</p><button onclick="location.reload()" style="padding:8px 16px;cursor:pointer;">Recarregar</button></div>`;
    console.error(err);
  }
}
