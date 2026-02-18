import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/register";
import { Farmacias } from "./components/Farmacias";
import { Farmacos } from "./components/Farmacos";
import { DeliveriesPage } from "./components/DeliveriesPage";
import ReceitasFarmacia from "./components/ReceitasFarmacia";
import { SobreNos } from "./components/SobreNos";
import { FAQ } from "./components/FAQ";
import { NotificationsPage } from "./components/notificationsPage";
import { Carrinho } from "./components/Carrinho";
import { Checkout } from "./components/Checkout";

// Cliente
import { ClienteDashboard } from "./components/cliente/ClienteDashboard";
import { ClientePedidos } from "./components/cliente/ClientePedidos";
import {ClientePerfil} from "./components/cliente/ClientePerfil";

//Rotas da Farmacia
import Farmacia from "./components/farmacia/FarmaciaPage";

// Entregador
import { EntregadorDashboard } from "./components/entregador/EntregadorDashboard";
import { EntregadorEntregas } from "./components/entregador/EntregadorEntregas";
import { EntregadorPerfil } from "./components/entregador/EntregadorPerfil";

// Admin
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsuarios } from "./components/admin/AdminUsuarios";
import { AdminPerfil } from "./components/admin/AdminPerfil";

import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "farmacias", Component: Farmacias },
      { path: "farmacos", Component: Farmacos },
      {
        path: "deliveriesPage",
        element: (
          <ProtectedRoute>
            <DeliveriesPage />
          </ProtectedRoute>
        ),
      },
      { path: "sobre-nos", Component: SobreNos },
      {
        path: "notificationsPage",
        element: (
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "receitasfarmacias",
        element: (
          <ProtectedRoute allowedTypes={["farmacia", "admin", "cliente"]}>
            <ReceitasFarmacia />
          </ProtectedRoute>
        ),
      },
      { path: "faq", Component: FAQ },
      {
        path: "carrinho",
        element: (
          <ProtectedRoute>
            <Carrinho />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute allowedTypes={["cliente"]}>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      // Rotas do Cliente
      {
        path: "cliente/dashboard",
        element: (
          <ProtectedRoute allowedTypes={["cliente"]}>
            <ClienteDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "cliente/pedidos",
        element: (
          <ProtectedRoute allowedTypes={["cliente"]}>
            <ClientePedidos />
          </ProtectedRoute>
        ),
      },
      {
        path: "cliente/perfil",
        element: (
          <ProtectedRoute allowedTypes={["cliente"]}>
            <ClientePerfil />
          </ProtectedRoute>
        ),
      },

      // Rotas da Farmacia
      {
        path: "farmacia/dasboard",
        element: (
          <ProtectedRoute allowedTypes={["farmacia"]}>
            <Farmacia />
          </ProtectedRoute>
        ),
      },
      

      //aqui vai entrar os dados da farmacia...//

      // Rotas do Entregador
      {
        path: "entregador/dashboard",
        element: (
          <ProtectedRoute allowedTypes={["entregador"]}>
            <EntregadorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "entregador/entregas",
        element: (
          <ProtectedRoute allowedTypes={["entregador"]}>
            <EntregadorEntregas />
          </ProtectedRoute>
        ),
      },
      {
        path: "entregador/perfil",
        element: (
          <ProtectedRoute allowedTypes={["entregador"]}>
            <EntregadorPerfil />
          </ProtectedRoute>
        ),
      },

      // Rotas do Admin
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute allowedTypes={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/usuarios",
        element: (
          <ProtectedRoute allowedTypes={["admin"]}>
            <AdminUsuarios />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/perfil",
        element: (
          <ProtectedRoute allowedTypes={["admin"]}>
            <AdminPerfil />
          </ProtectedRoute>
        ),
      },

      { path: "*", Component: NotFound },
    ],
  },
]);
