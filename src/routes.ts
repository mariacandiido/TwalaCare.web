import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/register";
import { Farmacias } from "./components/Farmacias";
import { Farmacos } from "./components/Farmacos";
import { DeliveriesPage } from "./components/DeliveriesPage";
import { SobreNos } from "./components/SobreNos";
import { FAQ } from "./components/FAQ";
import { NotificationsPage } from "./components/notificationsPage";
import { Carrinho } from "./components/Carrinho";
import { Checkout } from "./components/Checkout";

// Cliente
import { ClienteDashboard } from "./components/cliente/ClienteDashboard";
import { ClientePedidos } from "./components/cliente/ClientePedidos";
import { ClientePerfil } from "./components/cliente/ClientePerfil";

// Farmácia
import { FarmaciaDashboard } from "./components/farmacia/FarmaciaDashboard";
import { FarmaciaProdutos } from "./components/farmacia/FarmaciaProdutos";
import { FarmaciaPedidos } from "./components/farmacia/FarmaciaPedidos";
import { FarmaciaPerfil } from "./components/farmacia/FarmaciaPerfil";

// Entregador
import { EntregadorDashboard } from "./components/entregador/EntregadorDashboard";
import { EntregadorEntregas } from "./components/entregador/EntregadorEntregas";
import { EntregadorPerfil } from "./components/entregador/EntregadorPerfil";

// Admin
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsuarios } from "./components/admin/AdminUsuarios";
import { AdminPerfil } from "./components/admin/AdminPerfil";

import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      {path: "register", Component: Register },
      { path: "farmacias", Component: Farmacias },
      { path: "farmacos", Component: Farmacos },
      {path: "deliveriesPage", Component: DeliveriesPage },
      { path: "sobre-nos", Component: SobreNos },
      {path: "notificationsPage", Component: NotificationsPage },
      { path: "faq", Component: FAQ },
      { path: "carrinho", Component: Carrinho },
      { path: "checkout", Component: Checkout },

      // Rotas do Cliente
      { path: "cliente/dashboard", Component: ClienteDashboard },
      { path: "cliente/pedidos", Component: ClientePedidos },
      { path: "cliente/perfil", Component: ClientePerfil },

      // Rotas da Farmácia
      { path: "farmacia/dashboard", Component: FarmaciaDashboard },
      { path: "farmacia/produtos", Component: FarmaciaProdutos },
      { path: "farmacia/pedidos", Component: FarmaciaPedidos },
      { path: "farmacia/perfil", Component: FarmaciaPerfil },

      // Rotas do Entregador
      { path: "entregador/dashboard", Component: EntregadorDashboard },
      { path: "entregador/entregas", Component: EntregadorEntregas },
      { path: "entregador/perfil", Component: EntregadorPerfil },

      // Rotas do Admin
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/usuarios", Component: AdminUsuarios },
      { path: "admin/perfil", Component: AdminPerfil },

      { path: "*", Component: NotFound },
    ],
  },
]);
