import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./layout/Header";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";


export function Root() {
  const location = useLocation();
  

  // Rotas que não devem exibir o layout completo (apenas dashboards e login)
  const isDashboardRoute =
    location.pathname.includes("/cliente/") ||
    location.pathname.includes("/farmacia/") ||
    location.pathname.includes("/entregador/") ||
    location.pathname.includes("/admin/") ||
    location.pathname === "/login";

  if (isDashboardRoute) {
    return <Outlet />;
  }
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
}
